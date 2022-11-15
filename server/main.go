package main

import (
	"github.com/gin-gonic/gin"
	accountController "github.com/sheason2019/linkme/controller/account"
	chatController "github.com/sheason2019/linkme/controller/chat"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/rpc"
	accountService "github.com/sheason2019/linkme/services/account"
)

func main() {
	r := gin.Default()

	// 建立数据库连接
	db.GetConn()
	// 数据库自动迁移
	db.AutoMigrate()
	// 生成RSA密钥对文件
	accountService.GenRsaFile()
	// 生成RPC TOKEN
	rpc.GenerateRpcToken()

	// 使用自定义的Recover中间件
	r.Use(middleware.PanicMiddleware)
	// 使用获取用户身份的中间件
	r.Use(middleware.UserMiddleware)

	accountController.BindAccountController(r)
	chatController.BindChatController(r)

	r.Run()
}
