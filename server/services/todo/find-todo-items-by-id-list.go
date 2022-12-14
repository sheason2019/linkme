package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func FindTodoItemsByIdList(idList []uint) ([]todoDao.TodoItem, error) {
	todoItems := make([]todoDao.TodoItem, 0)

	conn := db.GetConn()

	err := conn.Where("id in ?", idList).Find(&todoItems).Error
	if err != nil {
		return nil, err
	}

	return todoItems, nil
}
