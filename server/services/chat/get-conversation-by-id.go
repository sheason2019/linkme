package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

func GetConversationById(convId int) (*chatDao.ConversationDao, error) {
	conn := db.GetConn()

	convDao := chatDao.ConversationDao{}
	convDao.ID = uint(convId)

	err := conn.
		Preload("Owner").
		Preload("TargetUser_InPrivate").
		Where(&convDao).
		Limit(1).
		Find(&convDao).
		Error

	if err != nil {
		return nil, err
	}

	return &convDao, nil
}
