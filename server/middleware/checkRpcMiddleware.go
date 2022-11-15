package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/rpc"
)

// 该中间件将阻止所有RPC权限的请求
func RpcGuard(ctx *gin.Context) {
	token := ctx.GetHeader("rpc-token")
	exist, err := rpc.CheckRpcToken(token)
	if err != nil {
		panic(err)
	}
	if !exist {
		panic("没有执行RPC请求的权限")
	}

	ctx.Next()
}
