package accountService

import (
	"errors"

	"github.com/sheason2019/linkme/dao/userDao"
)

func ValidateRegist(user *userDao.UserDao) (*userDao.UserDao, error) {
	// 表单验证逻辑，这里和前端保持一致即可
	usernameLength := len(user.Username)
	if usernameLength < 4 || usernameLength > 16 {
		return nil, errors.New("用户名不能小于4位或大于16位")
	}
	passwordLength := len(user.Password)
	if passwordLength < 6 || passwordLength > 64 {
		return nil, errors.New("用户密码不能小于6位或大于64位")
	}

	return user, nil
}
