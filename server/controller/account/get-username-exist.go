package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/omi/account"
)

func (accountImpl) GetUsernameExist(ctx *gin.Context, username string) bool {
	conn := db.GetConn()

	var count int64
	err := conn.
		Model(&userDao.UserDao{}).
		Where("username like ?", username).
		Count(&count).
		Error

	if err != nil {
		panic(err)
	}

	return count != 0
}

func attachGetUsernameExist(r *gin.Engine) {
	r.GET(account.AccountDefinition.GET_USERNAME_EXIST_PATH, func(ctx *gin.Context) {
		props := account.GetUsernameExistRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, controller.GetUsernameExist(ctx, props.Username))
	})
}
