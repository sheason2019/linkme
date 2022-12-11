package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
)

func (todoImpl) GetDefaultGroup(ctx *gin.Context) todo.GroupInfo {
	currentUser := middleware.MustGetCurrentUser(ctx)

	group, err := todoService.FindUserDefaultGroup(currentUser.ID)
	if err != nil {
		panic(err)
	}
	return *group.ToIdl()
}

func attachGetDefaultGroup(r *gin.Engine) {
	r.GET(todo.TodoDefinition.GET_DEFAULT_GROUP_PATH, func(ctx *gin.Context) {
		ctx.JSON(200, controller.GetDefaultGroup(ctx))
	})
}
