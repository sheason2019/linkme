package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/utils"
)

// 删除Group中关于指定Todo的引用
func DeleteTodoFromGroup(todo *todoDao.TodoItem, group *todoDao.TodoGroup) error {
	conn := db.GetConn()

	// 如果Todo中的GroupID与指定Group的GroupID相同，则删除表示删除Todo本身
	// 否则仅在指定Group中删除对Todo的引用
	group.Contained = utils.Filter(group.Contained, func(id uint, index int) bool {
		return id != todo.ID
	})

	err := conn.Save(&group).Error
	if err != nil {
		return err
	}

	if group.ID != todo.GroupId {
		return nil
	}

	return conn.Delete(&todo).Error
}
