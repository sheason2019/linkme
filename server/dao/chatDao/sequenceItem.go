package chatDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"gorm.io/gorm"
)

type SequenceItemDao struct {
	gorm.Model

	User   userDao.UserDao `gorm:"foreignKey:UserId"`
	UserId uint

	Conversation   ConversationDao `gorm:"foreignKey:ConversationId"`
	ConversationId uint
}
