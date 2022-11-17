package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/chat"
)

type chatRpcImpl struct{}

var rpcController chat.ChatRpc = chatRpcImpl{}

func BindChatRpcController(r *gin.Engine) {
	attachGetSequenceItem(r)
	attachGetUserEnterConversationLimit(r)
	attachPostUserMessage(r)
}
