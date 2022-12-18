package todoController

import (
	"github.com/gin-gonic/gin"
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
)

func (todoImpl) PutTodoStep(ctx *gin.Context, step todo.TodoStep) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	daoStep, err := todoService.FindTodoStepById(uint(*step.Id))
	if err != nil {
		panic(err)
	}

	if currentUser.ID != daoStep.OwnerId {
		panic("用户权限不足")
	}

	daoStep.Content = *step.Content
	daoStep.Status = *step.Status
	if daoStep.Status != todoDao.TodoItemStatus_Waiting && daoStep.Status != todoDao.TodoItemStatus_Finished {
		panic("预期之外的Todo Status值:" + daoStep.Status)
	}

	conn := db.GetConn()
	err = conn.Save(&daoStep).Error
	if err != nil {
		panic(err)
	}
}

func attachPutTodoStep(r *gin.Engine) {
	r.PUT(todo.TodoDefinition.PUT_TODO_STEP_PATH, func(ctx *gin.Context) {
		props := todo.PutTodoStepRequest{}
		ctx.BindJSON(&props)

		controller.PutTodoStep(ctx, props.Step)
		ctx.String(200, "OK")
	})
}
