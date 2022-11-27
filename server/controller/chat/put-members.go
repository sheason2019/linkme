package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	rpcClient "github.com/sheason2019/linkme/rpc-client"
	chatService "github.com/sheason2019/linkme/services/chat"
	"github.com/sheason2019/linkme/utils"
)

// 邀请群组成员
func (chatImpl) PutMembers(ctx *gin.Context, convId int, usersId []int) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	// 先检查该用户是否有写入群聊成员的权限
	conv, err := chatService.GetConversationById(convId)
	if err != nil {
		panic(err)
	}
	if currentUser.ID != conv.OwnerId {
		panic("当前用户没有邀请会话成员的权限")
	}

	// 将用户加入会话
	effectedMembers, err := chatService.AddUserInfoConversation(convId, usersId)
	if err != nil {
		panic(err)
	}

	// 获取操作人的成员信息
	member, err := chatService.FindMember(convId, int(currentUser.ID))
	if err != nil {
		panic(err)
	}

	// 获取加入会话的成员ID列表
	effectedMembersId := utils.Map(effectedMembers, func(member chatDao.MemberDao, index int) uint {
		return member.ID
	})

	// 向群聊写入邀请信息
	msg, err := chatService.CreateUserInviteMessage(conv.ID, member.ID, effectedMembersId)
	if err != nil {
		panic(err)
	}

	// 把邀请信息推送到Socket
	rpcClient.ChatSocketClient.PostMessages(convId, []chat.Message{msg.ToIDL()})

	// 向Socket发出请求，让被邀请的成员刷新消息列表
	err = chatService.PushUserSequence(effectedMembers, conv.ID)
	if err != nil {
		panic(err)
	}
}

func attachPutMembers(r *gin.Engine) {
	r.PUT(chat.ChatDefinition.PUT_MEMBERS_PATH, func(ctx *gin.Context) {
		props := chat.PutMembersRequest{}
		ctx.BindJSON(&props)

		controller.PutMembers(ctx, props.ConvId, props.UsersId)
		ctx.String(200, "OK")
	})
}
