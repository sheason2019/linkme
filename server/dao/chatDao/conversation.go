package chatDao

import "gorm.io/gorm"

type ConversationDao struct {
	gorm.Model

	Members []MemberDao

	Messages []MessageDao
}
