package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
)

func (todoImpl) DeleteTodo(ctx *gin.Context, todoId int, groupId int) {
	// 删除Todo功能实际上时删除指定的引用，然后通过标记情理法确认需要删除的项
	currentUser := middleware.MustGetCurrentUser(ctx)

	// 首先确认用户是否有操作指定Todo的权限
	todo, err := todoService.FindTodoItemById(uint(todoId))
	if err != nil {
		panic(err)
	}
	if todo.OwnerId != currentUser.ID {
		panic("没有执行删除操作的权限")
	}

	group, err := todoService.FindTodoGroupById(uint(groupId))
	if err != nil {
		panic(err)
	}
	err = todoService.DeleteTodoFromGroup(todo, group)
	if err != nil {
		panic(err)
	}
}

func attachDeleteTodo(r *gin.Engine) {
	r.DELETE(todo.TodoDefinition.DELETE_TODO_PATH, func(ctx *gin.Context) {
		props := todo.DeleteTodoRequest{}
		ctx.BindQuery(&props)

		controller.DeleteTodo(ctx, props.TodoId, props.GroupId)
		ctx.String(200, "OK")
	})
}
