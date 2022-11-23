package uploadController

import (
	"github.com/gin-gonic/gin"
)

func BindFileController(r *gin.Engine) {
	attachUploadFile(r)
}
