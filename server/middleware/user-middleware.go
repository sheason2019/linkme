package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/userDao"
	accountService "github.com/sheason2019/linkme/services/account"
)

func UserMiddleware(ctx *gin.Context) {
	jwt := ctx.GetHeader("Authorization")
	claims, err := accountService.ParseJwt(jwt)
	if err == nil {
		ctx.Set("current-user", claims.UserDao)
	}

	ctx.Next()
}

func GetCurrentUser(ctx *gin.Context) *userDao.UserDao {
	value, exist := ctx.Get("current-user")
	if !exist {
		return nil
	}

	user, ok := value.(userDao.UserDao)
	if ok {
		return &user
	}
	return nil
}
