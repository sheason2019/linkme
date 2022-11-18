package chatController

import (
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/omi/socket"
	rpcClient "github.com/sheason2019/linkme/rpc-client"
	chatService "github.com/sheason2019/linkme/services/chat"
	"github.com/sheason2019/linkme/utils"
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

	// 将消息推送到指定用户的消息列表
	// 以 [](用户ID + SequenceItem) 为参数，将需要更新的SequenceItem推送给指定在线用户
	// 为了快速上线，目前先使用全量更新，后续版本需要给个合理的解法进行增量更新以降低数据传输量

	// 拉取全部需要更新消息列表的成员
	reciverMembers := append(member.Conversation.Members, *member)

	userSequences := make([]socket.UserConversationSequence, 0)

	// 将指定的 Conversation 推进它们的Sequence结构体
	// 由于数据之间的读写没有冲突，使用并发进行加速
	var wg sync.WaitGroup

	for index := range reciverMembers {
		wg.Add(1)
		reciver := reciverMembers[index]
		go func() {
			chatService.PushConversationIntoSequence(&member.Conversation, &reciver.User)
			convs, err := chatService.GetConversationSequence(reciver.UserId)
			if err != nil {
				panic(err)
			}
			sequence := make([]chat.SequenceItem, len(convs))
			for i, conv := range convs {
				item, err := chatService.ConvertConversationToSequenceItem(reciver.UserId, conv)
				if err != nil {
					panic(err)
				}
				sequence[i] = *item
			}
			userSequence := socket.UserConversationSequence{
				UserId:   utils.ConvertNumberToIntPtr(reciver.UserId),
				Sequence: &sequence,
			}
			userSequences = append(userSequences, userSequence)
			wg.Done()
		}()
	}
	wg.Wait()
	// 将数据推送到Socket端
	rpcClient.ChatSocketClient.PostUserSequence(userSequences)

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
