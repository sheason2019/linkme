package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/todo"
)

type todoImpl struct{}

var controller todo.Todo = todoImpl{}

func BindTodoController(r *gin.Engine) {
	attachGetDefaultGroup(r)
	attachGetGroupInfoById(r)
	attachGetTodoItemsByIdList(r)

	attachPostTodo(r)
	attachDeleteTodo(r)
	attachPutTodo(r)
}
