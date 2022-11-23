package uploadController

import (
	"image"

	"github.com/disintegration/imaging"
	"github.com/sheason2019/linkme/dao/uploadDao"
	"github.com/sheason2019/linkme/db"
)

// 图像处理
func UploadImage(img image.Image, formatName, ext, fileHash string) (*uploadDao.StoragedImage, error) {
	conn := db.GetConn()

	imageDao := uploadDao.StoragedImage{}

	imageDao.Ext = ext
	imageDao.SourceHash = fileHash
	// 原图
	originFile, err := StorageImage(img, ext)
	if err != nil {
		return nil, err
	}
	imageDao.OriginFile = originFile

	// high Quality 1080P
	highFile, err := ResizeImage(img, 1080, ext)
	if err != nil {
		return nil, err
	}
	imageDao.HighQualityFile = highFile

	// middle Quality 720P
	midFile, err := ResizeImage(img, 720, ext)
	if err != nil {
		return nil, err
	}
	imageDao.MiddleQualityFile = midFile

	// low Quality 360P
	lowFile, err := ResizeImage(img, 360, ext)
	if err != nil {
		return nil, err
	}
	imageDao.LowQualityFile = lowFile

	err = conn.Create(&imageDao).Error
	if err != nil {
		return nil, err
	}

	return &imageDao, nil
}

func ResizeImage(img image.Image, pixels int, ext string) (*uploadDao.StoragedFile, error) {
	imgWidth := img.Bounds().Dx()
	imgHeight := img.Bounds().Dy()

	// 如果图像过于小，以至于无法产生更低的分辨率，则跳过该分辨率
	if imgWidth < pixels && imgHeight < pixels {
		return nil, nil
	}

	var resizedWidth int
	var resizedHeight int
	if imgWidth >= imgHeight {
		resizedWidth = pixels
		resizedHeight = (imgHeight * pixels / imgWidth)
	} else {
		resizedHeight = pixels
		resizedWidth = (imgWidth * pixels / imgWidth)
	}

	resizedImg := imaging.Resize(img, resizedWidth, resizedHeight, imaging.Lanczos)

	return StorageImage(resizedImg, ext)
}
