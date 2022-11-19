package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/chat"
)

func (chatRpcImpl) GetSpecifiedMessage(ctx *gin.Context, messageId int) chat.MessageResponse {
	return chat.MessageResponse{}
}
