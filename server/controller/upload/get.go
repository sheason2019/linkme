package uploadController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/uploadDao"
)

const source_not_exist = "查询的资源不存在"

func attachGetSource(r *gin.Engine) {
	r.GET("/upload/:hash", func(ctx *gin.Context) {
		hashStr, exist := ctx.Params.Get("hash")
		if !exist {
			ctx.String(404, source_not_exist)
			return
		}

		file, err := FindFileByHash(hashStr)
		if err != nil {
			panic(err)
		}

		if file == nil {
			ctx.String(404, source_not_exist)
			return
		}

		ctx.File(file.Location)
	})
	r.GET("/image/:hash", func(ctx *gin.Context) {
		hashStr, exist := ctx.Params.Get("hash")
		if !exist {
			ctx.String(404, source_not_exist)
			return
		}

		imgDao, err := FindImageByHash(hashStr)
		if err != nil {
			ctx.String(404, source_not_exist)
			return
		}

		quality, _ := ctx.GetQuery("quality")
		var file *uploadDao.StoragedFile
		// 根据Query指定的品质返回图片
		if quality == "low" {
			file = imgDao.LowQualityFile
		} else if quality == "middle" {
			file = imgDao.MiddleQualityFile
		} else if quality == "high" {
			file = imgDao.HighQualityFile
		} else if quality == "origin" {
			file = imgDao.OriginFile
		}

		// 如果指定的图片质量为空，则返回最低画质
		if file == nil {
			file = imgDao.LowQualityFile
		}
		// 如果最低画质也是空，那么返回原图
		if file == nil {
			file = imgDao.OriginFile
		}

		// 最终返回图片资源
		ctx.File(file.Location)
	})
}
