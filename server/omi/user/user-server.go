/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月11日 20:29:6.
 */
package user

import (
	"github.com/gin-gonic/gin"
)

type UserService interface {
	// 接受登录信息，返回jwt
	Login(ctx *gin.Context, user User) string
	// 同Login
	Regist(ctx *gin.Context, user User) string
}
type typeUserServiceDefinition struct {
	LOGIN_PATH  string
	REGIST_PATH string
}

var UserServiceDefinition = &typeUserServiceDefinition{
	LOGIN_PATH:  "/UserService.Login",
	REGIST_PATH: "/UserService.Regist",
}
