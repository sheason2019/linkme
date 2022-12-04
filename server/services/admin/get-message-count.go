package adminService

import (
	"github.com/sheason2019/linkme/omi/admin"
)

// 根据指定长度获取用户数量
func GetMessageCount(length int) ([]admin.SatisticsItem, error) {
	return TableCountWithDate("message_daos", length)
}
