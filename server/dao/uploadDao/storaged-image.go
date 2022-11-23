package uploadDao

import "gorm.io/gorm"

type StoragedImage struct {
	gorm.Model
	// 图像的后缀名，用来区分jpg、png等格式
	Ext string
	// 图像的源文件摘要值，用来索引图像
	SourceHash string

	// 不同清晰度下指向的文件
	// 360P 通常用作用户和群聊头像
	LowQualityFile   *StoragedFile `gorm:"foreignKey:LowQualityFileId"`
	LowQualityFileId uint

	// 720P 聊天中使用的图像缩略图
	MiddleQualityFile   *StoragedFile `gorm:"foreignKey:MiddleQualityFileId"`
	MiddleQualityFileId uint

	// 1080P 聊天中点击开启图像后展示的大图
	HighQualityFile   *StoragedFile `gorm:"foreignKey:HighQualityFileId"`
	HighQualityFileId uint

	// 原图
	OriginFile   *StoragedFile `gorm:"foreignKey:OriginFileId"`
	OriginFileId uint
}
