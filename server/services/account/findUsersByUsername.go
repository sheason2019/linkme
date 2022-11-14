package accountService

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
)

func FindUsersByUsername(username string, offset int) ([]userDao.UserDao, bool, error) {
	users := make([]userDao.UserDao, 0)
	// 如果没有输入用户名则不进行搜索
	if len(username) == 0 {
		return users, false, nil
	}
	// 否则通过用户名直接在Postgres中进行搜索
	conn := db.GetConn()

	err := conn.
		Model(&userDao.UserDao{}).
		Where("username like ?", "%"+username+"%").
		Offset(offset).
		Limit(25).
		Find(&users).
		Error

	if err != nil {
		return nil, false, err
	}

	var count int64

	err = conn.
		Model(&userDao.UserDao{}).
		Where("username = ?", "%"+username+"%").
		Offset(offset).
		Limit(25).
		Count(&count).
		Error

	if err != nil {
		return nil, false, err
	}

	hasMore := false
	if count > int64(offset)+25 {
		hasMore = true
	}

	return users, hasMore, nil
}
