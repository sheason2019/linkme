package chatDao

import "gorm.io/gorm"

type MessageReciver struct {
	gorm.Model

	MemberId uint
	Member   MemberDao `gorm:"foreignKey:MemberId"`

	MessageId uint
	Message   MessageDao `gorm:"foreignKey:MessageId"`
}
