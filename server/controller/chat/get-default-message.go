package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/chat"
)

func (chatRpcImpl) GetDefaultMessage(ctx *gin.Context, convId int) chat.MessageResponse {
	return chat.MessageResponse{}
}
