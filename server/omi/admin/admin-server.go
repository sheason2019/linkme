/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年12月4日 18:19:36.
 */
package admin

import (
	"github.com/gin-gonic/gin"
)

type Admin interface {
	GetHomepageSatistics(ctx *gin.Context) HomepageSatisticsGroup
}
type typeAdminDefinition struct {
	GET_HOMEPAGE_SATISTICS_PATH string
}

var AdminDefinition = &typeAdminDefinition{
	GET_HOMEPAGE_SATISTICS_PATH: "/Admin.HomepageSatistics",
}
