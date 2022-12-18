package todoController

import (
	"github.com/gin-gonic/gin"
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
	"github.com/sheason2019/linkme/utils"
)

func (todoImpl) PostTodo(ctx *gin.Context, payload todo.PostTodoPayload) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	todoId := utils.ConvertPointToNumber(payload.TodoId)
	var err error

	// 根据ID获取Group，从而拿到SeriesID
	group, err := todoService.FindTodoGroupById(uint(*payload.GroupId))
	if err != nil {
		panic(err)
	}

	// 检查用户是否拥有将Todo写入指定Series的权限
	limit, err := todoService.CheckUserSeriesLimit(currentUser.ID, group.SeriesId)
	if err != nil {
		panic(err)
	}
	if !limit {
		panic("没有向指定Series写入Todo的权限")
	}

	// 根据传入的参数获取或创建TODO
	var todo *todoDao.TodoItem
	if todoId != 0 {
		// 根据TodoID查找TODO
		todo, err = todoService.FindTodoItemById(uint(todoId))
	} else {
		// 创建TODO
		todo, err = todoService.CreateTodoItem(*payload.Content, group.SeriesId, currentUser.ID, group.ID)
	}

	if err != nil {
		panic(err)
	}

	err = todoService.MountTodoOnGroup(todo, group)

	if err != nil {
		panic(err)
	}
}

func attachPostTodo(r *gin.Engine) {
	r.POST(todo.TodoDefinition.POST_TODO_PATH, func(ctx *gin.Context) {
		props := todo.PostTodoRequest{}
		ctx.BindJSON(&props)
		controller.PostTodo(ctx, props.Req)
		ctx.String(200, "OK")
	})
}
