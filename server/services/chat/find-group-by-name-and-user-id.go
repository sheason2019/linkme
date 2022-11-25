package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

func FindGroupByNameAndUserId(name string, userId uint, offset int) ([]chatDao.ConversationDao, bool, error) {
	const block_size = 12

	conn := db.GetConn()

	convs := make([]chatDao.ConversationDao, 0)
	if len(name) == 0 {
		return convs, false, nil
	}

	var count int64

	err := conn.
		Model(&convs).
		Joins("JOIN member_daos ON member_daos.conversation_id = conversation_daos.id").
		Where("member_daos.user_id = ?", userId).
		Where("type like ?", "group").
		Where("name like ?", "%"+name+"%").
		Preload("Members").
		Offset(offset).
		Limit(block_size).
		Find(&convs).
		Count(&count).
		Error

	if err != nil {
		return nil, false, err
	}

	return convs, count > block_size, nil
}
