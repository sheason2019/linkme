package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatRpcImpl) GetUserEnterConversationLimit(ctx *gin.Context, userId, convId int) bool {
	member, err := chatService.FindMember(convId, userId)

	if err != nil {
		panic(err)
	}

	return member != nil
}

func attachGetUserEnterConversationLimit(r *gin.Engine) {
	r.GET(chat.ChatRpcDefinition.GET_USER_ENTER_CONVERSATION_LIMIT_PATH, middleware.RpcGuard, func(ctx *gin.Context) {
		props := chat.GetUserEnterConversationLimitRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, rpcController.GetUserEnterConversationLimit(ctx, props.UserId, props.ConvId))
	})
}
