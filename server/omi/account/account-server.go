/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月29日 14:42:47.
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
	// 根据用户名搜索用户信息，一次最多拉取25条
	GetUsersByUsername(ctx *gin.Context, username string, offset int) GetUsersByUsernameResponse
	// 获取指定的用户信息
	GetUserByUserId(ctx *gin.Context, userId int) User
	// 检查用户名是否重复
	GetUsernameExist(ctx *gin.Context, username string) bool
	// 下面这两接口先这样实现，如果未来用户相关的属性数量上去了，额外抽象出一个Profile结构体来整合这些数据
	// 设置自己的头像信息，需要使用本地服务器上的文件
	PutAvatar(ctx *gin.Context, imageHash string)
	// 设置个性签名
	PutSignature(ctx *gin.Context, signature string)
}
type typeAccountDefinition struct {
	GET_CRYPTO_INFO_PATH       string
	LOGIN_PATH                 string
	REGIST_PATH                string
	GET_CURRENT_USER_PATH      string
	GET_USERS_BY_USERNAME_PATH string
	GET_USER_BY_USER_ID_PATH   string
	GET_USERNAME_EXIST_PATH    string
	PUT_AVATAR_PATH            string
	PUT_SIGNATURE_PATH         string
}

var AccountDefinition = &typeAccountDefinition{
	GET_CRYPTO_INFO_PATH:       "/Account.CryptoInfo",
	LOGIN_PATH:                 "/Account.Login",
	REGIST_PATH:                "/Account.Regist",
	GET_CURRENT_USER_PATH:      "/Account.CurrentUser",
	GET_USERS_BY_USERNAME_PATH: "/Account.UsersByUsername",
	GET_USER_BY_USER_ID_PATH:   "/Account.UserByUserId",
	GET_USERNAME_EXIST_PATH:    "/Account.UsernameExist",
	PUT_AVATAR_PATH:            "/Account.Avatar",
	PUT_SIGNATURE_PATH:         "/Account.Signature",
}
