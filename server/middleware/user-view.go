package middleware

import (
	"github.com/gin-gonic/gin"
	monitor_service "github.com/sheason2019/linkme/services/monitor"
)

func UserViewMiddleware(ctx *gin.Context) {
	ip := ctx.ClientIP()

	err := monitor_service.PostUV(ip)
	if err != nil {
		panic(err)
	}

	ctx.Next()
}
