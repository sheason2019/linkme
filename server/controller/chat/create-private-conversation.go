package chatController

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	accountService "github.com/sheason2019/linkme/services/account"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatImpl) CreatePrivateConversation(ctx *gin.Context, userId int) int {
	currentUser := middleware.GetCurrentUser(ctx)
	if currentUser == nil {
		panic("当前用户尚未登录")
	}

	targetUser, err := accountService.FindUserByUserId(userId)
	if err != nil {
		panic(fmt.Sprintf("没有找到指定的用户 - 用户ID %d", userId))
	}

	conv, err := chatService.CreatePrivateConversation(*currentUser, *targetUser)
	if err != nil {
		panic("创建会话时出现未知错误")
	}

	err = chatService.PushConversationIntoSequence(conv, currentUser)
	if err != nil {
		panic(err)
	}

	return int(conv.ID)
}

func attachCreatePrivateConversation(r *gin.Engine) {
	r.POST(chat.ChatDefinition.CREATE_PRIVATE_CONVERSATION_PATH, func(ctx *gin.Context) {
		props := chat.CreatePrivateConversationRequest{}
		ctx.BindJSON(&props)

		ctx.JSON(200, controller.CreatePrivateConversation(ctx, props.UserId))
	})
}
