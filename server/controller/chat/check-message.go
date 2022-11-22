package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/omi/socket"
	rpcClient "github.com/sheason2019/linkme/rpc-client"
	chatService "github.com/sheason2019/linkme/services/chat"
	"github.com/sheason2019/linkme/utils"
)

func (chatRpcImpl) CheckMessage(ctx *gin.Context, userId, convId int) {
	// 修改Reciver，并获取受影响的Reciver
	recivers, err := chatService.CheckMessage(userId, convId)
	if err != nil {
		panic(err)
	}
	if recivers == nil {
		return
	}

	// 通过Reciver找到指定受影响的消息
	messagesDao, err := chatService.FindMessagesByRecivers(recivers)
	if err != nil {
		panic(err)
	}

	// 将消息推送给Socket使在线用户能接收到消息已读的反馈
	messages := utils.Map(messagesDao, func(item chatDao.MessageDao, index int) chat.Message {
		return item.ToIDL()
	})
	rpcClient.ChatSocketClient.PostMessages(convId, messages)

	// 将消息推送给当前用户，清除消息列表中的未读消息提示
	sequence, err := chatService.GetSequenceItem(userId)
	if err != nil {
		panic(err)
	}

	sequences := make([]socket.UserConversationSequence, 1)
	sequences[0] = socket.UserConversationSequence{
		UserId:   &userId,
		Sequence: &sequence,
	}
	rpcClient.ChatSocketClient.PostUserSequence(sequences)
}

func attachCheckMessage(r *gin.Engine) {
	r.POST(chat.ChatRpcDefinition.CHECK_MESSAGE_PATH, middleware.RpcGuard, func(ctx *gin.Context) {
		props := chat.CheckMessageRequest{}
		ctx.BindJSON(&props)

		rpcController.CheckMessage(ctx, props.UserId, props.ConvId)

		ctx.JSON(200, "OK")
	})
}
