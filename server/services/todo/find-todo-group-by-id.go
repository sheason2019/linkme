package todoService

import (
	"errors"

	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func FindTodoGroupById(id uint) (*todoDao.TodoGroup, error) {
	conn := db.GetConn()

	groups := make([]todoDao.TodoGroup, 0)
	err := conn.Where("id = ?", id).Limit(1).Find(&groups).Error
	if err != nil {
		return nil, err
	}

	if len(groups) == 0 {
		return nil, errors.New("未查询到指定的Group")
	}

	group := groups[0]

	return &group, nil
}
