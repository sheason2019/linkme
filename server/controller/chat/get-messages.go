package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatRpcImpl) GetMessages(ctx *gin.Context, userId, convId int, originMessageId int) []chat.Message {
	member, err := chatService.FindMember(convId, userId)
	if err != nil {
		panic(err)
	}
	if member == nil {
		panic("用户不是指定会话的成员")
	}

	daoMessages, err := chatService.FindMessages(convId, originMessageId)
	if err != nil {
		panic(err)
	}

	messages := make([]chat.Message, len(daoMessages))
	for i, v := range daoMessages {
		messages[i] = v.ToIDL()
	}

	return messages
}

func attachGetMessages(r *gin.Engine) {
	r.GET(chat.ChatRpcDefinition.GET_MESSAGES_PATH, middleware.RpcGuard, func(ctx *gin.Context) {
		props := chat.GetMessagesRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, rpcController.GetMessages(ctx, props.UserId, props.ConvId, props.OriginMessageId))
	})
}
