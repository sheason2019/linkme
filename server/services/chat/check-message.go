package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

func CheckMessage(userId, convId int) ([]chatDao.MessageReciver, error) {
	conn := db.GetConn()

	member, err := FindMember(convId, userId)
	if err != nil {
		return nil, err
	}

	recivers := make([]chatDao.MessageReciver, 0)

	err = conn.
		Model(&chatDao.MessageReciver{}).
		Preload("Message").
		Where("member_id = ? and checked = false", member.ID).
		Find(&recivers).
		Error
	if err != nil {
		return nil, err
	}

	if len(recivers) == 0 {
		return nil, nil
	}

	for i := range recivers {
		recivers[i].Checked = true
	}

	err = conn.Save(&recivers).Error
	if err != nil {
		return nil, err
	}

	return recivers, nil
}
