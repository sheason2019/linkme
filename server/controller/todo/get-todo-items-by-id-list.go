package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
	"github.com/sheason2019/linkme/utils"
)

func (todoImpl) GetTodoItemsByIdList(ctx *gin.Context, idList []int) []todo.TodoItem {
	list := utils.Map(idList, func(item int, index int) uint {
		return uint(item)
	})

	todoItems, err := todoService.FindTodoItemsByIdList(list)
	if err != nil {
		panic(err)
	}

	todos := make([]todo.TodoItem, len(todoItems))
	for index, todo := range todoItems {
		todos[index] = todo.ToIdl()
	}

	return todos
}

func attachGetTodoItemsByIdList(r *gin.Engine) {
	r.GET(todo.TodoDefinition.GET_TODO_ITEMS_BY_ID_LIST_PATH, func(ctx *gin.Context) {
		props := todo.GetTodoItemsByIdListRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, controller.GetTodoItemsByIdList(ctx, props.IdList))
	})
}
