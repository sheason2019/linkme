package adminService

import (
	"time"

	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/omi/admin"
	"github.com/sheason2019/linkme/utils"
)

// 根据指定长度获取用户数量
func GetUvCount(length int) ([]admin.SatisticsItem, error) {
	items := make([]admin.SatisticsItem, 0)
	conn := db.GetConn()

	now := time.Now()

	for i := 0; i < length; i++ {
		specificTime := now.Add(-time.Hour * 24 * time.Duration(i))
		// 拿到指定的日期
		dayStr := specificTime.Format("2006-01-02")
		day, err := time.Parse("2006-01-02", dayStr)
		if err != nil {
			return nil, err
		}

		item := admin.SatisticsItem{}
		err = conn.
			Raw("select ? as label, count(id) as count from uv_daos where created_at < ? and created_at >= ? ", specificTime.Format("01-02"), day.Add(time.Hour*24), day).
			Scan(&item).
			Error
		if err != nil {
			return nil, err
		}

		items = append(items, item)
	}

	return utils.Reverse(items), nil
}
