package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/utils"
)

const find_message_length = 50

func FindMessages(convId int, originMessageId int) ([]chatDao.MessageDao, bool, error) {
	conn := db.GetConn()
	messages := make([]chatDao.MessageDao, 0)
	var count int64

	// 这段代码完全拧在一起了，看起来可能得花点时间
	if originMessageId == 0 {
		// 等于0时拉取最新的消息
		err := conn.
			Where("conversation_id = ?", convId).
			Preload("MessageRecivers").
			Limit(find_message_length).
			Order("created_at desc").
			Find(&messages).
			Error
		if err != nil {
			return nil, false, err
		}
		// 获取Count
		err = conn.
			Model(&messages).
			Where("conversation_id = ?", convId).
			Order("created_at desc").
			Count(&count).
			Error
		if err != nil {
			return nil, false, err
		}
	} else {
		msg := chatDao.MessageDao{}
		msg.ID = uint(originMessageId)
		err := conn.Where(&msg).Find(&msg).Error
		if err != nil {
			return nil, false, err
		}
		// 否则以originMessageId所指代的消息为原点，拉取更早的消息
		err = conn.
			Where("conversation_id = ? and created_at < ?", convId, msg.CreatedAt).
			Preload("MessageRecivers").
			Limit(find_message_length).
			Order("created_at desc").
			Find(&messages).
			Error
		if err != nil {
			return nil, false, err
		}
		err = conn.
			Model(&messages).
			Where("conversation_id = ? and created_at < ?", convId, msg.CreatedAt).
			Order("created_at desc").
			Count(&count).
			Error
		if err != nil {
			return nil, false, err
		}
	}

	return utils.Reverse(messages), count > find_message_length, nil
}
