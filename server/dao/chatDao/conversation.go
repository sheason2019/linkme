package chatDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/utils"
	"gorm.io/gorm"
)

// 会话类型 私聊
const ConversationType_Private = "private"

type ConversationDao struct {
	gorm.Model

	Type string

	Name string

	// 指定会话的所有者，在群聊中，这通常用来指代群主，在私聊中，这用来表示首先创建会话的用户
	Owner   userDao.UserDao `gorm:"foreignKey:OwnerId"`
	OwnerId uint
	// 在私聊中，这个字段用来表示被发起私聊的用户
	TargetUser_InPrivate   userDao.UserDao `gorm:"foreignKey:TargetUserId_InPrivate"`
	TargetUserId_InPrivate uint

	Members []MemberDao `gorm:"foreignKey:ConversationId"`

	Messages []MessageDao `gorm:"foreignKey:ConversationId"`
}

// 序列化为私聊类型的会话信息
func (model ConversationDao) ToPrivateIDL(currentUserId uint) chat.Conversation {
	conv := chat.Conversation{}

	conv.Id = utils.ConvertUintToIntPtr(model.ID)
	if currentUserId == model.OwnerId {
		conv.Name = &model.TargetUser_InPrivate.Username
	} else {
		conv.Name = &model.Owner.Username
	}
	conv.Type = &model.Type

	return conv
}
