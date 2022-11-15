package chatDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"gorm.io/gorm"
)

type SequenceDao struct {
	gorm.Model

	User   userDao.UserDao `gorm:"foreignKey:UserId"`
	UserId uint

	// 存储Conv Id的字符串
	Sequence string
	// 同上，但这个字段存储的是置顶队列
	TopSequence string
}
