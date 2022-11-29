package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatRpcImpl) GetSequenceItem(ctx *gin.Context) []chat.SequenceItem {
	currentUser := middleware.MustGetCurrentUser(ctx)

	sequence, err := chatService.GetSequenceItem(int(currentUser.ID))
	if err != nil {
		panic(err)
	}

	return sequence
}

func attachGetSequenceItem(r *gin.Engine) {
	r.GET(chat.ChatRpcDefinition.GET_SEQUENCE_ITEM_PATH, middleware.RpcGuard, func(ctx *gin.Context) {
		ctx.JSON(200, rpcController.GetSequenceItem(ctx))
	})
}
