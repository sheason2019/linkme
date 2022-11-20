package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	chatService "github.com/sheason2019/linkme/services/chat"
	"github.com/sheason2019/linkme/utils"
)

func (chatImpl) CreateGroupConversation(ctx *gin.Context, userIds []int, groupName string) int {
	currentUser := middleware.GetCurrentUser(ctx)

	if currentUser == nil {
		panic("当前用户尚未登录")
	}

	// 针对UserId进行一次去重
	idSet := make(map[int]bool)
	userIds = utils.Filter(userIds, func(item int, index int) bool {
		_, exist := idSet[item]
		// 去重的过程中顺便把可能写进成员列表中的用户自身的信息给剔除
		if !exist && item != int(currentUser.ID) {
			idSet[item] = true
			return true
		}
		return false
	})

	// 创建会话
	conv, err := chatService.CreateGroupConversation(currentUser.ID, userIds, groupName)
	if err != nil {
		panic(err)
	}

	// 获取被邀请的成员ID和邀请者的成员ID
	var invitorMemberId uint
	invitedMemberId := make([]uint, len(conv.Members)-1)
	index := 0
	for _, v := range conv.Members {
		if v.UserId != currentUser.ID {
			invitedMemberId[index] = v.ID
			index++
		} else {
			invitorMemberId = v.ID
		}
	}

	// 创建会话后往会话中推送一条邀请信息
	_, err = chatService.CreateUserInviteMessage(conv.ID, invitorMemberId, invitedMemberId)
	if err != nil {
		panic(err)
	}

	// 然后将会话推送到所有相关成员的消息列表中
	err = chatService.PushUserSequence(conv.Members, conv.ID)
	if err != nil {
		panic(err)
	}

	return int(conv.ID)
}

func attachCreateGroupConversation(r *gin.Engine) {
	r.POST(chat.ChatDefinition.CREATE_GROUP_CONVERSATION_PATH, func(ctx *gin.Context) {
		props := chat.CreateGroupConversationRequest{}
		ctx.BindJSON(&props)
		ctx.JSON(200, controller.CreateGroupConversation(ctx, props.UserIds, props.GroupName))
	})
}
