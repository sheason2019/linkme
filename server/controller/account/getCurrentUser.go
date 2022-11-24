package accountController

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/account"
	accountService "github.com/sheason2019/linkme/services/account"
)

func (accountImpl) GetCurrentUser(ctx *gin.Context) account.User {
	daoUser := middleware.MustGetCurrentUser(ctx)

	// 校验当前用户的身份信息是否有效
	daoUser, err := accountService.FindUserByUserId(int(daoUser.ID))
	if err != nil {
		panic(err)
	}
	if daoUser == nil {
		panic(fmt.Sprintf("没有找到指定的用户 - 用户ID %d", daoUser.ID))
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
