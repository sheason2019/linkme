package chatService

import (
	"encoding/json"

	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

func GetSequence(userId uint) ([]uint, *chatDao.SequenceDao, error) {
	conn := db.GetConn()

	sequenceDao := chatDao.SequenceDao{}
	sequenceDao.UserId = userId

	// 先判断数据库中是否存有该用户的消息列表信息
	var count int64
	err := conn.Model(&sequenceDao).Where(&sequenceDao).Count(&count).Error
	if err != nil {
		return nil, &sequenceDao, err
	}
	// 若没有则直接返回空数组
	if count == 0 {
		return make([]uint, 0), &sequenceDao, nil
	}

	err = conn.Model(&sequenceDao).Where(&sequenceDao).Limit(1).Find(&sequenceDao).Error

	if err != nil {
		return nil, &sequenceDao, err
	}

	// 获取会话队列信息，其值为一个uint类型的数组
	convSequence := make([]uint, 0)
	err = json.Unmarshal([]byte(sequenceDao.Sequence), &convSequence)

	return convSequence, &sequenceDao, err
}
