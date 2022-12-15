package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/utils"
)

// 删除Group中关于指定Todo的引用
func DeleteTodoFromGroup(todo *todoDao.TodoItem, group *todoDao.TodoGroup) error {
	conn := db.GetConn()

	group.Contained = utils.Filter(group.Contained, func(id uint, index int) bool {
		return id != todo.ID
	})

	return conn.Save(&group).Error
}
