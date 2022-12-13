package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func MountTodoOnTodo(todo *todoDao.TodoItem, parent *todoDao.TodoItem) error {
	// 在Todo中添加Todo，具体的操作就是为它们建立双向的Edge
	conn := db.GetConn()

	var skip bool
	changed := false

	// 将Parent添加到依赖者列表中
	skip = false
	for _, v := range todo.References {
		if v == parent.ID {
			skip = true
		}
	}
	if !skip {
		todo.References = append(todo.References, parent.ID)
		changed = true
	}

	// 将Todo添加到Parent的包含列表中
	skip = false
	for _, v := range parent.Contained {
		if v == todo.ID {
			skip = true
		}
	}
	if !skip {
		parent.Contained = append([]uint{todo.ID}, parent.Contained...)
		changed = true
	}

	// 仅当DAO层发生变更时，执行保存操作
	if changed {
		return conn.Save([]todoDao.TodoItem{*todo, *parent}).Error
	}

	return nil
}
