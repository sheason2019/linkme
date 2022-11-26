package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

func GetConversationSequence(userId uint) ([]chatDao.ConversationDao, error) {
	conn := db.GetConn()

	convSequence, _, err := GetSequence(userId)
	if err != nil {
		return nil, err
	}

	// 根据会话队列获取指定的会话信息
	convDaos := make([]chatDao.ConversationDao, 0)
	err = conn.
		Model(&chatDao.ConversationDao{}).
		Where("id in ?", convSequence).
		Preload("Owner").
		Preload("Messages").
		Preload("TargetUser_InPrivate").
		Find(&convDaos).
		Error
	if err != nil {
		return nil, err
	}

	// 会话列表不为空时进行一下排序
	if len(convDaos) != 0 {
		// 使用Map进行排序，复杂度O(2n)
		sortMap := make(map[uint]chatDao.ConversationDao)
		for _, v := range convDaos {
			sortMap[v.ID] = v
		}
		for i, v := range convSequence {
			convDaos[i] = sortMap[v]
		}
	}

	return convDaos, nil
}
