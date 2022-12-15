package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func FindTodoGroupsBySeriesId(seriesId uint) ([]todoDao.TodoGroup, error) {
	groups := make([]todoDao.TodoGroup, 0)

	conn := db.GetConn()
	err := conn.Where("series_id = ?", seriesId).Find(&groups).Error
	if err != nil {
		return nil, err
	}

	return groups, nil
}
