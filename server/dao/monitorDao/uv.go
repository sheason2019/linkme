package monitorDao

import "gorm.io/gorm"

// UV统计数据
// 目前的统计方式是使用IP区分
type UVDao struct {
	gorm.Model
	Ip string
}
