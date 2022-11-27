package chatDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/utils"
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

func (model MemberDao) ToIDL() chat.MessageMember {
	name := model.User.Username
	member := chat.MessageMember{}
	member.Name = &name
	member.MemberId = utils.ConvertNumberToIntPtr(model.ID)
	member.UserId = utils.ConvertNumberToIntPtr(model.UserId)
	member.AvatarUrl = model.User.Avatar
	member.ConversationId = utils.ConvertNumberToIntPtr(model.ConversationId)
	member.Removed = &model.Removed

	if model.UserId == model.Conversation.OwnerId {
		member.Type = &MemberType_Owner
	} else {
		member.Type = &MemberType_Normal
	}

	return member
}
