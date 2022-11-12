package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

var PanicMiddleware = gin.CustomRecovery(func(c *gin.Context, err any) {
	// 将Panic信息打印在控制台
	fmt.Println("[PANIC INFO]::" + fmt.Sprint(err))

	c.JSON(500, fmt.Sprint(err))
	c.Abort()
})
