package db

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/dao/uploadDao"
	"github.com/sheason2019/linkme/dao/userDao"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var connSingleton *gorm.DB = nil

func GetConn() *gorm.DB {
	if connSingleton != nil {
		return connSingleton
	}

	dsn := "host=" + host + " user=" + user + " password=" + password + " sslmode=disable TimeZone=Asia/Shanghai"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		panic("数据库连接异常！")
	}

	rs := db.Raw("SELECT * FROM pg_database WHERE datname = 'linkme'")
	if rs.Error != nil {
		panic(rs.Error)
	}

	var rec = make(map[string]interface{})
	if rs.Find(rec); len(rec) == 0 {
		db.Exec("CREATE DATABASE linkme")
	}

	dsn = "host=" + host + " user=" + user + " password=" + password + " dbname=linkme sslmode=disable TimeZone=Asia/Shanghai"

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		panic("数据库连接异常！")
	}

	println("成功连接至数据库")
	connSingleton = db
	return db
}

func AutoMigrate() {
	connSingleton.AutoMigrate(
		&userDao.UserDao{},
		&chatDao.ConversationDao{},
		&chatDao.MemberDao{},
		&chatDao.MessageDao{},
		&chatDao.MessageReciver{},
		&chatDao.SequenceDao{},
		&uploadDao.StoragedFile{},
		&uploadDao.StoragedImage{},
	)
}
