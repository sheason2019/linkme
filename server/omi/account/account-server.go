/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月12日 20:15:7.
 */
package account

import (
	"github.com/gin-gonic/gin"
)

type Account interface {
	// 获取登录所需的秘钥信息
	GetCryptoInfo(ctx *gin.Context) GetCryptoInfoResponse
	// 接受登录信息，返回jwt
	Login(ctx *gin.Context, user User, saltId int) string
	// 同Login
	Regist(ctx *gin.Context, user User, saltId int) string
	// 使用请求头中的JWT获取当前的用户信息
	GetCurrentUser(ctx *gin.Context) User
}
type typeAccountDefinition struct {
	GET_CRYPTO_INFO_PATH  string
	LOGIN_PATH            string
	REGIST_PATH           string
	GET_CURRENT_USER_PATH string
}

var AccountDefinition = &typeAccountDefinition{
	GET_CRYPTO_INFO_PATH:  "/Account.CryptoInfo",
	LOGIN_PATH:            "/Account.Login",
	REGIST_PATH:           "/Account.Regist",
	GET_CURRENT_USER_PATH: "/Account.CurrentUser",
}
