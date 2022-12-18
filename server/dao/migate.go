package dao

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/dao/uploadDao"
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
)

func AutoMigrate() {
	db.GetConn().AutoMigrate(
		&userDao.UserDao{},
		&chatDao.ConversationDao{},
		&chatDao.MemberDao{},
		&chatDao.MessageDao{},
		&chatDao.MessageReciver{},
		&chatDao.SequenceDao{},
		&uploadDao.StoragedFile{},
		&uploadDao.StoragedImage{},
		&todoDao.TodoItem{},
		&todoDao.TodoGroup{},
		&todoDao.TodoSeries{},
		&todoDao.TodoStep{},
	)
}
