package chatDao

import "gorm.io/gorm"

type MessageDao struct {
	gorm.Model

	Conversation   ConversationDao `gorm:"foreignKey:ConversationId"`
	ConversationId uint

	Member   MemberDao `gorm:"foreignKey:MemberId"`
	MemberId uint

	MessageRecivers []MessageReciver
}
