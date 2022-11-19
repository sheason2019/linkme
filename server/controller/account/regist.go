package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/omi/account"
	accountService "github.com/sheason2019/linkme/services/account"
)

func (accountImpl) Regist(ctx *gin.Context, user account.User, saltId int) string {
	// 还原用户输入的密码
	accountService.DecryptPassword(&user, saltId)
	// 将用户信息转换到Dao层
	userModel := userDao.GenerateUserDaoFromIdl(user)
	// 使用SHA256 + Salt将用户密码加密
	accountService.EncryptPassword(&userModel)
	// 创建用户信息
	err := accountService.CreateUser(&userModel)
	if err != nil {
		panic(err)
	}
	// 返回JWT
	tokenString, err := accountService.GenerateJwt(&userModel)

	if err != nil {
		panic(err)
	}

	return tokenString
}

func attachRegist(r *gin.Engine) {
	r.POST(account.AccountDefinition.REGIST_PATH, func(ctx *gin.Context) {
		props := account.RegistRequest{}
		ctx.BindJSON(&props)

		ctx.JSON(200, controller.Regist(ctx, props.User, props.SaltId))
	})
}
