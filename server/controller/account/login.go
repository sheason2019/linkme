package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/account"
)

func (accountImpl) Login(ctx *gin.Context, user account.User, saltId int) string {
	return ""
}

func attachLogin(r *gin.Engine) {
	r.POST(account.AccountDefinition.LOGIN_PATH, func(ctx *gin.Context) {})
}
