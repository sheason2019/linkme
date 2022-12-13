package todoService

import (
	"fmt"

	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func FindTodoItemById(id uint) (*todoDao.TodoItem, error) {
	todoItems := make([]todoDao.TodoItem, 0)

	conn := db.GetConn()

	err := conn.Where("id = ?", id).Find(&todoItems).Error
	if err != nil {
		return nil, err
	}

	if len(todoItems) == 0 {
		return nil, fmt.Errorf("无法获取指定ID的TodoItem id::%d", id)
	}

	todoItem := todoItems[0]

	return &todoItem, nil
}
