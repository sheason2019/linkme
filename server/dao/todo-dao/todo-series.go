package todoDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"gorm.io/gorm"
)

type TodoSeries struct {
	gorm.Model
	Name string

	// 指定Series所包含的Group
	Groups []TodoGroup

	// Group的ID次序
	GroupsIndex []uint `gorm:"serializer:json"`

	// 系列的所有者
	OwnerId uint
	Owner   userDao.UserDao `gorm:"foreignKey:OwnerId"`
}
