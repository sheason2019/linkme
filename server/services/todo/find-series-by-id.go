package todoService

import (
	"fmt"

	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func FindSeriesById(id uint) (*todoDao.TodoSeries, error) {
	conn := db.GetConn()

	seriesArr := make([]todoDao.TodoSeries, 0)
	err := conn.Where("id = ?", id).Limit(1).Find(&seriesArr).Error

	if err != nil {
		return nil, err
	}

	if len(seriesArr) == 0 {
		return nil, fmt.Errorf("指定的Series不存在 %d", id)
	}

	series := seriesArr[0]

	return &series, nil
}
