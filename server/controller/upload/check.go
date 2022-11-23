package uploadController

import (
	"github.com/sheason2019/linkme/dao/uploadDao"
	"github.com/sheason2019/linkme/db"
)

func FindFileByHash(hashStr string) (*uploadDao.StoragedFile, error) {
	conn := db.GetConn()

	var count int64

	fileDao := uploadDao.StoragedFile{}
	err := conn.Model(&fileDao).Where("hash = ?", hashStr).Count(&count).Error
	if err != nil {
		return nil, err
	}

	// 若 Count == 0 则表示文件不存在
	if count == 0 {
		return nil, nil
	}

	err = conn.Where("hash = ?", hashStr).Find(&fileDao).Error
	if err != nil {
		return nil, err
	}

	return &fileDao, nil
}
