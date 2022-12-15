package todoService

import (
	"errors"

	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
	"gorm.io/gorm"
)

var lockMap = make(map[uint]bool)

// 为用户创建默认系列和默认事项组
func CreateUserDefaultGroup(userId uint) (*todoDao.TodoGroup, error) {
	// 使用乐观锁避免重复创建用户默认事项组
	if creating := lockMap[userId]; creating {
		return nil, errors.New("重复创建用户默认事项组")
	}

	lockMap[userId] = true

	conn := db.GetConn()
	group := todoDao.TodoGroup{}

	err := conn.Transaction(func(tx *gorm.DB) error {
		// 首先为用户创建默认的边界
		series := todoDao.TodoSeries{}
		series.Type = todoDao.GroupOrSeriesType_Default
		series.OwnerId = userId
		err := tx.Create(&series).Error
		if err != nil {
			return err
		}

		// 再为用户创建默认的事项组
		group.Type = todoDao.GroupOrSeriesType_Default
		group.OwnerId = userId
		group.SeriesId = series.ID

		err = tx.Create(&group).Error
		if err != nil {
			return err
		}

		series.Groups = []uint{group.ID}
		err = tx.Save(&series).Error

		return err
	})

	delete(lockMap, userId)

	if err != nil {
		return nil, err
	}

	return &group, nil
}
