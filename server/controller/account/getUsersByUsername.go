package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/account"
	accountService "github.com/sheason2019/linkme/services/account"
)

func (accountImpl) GetUsersByUsername(ctx *gin.Context, username string, offset int) account.GetUsersByUsernameResponse {
	// 若用户没有登录则不提供用户检索能力
	middleware.MustGetCurrentUser(ctx)

	// 检索用户
	usersDao, hasMore, err := accountService.FindUsersByUsername(username, offset)
	if err != nil {
		panic(err)
	}
	users := make([]account.User, len(usersDao))
	for i, v := range usersDao {
		users[i] = v.ToIdl()
		users[i].Password = nil
	}

	return account.GetUsersByUsernameResponse{
		Users:   &users,
		HasMore: &hasMore,
	}
}

func attachGetUsersByUsername(r *gin.Engine) {
	r.GET(account.AccountDefinition.GET_USERS_BY_USERNAME_PATH, func(ctx *gin.Context) {
		props := account.GetUsersByUsernameRequest{}
		ctx.BindQuery(&props)
		ctx.JSON(200, controller.GetUsersByUsername(ctx, props.Username, props.Offset))
	})
}
