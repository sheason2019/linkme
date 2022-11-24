package chatController

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/omi/socket"
	rpcClient "github.com/sheason2019/linkme/rpc-client"
	accountService "github.com/sheason2019/linkme/services/account"
	chatService "github.com/sheason2019/linkme/services/chat"
	"github.com/sheason2019/linkme/utils"
)

func (chatImpl) CreatePrivateConversation(ctx *gin.Context, userId int) int {
	currentUser := middleware.MustGetCurrentUser(ctx)

	targetUser, err := accountService.FindUserByUserId(userId)
	if err != nil {
		panic(err)
	}
	if targetUser == nil {
		panic(fmt.Sprintf("没有找到指定的用户 - 用户ID %d", userId))
	}

	conv, err := chatService.CreatePrivateConversation(*currentUser, *targetUser)
	if err != nil {
		panic("创建会话时出现未知错误")
	}

	err = chatService.PushConversationIntoSequence(conv.ID, currentUser)
	if err != nil {
		panic(err)
	}

	sequence, err := chatService.GetSequenceItem(int(currentUser.ID))
	if err != nil {
		panic(err)
	}

	sequences := make([]socket.UserConversationSequence, 1)
	sequences[0] = socket.UserConversationSequence{
		UserId:   utils.ConvertNumberToIntPtr(currentUser.ID),
		Sequence: &sequence,
	}
	rpcClient.ChatSocketClient.PostUserSequence(sequences)

	return int(conv.ID)
}

func attachCreatePrivateConversation(r *gin.Engine) {
	r.POST(chat.ChatDefinition.CREATE_PRIVATE_CONVERSATION_PATH, func(ctx *gin.Context) {
		props := chat.CreatePrivateConversationRequest{}
		ctx.BindJSON(&props)

		ctx.JSON(200, controller.CreatePrivateConversation(ctx, props.UserId))
	})
}
