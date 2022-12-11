package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

// 为用户创建默认事项组
func CreateUserDefaultGroup(userId uint) (*todoDao.TodoGroup, error) {
	conn := db.GetConn()
	group := todoDao.TodoGroup{}

	group.Type = todoDao.GroupType_Default
	group.OwnerId = userId

	err := conn.Create(&group).Error
	if err != nil {
		return nil, err
	}

	return &group, nil
}
