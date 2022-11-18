package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/utils"
)

func FindMessages(convId int, originMessageId int) ([]chatDao.MessageDao, error) {
	conn := db.GetConn()
	messages := make([]chatDao.MessageDao, 0)

	if originMessageId == 0 {
		// 等于0时拉取最新的50条消息
		err := conn.
			Where("conversation_id = ?", convId).
			Preload("MessageRecivers").
			Limit(50).
			Order("created_at desc").
			Find(&messages).
			Error
		if err != nil {
			return nil, err
		}
	} else {
		msg := chatDao.MessageDao{}
		msg.ID = uint(originMessageId)
		err := conn.Where(&msg).Find(&msg).Error
		if err != nil {
			return nil, err
		}
		// 否则以originMessageId所指代的消息为原点，拉取50条更早的消息
		err = conn.
			Where("conversation_id = ? and created_at < ?", convId, msg.CreatedAt).
			Preload("MessageRecivers").
			Limit(50).
			Order("created_at desc").
			Find(&messages).
			Error

		if err != nil {
			return nil, err
		}
	}
	return utils.Reverse(messages), nil
}
