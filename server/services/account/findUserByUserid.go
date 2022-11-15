package accountService

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
)

func FindUserByUserId(userId int) (*userDao.UserDao, error) {
	conn := db.GetConn()

	user := userDao.UserDao{}
	user.ID = uint(userId)

	err := conn.Where(&user).Limit(1).Find(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}
