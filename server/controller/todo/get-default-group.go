package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/todo"
	accountService "github.com/sheason2019/linkme/services/account"
	todoService "github.com/sheason2019/linkme/services/todo"
)

func (todoImpl) GetDefaultGroup(ctx *gin.Context, username string) todo.GroupInfo {
	user, err := accountService.FindUserByUsername(username)
	if err != nil {
		panic(err)
	}

	group, err := todoService.FindUserDefaultGroup(user.ID)
	if err != nil {
		panic(err)
	}
	return *group.ToIdl()
}

func attachGetDefaultGroup(r *gin.Engine) {
	r.GET(todo.TodoDefinition.GET_DEFAULT_GROUP_PATH, func(ctx *gin.Context) {
		props := todo.GetDefaultGroupRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, controller.GetDefaultGroup(ctx, props.Username))
	})
}
