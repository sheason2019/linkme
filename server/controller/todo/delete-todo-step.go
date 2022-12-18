package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
)

func (todoImpl) DeleteTodoStep(ctx *gin.Context, stepId int) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	step, err := todoService.FindTodoStepById(uint(stepId))
	if err != nil {
		panic(err)
	}

	if step.OwnerId != currentUser.ID {
		panic("用户权限不足")
	}

	err = todoService.DeleteTodoStep(step)
	if err != nil {
		panic(err)
	}
}

func attachDeleteTodoStep(r *gin.Engine) {
	r.DELETE(todo.TodoDefinition.DELETE_TODO_STEP_PATH, func(ctx *gin.Context) {
		props := todo.DeleteTodoStepRequest{}
		ctx.BindQuery(&props)

		controller.DeleteTodoStep(ctx, props.StepId)
		ctx.String(200, "OK")
	})
}
