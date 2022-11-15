package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatImpl) GetConversationById(ctx *gin.Context, convId int) chat.Conversation {
	// 检测用户是否登录
	currentUser := middleware.GetCurrentUser(ctx)
	if currentUser == nil {
		panic("当前用户尚未登录")
	}

	// 获取指定的会话信息
	convDao, err := chatService.GetConversationById(convId)
	if err != nil {
		panic(err)
	}

	// 将会话信息转换为IDL格式返回给用户
	return convDao.ToPrivateIDL(currentUser.ID)
}

func attachGetConversationById(r *gin.Engine) {
	r.GET(chat.ChatDefinition.GET_CONVERSATION_BY_ID_PATH, func(ctx *gin.Context) {
		props := chat.GetConversationByIdRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, controller.GetConversationById(ctx, props.ConvId))
	})
}
