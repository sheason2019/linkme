package accountService

import (
	"crypto/md5"
	"errors"
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
	// 若发现重复用户名需要向上抛出错误
	var count int64
	err := conn.Model(user).Where("username = ?", user.Username).Count(&count).Error
	if err != nil {
		return err
	}
	if count > 0 {
		return errors.New("指定的用户名已存在")
	}

	err = conn.Create(user).Error
	if err != nil {
		return err
	}

	return nil
}
