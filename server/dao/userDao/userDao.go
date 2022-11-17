package userDao

import (
	"github.com/sheason2019/linkme/omi/account"
	"github.com/sheason2019/linkme/utils"
	"gorm.io/gorm"
)

type UserDao struct {
	gorm.Model
	Username string `gorm:"uniqueIndex"`
	Password string
	Salt     string

	Avatar *string
}

func GenerateUserDaoFromIdl(user account.User) UserDao {
	userDao := UserDao{}
	userDao.ID = uint(*user.UserId)
	userDao.Username = *user.Username
	userDao.Password = *user.Password
	userDao.Avatar = user.AvatarUrl

	return userDao
}

func (model UserDao) ToIdl() account.User {
	user := account.User{}
	user.UserId = utils.ConvertNumberToIntPtr(model.ID)
	user.Username = &model.Username
	user.Password = &model.Password
	user.AvatarUrl = model.Avatar

	return user
}
