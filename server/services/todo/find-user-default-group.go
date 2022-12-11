package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

// 获取用户默认待办事项组，如果用户的默认待办事项组不存在，
// 则会为用户创建一个新的待办事项组并将其返回给用户
func FindUserDefaultGroup(userId uint) (*todoDao.TodoGroup, error) {
	conn := db.GetConn()
	group := &todoDao.TodoGroup{}

	// 首先查询用户的默认事项组是否存在
	var count int64
	err := conn.
		Where("owner_id = ?", userId).
		Where("type = ?", todoDao.GroupType_Default).
		Count(&count).
		Error
	if err != nil {
		return nil, err
	}

	if count == 0 {
		// 默认事项组不存在则为用户创建默认事项组
		newGroup, err := CreateUserDefaultGroup(userId)
		if err != nil {
			return nil, err
		}
		group = newGroup
	} else {
		// 否则从数据库中读取用户的默认事项组
		err := conn.
			Where("owner_id = ?", userId).
			Where("type = ?", todoDao.GroupType_Default).
			Limit(1).
			Find(group).
			Error
		if err != nil {
			return nil, err
		}
	}

	return group, nil
}
