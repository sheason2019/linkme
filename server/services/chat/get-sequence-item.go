package chatService

import (
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/utils"
)

func GetSequenceItem(userId int) ([]chat.SequenceItem, error) {
	convs, err := GetConversationSequence(uint(userId))
	if err != nil {
		return nil, err
	}

	sequence := make([]*chat.SequenceItem, len(convs))
	for i, v := range convs {
		sequenceItem, err := ConvertConversationToSequenceItem(uint(userId), v)
		if err != nil {
			return nil, err
		}
		sequence[i] = sequenceItem
	}

	// 因为用户在某些会话中可能会被踢出成员名单，在这种情况下SequenceItem的值将会是nil
	// 此时需要对数组进行一次filter操作，保证用户拿到的SequenceItem值都是有效值
	sequence = utils.Filter(sequence, func(item *chat.SequenceItem, index int) bool {
		return item != nil
	})

	// 将指针转换为其指向的结构体
	return utils.Map(sequence, func(item *chat.SequenceItem, index int) chat.SequenceItem {
		return *item
	}), nil
}
