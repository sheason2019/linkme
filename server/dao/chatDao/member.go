package chatDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"gorm.io/gorm"
)

type MemberDao struct {
	gorm.Model

	ConversationId uint
	Conversation   ConversationDao `gorm:"foreignKey:ConversationId"`

	UserId uint
	User   userDao.UserDao `gorm:"foreignKey:UserId"`
}
