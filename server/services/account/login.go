package accountService

import (
	"crypto/md5"
	"errors"
	"fmt"

	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
)

func GetUserByUsername(username string) (*userDao.UserDao, error) {
	user := userDao.UserDao{}
	conn := db.GetConn()

	user.Username = username
	err := conn.Where(&user).First(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func ValidatePassword(user *userDao.UserDao, password string) error {
	saltedPassword := password + user.Salt
	md5Str := fmt.Sprintf("%x", md5.Sum([]byte(saltedPassword)))

	if md5Str != user.Password {
		return errors.New("用户密码有误")
	}

	return nil
}
