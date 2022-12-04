package adminController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/admin"
)

type adminImpl struct{}

var controller admin.Admin = adminImpl{}

func BindAdminController(r *gin.Engine) {
	attachGetHomepageSatistics(r)
}
