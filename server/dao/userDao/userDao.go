package userDao

import "gorm.io/gorm"

type UserDao struct {
	gorm.Model
	Username string
	Password string
	Avatar   *string
}
