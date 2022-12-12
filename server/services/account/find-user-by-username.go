package accountService

import (
	"errors"

	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
)

func FindUserByUsername(username string) (*userDao.UserDao, error) {
	users := make([]userDao.UserDao, 0)

	conn := db.GetConn()

	err := conn.Where("username = ?", username).Limit(1).Find(&users).Error
	if err != nil {
		return nil, err
	}

	if len(users) == 0 {
		return nil, errors.New("未检索到指定用户")
	}

	user := users[0]

	return &user, nil
}
