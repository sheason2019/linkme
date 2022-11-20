package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatRpcImpl) PostUserMessage(ctx *gin.Context, userId, convId int, message chat.Message) chat.Message {
	// 检查用户是否有发送信息的权限
	member, err := chatService.FindMember(convId, userId)
	if member == nil {
		panic("用户不是指定会话的成员")
	}
	if err != nil {
		panic(err)
	}

	// 创建信息
	daoMessage, err := chatService.CreateUserMessage(message, uint(convId), member)
	if err != nil {
		panic(err)
	}

	// 拉取全部需要更新消息列表的成员
	reciverMembers := append(member.Conversation.Members, *member)

	chatService.PushUserSequence(reciverMembers, uint(convId))

	// 将信息转换为IDL的数据结构
	return daoMessage.ToIDL()
}

func attachPostUserMessage(r *gin.Engine) {
	r.POST(chat.ChatRpcDefinition.POST_USER_MESSAGE_PATH, middleware.RpcGuard, func(ctx *gin.Context) {
		props := chat.PostUserMessageRequest{}
		ctx.BindJSON(&props)

		ctx.JSON(200, rpcController.PostUserMessage(ctx, props.UserId, props.ConvId, props.Msg))
	})
}
