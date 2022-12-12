package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
)

func (todoImpl) GetGroupInfoById(ctx *gin.Context, groupId int) todo.GroupInfo {
	group, err := todoService.FindTodoGroupById(uint(groupId))
	if err != nil {
		panic(err)
	}

	return *group.ToIdl()
}

func attachGetGroupInfoById(r *gin.Engine) {
	r.GET(todo.TodoDefinition.GET_GROUP_INFO_BY_ID_PATH, func(ctx *gin.Context) {
		props := todo.GetGroupInfoByIdRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, controller.GetGroupInfoById(ctx, props.GroupId))
	})
}
