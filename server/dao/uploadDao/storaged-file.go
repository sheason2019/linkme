package uploadDao

import "gorm.io/gorm"

type StoragedFile struct {
	gorm.Model
	// MD5 摘要值
	Hash string
	// 文件实际存在的地址
	Location string
	// 文件后缀名
	Ext string
}
