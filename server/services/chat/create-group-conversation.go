package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/utils"
	"gorm.io/gorm"
)

func CreateGroupConversation(ownerId uint, userIds []int, groupName string) (*chatDao.ConversationDao, error) {
	conn := db.GetConn()

	conv := chatDao.ConversationDao{
		OwnerId: ownerId,
		Name:    groupName,
		Type:    chatDao.ConversationType_Group,
	}

	err := conn.Transaction(func(tx *gorm.DB) error {
		// 首先创建会话
		err := tx.Create(&conv).Error
		if err != nil {
			return err
		}

		// 计算出会话成员信息
		memberUserIds := utils.Map(userIds, func(item, index int) uint {
			return uint(item)
		})
		memberUserIds = append(memberUserIds, ownerId)

		members := make([]chatDao.MemberDao, len(memberUserIds))
		for i, v := range memberUserIds {
			members[i] = chatDao.MemberDao{
				ConversationId: conv.ID,
				UserId:         v,
			}
		}

		// 创建会话成员
		err = tx.Create(&members).Error
		if err != nil {
			return nil
		}

		conv.Members = members

		return nil
	})

	if err != nil {
		return nil, err
	}

	return &conv, nil
}
