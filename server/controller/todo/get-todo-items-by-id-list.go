package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/todo"
)

func (todoImpl) GetTodoItemsByIdList(ctx *gin.Context, idList []int) []todo.TodoItem {
	return nil
}
