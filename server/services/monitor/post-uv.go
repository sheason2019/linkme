package monitor_service

import (
	"time"

	"github.com/sheason2019/linkme/dao/monitorDao"
	"github.com/sheason2019/linkme/db"
)

var uvCache = make(map[string]bool)

// 创建UV统计数
func PostUV(ip string) error {
	// 首先查找内存缓存中是否已经存在
	_, exist := uvCache[ip]
	if exist {
		return nil
	}
	// 若内存缓存中不存在指定的IP，则从数据库寻找是否已经存在
	conn := db.GetConn()
	// 获取今日 0 点
	now := time.Now()
	todayStr := now.Format("2006-01-02")
	today, err := time.Parse("2006-01-02", todayStr)
	if err != nil {
		return err
	}

	var count int64
	err = conn.
		Model(&monitorDao.UVDao{}).
		Where("created_at > ?", today).
		Where("ip like ?", ip).
		Count(&count).
		Error
	if err != nil {
		return err
	}

	if count == 0 {
		// 如果内存缓存中不存在则创建Dao层
		uvDao := monitorDao.UVDao{}
		uvDao.Ip = ip

		err = conn.Create(&uvDao).Error
		if err != nil {
			return err
		}
	}

	// 将指定的值写进内存缓存
	uvCache[ip] = true

	return nil
}
