package uploadController

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"image"
	"image/jpeg"
	"image/png"

	"github.com/disintegration/imaging"
	"github.com/sheason2019/linkme/dao/uploadDao"
	"github.com/sheason2019/linkme/db"
)

func StorageFile(path, hashStr, ext string) (*uploadDao.StoragedFile, error) {
	conn := db.GetConn()

	daoFile := uploadDao.StoragedFile{}
	daoFile.Hash = hashStr
	daoFile.Location = path
	daoFile.Ext = ext

	err := conn.Create(&daoFile).Error
	if err != nil {
		return nil, err
	}

	return &daoFile, nil
}

// 存储图像
func StorageImage(img image.Image, ext string) (*uploadDao.StoragedFile, error) {
	hash := sha256.New()
	var err error
	if ext == ".jpeg" || ext == ".jpg" {
		err = jpeg.Encode(hash, img, nil)
	} else if ext == ".png" {
		err = png.Encode(hash, img)
	} else {
		return nil, errors.New("未知的图像格式")
	}
	if err != nil {
		return nil, err
	}
	hashStr := hex.EncodeToString(hash.Sum(nil))

	path := upload_path + hashStr + ext
	err = imaging.Save(img, path)
	if err != nil {
		return nil, err
	}

	conn := db.GetConn()

	daoFile := uploadDao.StoragedFile{}
	daoFile.Hash = hashStr
	daoFile.Ext = ext
	daoFile.Location = path

	err = conn.Create(&daoFile).Error
	if err != nil {
		return nil, err
	}

	return &daoFile, nil
}
