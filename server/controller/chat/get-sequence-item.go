package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatRpcImpl) GetSequenceItem(ctx *gin.Context) []chat.SequenceItem {
	currentUser := middleware.GetCurrentUser(ctx)
	if currentUser == nil {
		panic("当前用户尚未登录")
	}

	convDaos, err := chatService.GetConversationSequence(currentUser.ID)
	// 如果产生了错误
	if err != nil {
		panic(err)
	}

	sequence := make([]chat.SequenceItem, len(convDaos))
	for i, v := range convDaos {
		sequence[i] = chatService.ConvertConversationToSequenceItem(currentUser.ID, v)
	}

	return sequence
}

func attachGetSequenceItem(r *gin.Engine) {
	r.GET(chat.ChatRpcDefinition.GET_SEQUENCE_ITEM_PATH, middleware.RpcGuard, func(ctx *gin.Context) {
		ctx.JSON(200, rpcController.GetSequenceItem(ctx))
	})
}
