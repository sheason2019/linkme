package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func CreateTodoItem(content string, seriesId uint, ownerId uint, groupId uint) (*todoDao.TodoItem, error) {
	todo := todoDao.TodoItem{}
	todo.Content = content
	todo.Status = todoDao.TodoItemStatus_Waiting
	todo.OwnerId = ownerId
	todo.SeriesId = seriesId
	todo.GroupId = groupId

	conn := db.GetConn()
	err := conn.Create(&todo).Error
	if err != nil {
		return nil, err
	}

	return &todo, nil
}
