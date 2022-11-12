package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/account"
	accountService "github.com/sheason2019/linkme/services/account"
)

func (accountImpl) Login(ctx *gin.Context, user account.User, saltId int) string {
	// 还原用户输入的密码
	err := accountService.DecryptPassword(&user, saltId)
	if err != nil {
		panic(err)
	}
	// 拉取指定的用户数据
	targetUser, err := accountService.GetUserByUsername(*user.Username)
	if err != nil {
		panic(err)
	}
	// 鉴定用户密码是否正确
	err = accountService.ValidatePassword(targetUser, *user.Password)
	if err != nil {
		panic(err)
	}

	// 登录成功，移除Salt信息
	accountService.RemoveSalt(saltId)

	// 去除用户数据中的敏感信息
	targetUser.Password = ""
	targetUser.Salt = ""
	// 为用户创建JWT
	tokenString, err := accountService.GenerateJwt(targetUser)
	if err != nil {
		panic(err)
	}

	return tokenString
}

func attachLogin(r *gin.Engine) {
	r.POST(account.AccountDefinition.LOGIN_PATH, func(ctx *gin.Context) {
		props := account.LoginRequest{}
		ctx.BindJSON(&props)

		ctx.JSON(200, controller.Login(ctx, props.User, props.SaltId))
	})
}
