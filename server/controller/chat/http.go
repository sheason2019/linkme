package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/chat"
)

type chatImpl struct{}

var controller chat.Chat = chatImpl{}

func BindChatController(r *gin.Engine) {
	attachCreatePrivateConversation(r)
	attachCreateGroupConversation(r)
	attachGetConversationById(r)
	attachGetGroup(r)
	attachPutGroupName(r)
}
