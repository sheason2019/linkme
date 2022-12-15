package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/utils"
)

func DeleteTodoFromTodo(todo, parent *todoDao.TodoItem) error {
	conn := db.GetConn()

	// 首先要在parent中移除todo的引用
	parent.Contained = utils.Filter(parent.Contained, func(id uint, index int) bool {
		return id != todo.ID
	})
	// 然后要在todo中移除Parent的依赖
	todo.References = utils.Filter(todo.References, func(id uint, index int) bool {
		return id != parent.ID
	})

	// 保存两者之间的依赖关系，就完成了Todo关系的移除
	todoList := []todoDao.TodoItem{*todo, *parent}
	return conn.Save(&todoList).Error
}
