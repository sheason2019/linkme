package todoDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"gorm.io/gorm"
)

type TodoSeries struct {
	gorm.Model
	Name string

	// Group的ID次序
	Groups []uint `gorm:"serializer:json"`

	Type string

	// 系列的所有者
	OwnerId uint
	Owner   userDao.UserDao `gorm:"foreignKey:OwnerId"`
}
