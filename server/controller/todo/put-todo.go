package todoController

import (
	"github.com/gin-gonic/gin"
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
	"github.com/sheason2019/linkme/utils"
)

func (todoImpl) PutTodo(ctx *gin.Context, todo todo.TodoItem) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	todoItem, err := todoService.FindTodoItemById(uint(*todo.Id))
	if err != nil {
		panic(err)
	}

	// 检查用户是否有操作指定TODO的权限
	if todoItem.OwnerId != currentUser.ID {
		panic("用户权限不足")
	}

	if todoItem.Status == todoDao.TodoItemStatus_Commited {
		panic("TODO已被提交，无法进行更改")
	}

	// 否则根据用户传入的参数对TODO进行修改，这里根据业务逻辑进行一些简单的校验
	todoItem.Content = *todo.Content
	if len(todoItem.Content) == 0 {
		panic("TODO内容不能为空")
	}
	todoItem.Status = *todo.Status
	if todoItem.Status != todoDao.TodoItemStatus_Waiting && todoItem.Status != todoDao.TodoItemStatus_Finished {
		panic("预期之外的Todo Status值:" + todoItem.Status)
	}

	todoItem.References = utils.Map(*todo.ReferenceList, func(item int, index int) uint {
		return uint(item)
	})
	todoItem.Contained = utils.Map(*todo.ContainedList, func(item int, index int) uint {
		return uint(item)
	})

	// 将数据保存到数据库
	conn := db.GetConn()
	err = conn.Save(&todoItem).Error
	if err != nil {
		panic(err)
	}
}

func attachPutTodo(r *gin.Engine) {
	r.PUT(todo.TodoDefinition.PUT_TODO_PATH, func(ctx *gin.Context) {
		props := todo.PutTodoRequest{}
		ctx.BindJSON(&props)

		controller.PutTodo(ctx, props.Todo)
		ctx.String(200, "OK")
	})
}
