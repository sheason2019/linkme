package chatController

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	rpcClient "github.com/sheason2019/linkme/rpc-client"
	"github.com/sheason2019/linkme/utils"
)

// 删除会话成员
func (chatImpl) DeleteMembers(ctx *gin.Context, membersId []int) {
	fmt.Println(membersId)
	if len(membersId) == 0 {
		return
	}

	currentUser := middleware.MustGetCurrentUser(ctx)

	conn := db.GetConn()

	// 移除成员逻辑
	members := make([]chatDao.MemberDao, len(membersId))
	err := conn.
		Preload("Conversation").
		Where("id in ?", membersId).
		Find(&members).
		Error
	if err != nil {
		panic(err)
	}

	for i, member := range members {
		// 判断会话类型，私聊是不可以移除成员的
		if member.Conversation.Type != chatDao.ConversationType_Group {
			panic("仅群组可以移除成员")
		}
		if member.Conversation.OwnerId != currentUser.ID {
			panic("没有权限执行此操作")
		}
		members[i].Removed = true
	}

	err = conn.Save(&members).Error
	if err != nil {
		panic(err)
	}

	// 向Socket端推送被移除的成员信息
	effectedMembers := utils.Map(members, func(item chatDao.MemberDao, index int) chat.MessageMember {
		return item.ToIDL()
	})

	rpcClient.ChatSocketClient.KickoutMember(effectedMembers)
}

func attachDeleteMembers(r *gin.Engine) {
	r.DELETE(chat.ChatDefinition.DELETE_MEMBERS_PATH, func(ctx *gin.Context) {
		props := chat.DeleteMembersRequest{}
		ctx.BindQuery(&props)

		controller.DeleteMembers(ctx, props.MembersId)
		ctx.String(200, "OK")
	})
}
