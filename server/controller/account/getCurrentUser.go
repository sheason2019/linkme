package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/account"
)

func (accountImpl) GetCurrentUser(ctx *gin.Context) account.User {
	daoUser := middleware.GetCurrentUser(ctx)
	if daoUser == nil {
		panic("无法获取当前用户的信息")
	}

	user := daoUser.ToIdl()
	user.Password = nil

	return user
}

func attachGetCurrentUser(r *gin.Engine) {
	r.GET(account.AccountDefinition.GET_CURRENT_USER_PATH, func(ctx *gin.Context) {
		ctx.JSON(200, controller.GetCurrentUser(ctx))
	})
}
