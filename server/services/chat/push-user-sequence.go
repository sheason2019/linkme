package chatService

import (
	"sync"

	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/omi/socket"
	rpcClient "github.com/sheason2019/linkme/rpc-client"
	"github.com/sheason2019/linkme/utils"
)

func PushUserSequence(reciverMembers []chatDao.MemberDao, convId uint) error {
	// 将消息推送到指定用户的消息列表
	// 以 [](用户ID + SequenceItem) 为参数，将需要更新的SequenceItem推送给指定在线用户
	// 为了快速上线，目前先使用全量更新，后续版本需要给个合理的解法进行增量更新以降低数据传输量

	// 拉取全部需要更新消息列表的成员

	userSequences := make([]socket.UserConversationSequence, 0)

	// 将指定的 Conversation 推进它们的Sequence结构体
	// 由于数据之间的读写没有冲突，使用并发进行加速
	var wg sync.WaitGroup

	for index := range reciverMembers {
		wg.Add(1)
		reciver := reciverMembers[index]
		go func() {
			PushConversationIntoSequence(convId, reciver.UserId, true)
			convs, err := GetConversationSequence(reciver.UserId)
			if err != nil {
				panic(err)
			}
			sequence := make([]chat.SequenceItem, len(convs))
			for i, conv := range convs {
				item, err := ConvertConversationToSequenceItem(reciver.UserId, conv)
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

	return nil
}
