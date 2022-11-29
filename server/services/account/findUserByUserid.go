package accountService

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
)

func FindUserByUserId(userId int) (*userDao.UserDao, error) {
	conn := db.GetConn()

	user := userDao.UserDao{}
	var count int64

	err := conn.
		Model(&user).
		Where("id = ?", userId).
		Limit(1).
		Count(&count).
		Error
	if err != nil {
		return nil, err
	}
	if count == 0 {
		return nil, nil
	}

	err = conn.
		Where("id = ?", userId).
		Limit(1).
		Find(&user).
		Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}
