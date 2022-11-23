package uploadController

import (
	"crypto/sha256"
	"encoding/hex"
	"image"
	"io"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

const upload_path = "/var/linkme/upload/"

// 上传文件功能
func UploadHandler(ctx *gin.Context) {
	// currentUser := middleware.GetCurrentUser(ctx)
	// if currentUser == nil {
	// 	panic("当前用户尚未登录")
	// }

	// targetUser, err := accountService.FindUserByUserId(int(currentUser.ID))
	// if err != nil {
	// 	panic(err)
	// }
	// if targetUser == nil {
	// 	panic(fmt.Sprintf("没有找到指定的用户 - 用户ID %d", currentUser.ID))
	// }

	fileHeader, err := ctx.FormFile("file")
	if err != nil {
		panic(err)
	}

	os.Mkdir(upload_path, 0755)

	file, err := fileHeader.Open()
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// 获取文件Hash值
	fileHash, err := FileHash(file)
	if err != nil {
		panic(err)
	}

	_, err = file.Seek(0, 0)
	if err != nil {
		panic(err)
	}

	// 查询数据库中是否已经有指定Hash值存在，若是则使用已有数据相应请求
	fileDao, err := FindFileByHash(fileHash)
	if err != nil {
		panic(err)
	}
	if fileDao != nil {
		ctx.String(200, fileDao.Hash)
		return
	}

	// 否则执行下面的逻辑，将用户上传的文件存储到服务器，并返回哈希值
	ext := filepath.Ext(fileHeader.Filename)

	img, formatName, err := image.Decode(file)

	isImage := err == nil
	if isImage {
		image, err := UploadImage(img, formatName, ext, fileHash)
		if err != nil {
			panic(err)
		}
		ctx.String(200, image.SourceHash)
	} else {
		fileDao, err := StorageFile(upload_path+fileHeader.Filename, fileHash, ext)
		if err != nil {
			panic(err)
		}
		ctx.String(200, fileDao.Hash)
	}
}

// 文件哈希值计算
func FileHash(src io.Reader) (string, error) {
	hash := sha256.New()
	if _, err := io.Copy(hash, src); err != nil {
		return "", err
	}

	sum := hash.Sum(nil)
	return hex.EncodeToString(sum), nil
}

// 路由声明
func attachUploadFile(r *gin.Engine) {
	r.POST("/upload", UploadHandler)
}
