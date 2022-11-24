package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/account"
)

type accountImpl struct{}

var controller account.Account = accountImpl{}

func BindAccountController(r *gin.Engine) {
	attachGetCryptoInfo(r)
	attachGetCurrentUser(r)
	attachGetUsersByUsername(r)

	attachLogin(r)
	attachRegist(r)

	attachPutAvatar(r)
}
