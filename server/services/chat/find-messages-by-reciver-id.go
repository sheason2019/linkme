package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

func FindMessagesByRecivers(recivers []chatDao.MessageReciver) ([]chatDao.MessageDao, error) {
	messages := make([]chatDao.MessageDao, 0)
	conn := db.GetConn()

	messagesId := make([]uint, 0)
	msgIdMap := make(map[uint]bool)

	for _, v := range recivers {
		_, exist := msgIdMap[v.MessageId]
		if !exist {
			messagesId = append(messagesId, v.MessageId)
			msgIdMap[v.MessageId] = true
		}
	}

	err := conn.
		Model(&messages).
		Preload("MessageRecivers").
		Where("id in ?", messagesId).
		Find(&messages).
		Error
	if err != nil {
		return nil, err
	}

	return messages, nil
}
