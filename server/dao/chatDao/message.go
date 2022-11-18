package chatDao

import (
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/utils"
	"gorm.io/gorm"
)

// 用户发送的消息
const MessageType_UserMessage = "user-message"

type MessageDao struct {
	gorm.Model

	Conversation   ConversationDao `gorm:"foreignKey:ConversationId"`
	ConversationId uint

	Member   MemberDao `gorm:"foreignKey:MemberId"`
	MemberId uint

	Type    string
	Content string

	MessageRecivers []MessageReciver `gorm:"foreignKey:MessageId"`
}

func (model MessageDao) ToIDL() chat.Message {
	message := chat.Message{}

	message.Id = utils.ConvertNumberToIntPtr(model.ID)
	message.MemberId = utils.ConvertNumberToIntPtr(model.MemberId)
	message.TimeStamp = utils.ConvertNumberToIntPtr(model.CreatedAt.Unix())

	message.Type = &model.Type
	message.Content = &model.Content

	var currentCheckedNum = 0
	for _, v := range model.MessageRecivers {
		if v.Checked {
			currentCheckedNum++
		}
	}
	message.TargetCheckedCount = utils.ConvertNumberToIntPtr(len(model.MessageRecivers))
	message.CurrentCheckedCount = &currentCheckedNum

	return message
}
