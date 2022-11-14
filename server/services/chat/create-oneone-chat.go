package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
	"gorm.io/gorm"
)

// 创建私聊会话
func CreatePrivateConversation(userA, userB userDao.UserDao) (*chatDao.ConversationDao, error) {
	// 检查指定的用户私聊会话是否已经存在
	existConv, err := FindPrivateConversation(userA, userB)
	if err == nil {
		return existConv, err
	}

	existConv, err = FindPrivateConversation(userB, userA)
	if err == nil {
		return existConv, err
	}

	// 不存在则创建会话
	// 首先创建会话模型本身
	conv := chatDao.ConversationDao{
		Type:                 chatDao.ConversationType_Private,
		Owner:                userA,
		TargetUser_InPrivate: userB,
	}

	conn := db.GetConn()
	conn.Transaction(func(tx *gorm.DB) error {
		err := tx.Create(&conv).Error
		if err != nil {
			return err
		}

		// 然后创建会话中的成员
		memberA := chatDao.MemberDao{
			Conversation: conv,
			User:         userA,
		}
		memberB := chatDao.MemberDao{
			Conversation: conv,
			User:         userB,
		}
		list := []chatDao.MemberDao{memberA, memberB}
		err = tx.Create(&list).Error
		if err != nil {
			return err
		}

		// 创建完毕
		return nil
	})

	// 返回会话信息
	return &conv, nil
}

// 检查指定对话是否已经存在
func FindPrivateConversation(userA, userB userDao.UserDao) (*chatDao.ConversationDao, error) {
	conn := db.GetConn()

	conv := chatDao.ConversationDao{
		Owner:                userA,
		TargetUser_InPrivate: userB,
		Type:                 chatDao.ConversationType_Private,
	}

	err := conn.Where(&conv).Limit(1).Find(&conv).Error
	if err != nil {
		return nil, err
	}

	return &conv, nil
}
