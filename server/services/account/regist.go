package accountService

import (
	"crypto/md5"
	"fmt"

	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
)

// 将存储的用户密码进行加密
func EncryptPassword(user *userDao.UserDao) {
	salt, saltId := GenerateSalt()
	saltedPassword := user.Password + salt

	md5Str := fmt.Sprintf("%x", md5.Sum([]byte(saltedPassword)))
	user.Password = md5Str
	user.Salt = salt

	RemoveSalt(saltId)
}

// 创建用户
func CreateUser(user *userDao.UserDao) error {
	conn := db.GetConn()
	err := conn.Create(user).Error
	if err != nil {
		return err
	}

	return nil
}
