package todoService

import (
	"errors"

	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func MountTodoOnGroup(todo *todoDao.TodoItem, group *todoDao.TodoGroup) error {
	// 首先判断Group中是否已存在Todo的引用，若已存在引用，则不再添加重复的引用
	for _, v := range group.Contained {
		if v == todo.ID {
			return errors.New("指定的待办事项已存在")
		}
	}

	conn := db.GetConn()

	// 在Group中添加Todo的引用
	group.Contained = append([]uint{todo.ID}, group.Contained...)
	return conn.Save(group).Error
}
