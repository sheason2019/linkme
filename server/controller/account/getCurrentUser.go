package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/account"
)

func (accountImpl) GetCurrentUser(ctx *gin.Context) account.User {
	return account.User{}
}

func attachGetCurrentUser(r *gin.Engine) {
	r.GET(account.AccountDefinition.GET_CURRENT_USER_PATH, func(ctx *gin.Context) {})
}
