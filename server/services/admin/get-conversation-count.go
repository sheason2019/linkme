package adminService

import (
	"github.com/sheason2019/linkme/omi/admin"
)

// 根据指定长度获取用户数量
func GetConversationCount(length int) ([]admin.SatisticsItem, error) {
	return TableCountWithDate("conversation_daos", length)
}
