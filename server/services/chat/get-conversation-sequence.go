package chatService

import (
	"encoding/json"

	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

func GetConversationSequence(userId uint) ([]chatDao.ConversationDao, error) {
	conn := db.GetConn()

	sequenceDao := chatDao.SequenceDao{}
	sequenceDao.UserId = userId

	// 先判断数据库中是否存有该用户的消息列表信息
	var count int64
	err := conn.Model(&sequenceDao).Where(&sequenceDao).Count(&count).Error
	if err != nil {
		return nil, err
	}
	// 若没有则直接返回空数组
	if count == 0 {
		return make([]chatDao.ConversationDao, 0), nil
	}

	err = conn.Model(&sequenceDao).Where(&sequenceDao).Limit(1).Find(&sequenceDao).Error

	if err != nil {
		return nil, err
	}

	// 获取会话队列信息，其值为一个uint类型的数组
	convSequence := make([]uint, 0)
	err = json.Unmarshal([]byte(sequenceDao.Sequence), &convSequence)
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
