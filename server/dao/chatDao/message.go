package chatDao

import (
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/utils"
	"gorm.io/gorm"
)

// 用户发送的消息
const MessageType_UserMessage = "user-message"

// 邀请用户加入群聊
const MessageType_GroupInvite = "group-invite"

// 图像信息
const MessageType_Image = "image"

var UserMessageAllowType = []string{MessageType_Image, MessageType_UserMessage}

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

// 需要Preload MessageRecivers
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
