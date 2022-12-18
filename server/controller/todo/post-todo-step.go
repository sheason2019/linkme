package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
)

func (todoImpl) PostTodoStep(ctx *gin.Context, content string, todoId int) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	todoItem, err := todoService.FindTodoItemById(uint(todoId))
	if err != nil {
		panic(err)
	}

	// 权限校验
	if currentUser.ID != todoItem.OwnerId {
		panic("用户权限不足")
	}

	_, err = todoService.CreateTodoStep(todoItem, content, currentUser.ID)
	if err != nil {
		panic(err)
	}
}

func attachPostTodoStep(r *gin.Engine) {
	r.POST(todo.TodoDefinition.POST_TODO_STEP_PATH, func(ctx *gin.Context) {
		props := todo.PostTodoStepRequest{}
		ctx.BindJSON(&props)

		controller.PostTodoStep(ctx, props.Content, props.TodoId)
		ctx.String(200, "OK")
	})
}
