package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	accountService "github.com/sheason2019/linkme/services/account"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatRpcImpl) PostSequenceItem(ctx *gin.Context, userId, convId int) {
	user, err := accountService.FindUserByUserId(userId)
	if err != nil {
		panic(err)
	}

	if user == nil {
		panic("指定的用户不存在")
	}

	chatService.PushConversationIntoSequence(uint(convId), user)
}

func attachPostSequenceItem(r *gin.Engine) {
	r.POST(chat.ChatRpcDefinition.POST_SEQUENCE_ITEM_PATH, middleware.RpcGuard, func(ctx *gin.Context) {
		props := chat.PostSequenceItemRequest{}
		ctx.BindJSON(&props)

		rpcController.PostSequenceItem(ctx, props.UserId, props.ConvId)
		ctx.String(200, "OK")
	})
}
