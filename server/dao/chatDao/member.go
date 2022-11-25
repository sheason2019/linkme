package chatDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"gorm.io/gorm"
)

// 成员类型
var MemberType_Normal = "normal"
var MemberType_Owner = "owner"

type MemberDao struct {
	gorm.Model

	ConversationId uint
	Conversation   ConversationDao `gorm:"foreignKey:ConversationId"`

	UserId uint
	User   userDao.UserDao `gorm:"foreignKey:UserId"`

	// 标识该用户是否已被移出群聊
	Removed bool
}
