package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/account"
	accountService "github.com/sheason2019/linkme/services/account"
)

func (accountImpl) GetUserByUserId(ctx *gin.Context, id int) account.User {
	userDao, err := accountService.FindUserByUserId(id)
	if err != nil {
		panic(err)
	}

	if userDao == nil {
		panic("指定的用户不存在")
	}

	user := userDao.ToIdl()
	user.Password = nil

	return user
}

func attachGetUserByUserId(r *gin.Engine) {
	r.GET(account.AccountDefinition.GET_USER_BY_USER_ID_PATH, func(ctx *gin.Context) {
		props := account.GetUserByUserIdRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, controller.GetUserByUserId(ctx, props.UserId))
	})
}
