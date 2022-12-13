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

	// TODO应当挂载的容器
	var target any

	var seriesId uint
	// 这里要拿到Series ID和Todo挂载的对象
	if *payload.MountOn == "group" {
		// 根据ID获取Group，从而拿到SeriesID
		group, err := todoService.FindTodoGroupById(uint(*payload.MountId))
		if err != nil {
			panic(err)
		}
		seriesId = group.SeriesId
		target = group
	} else if *payload.MountOn == "todo" {
		// 根据ID获取Todo，从而拿到SeriesID
		todo, err := todoService.FindTodoItemById(uint(*payload.MountId))
		if err != nil {
			panic(err)
		}
		// 这里需要进行额外检查，如果TODO已经提交，则拒绝这次写入操作
		if todo.Status == todoDao.TodoItemStatus_Commited {
			panic("无法修改已经提交的TODO")
		}
		seriesId = todo.SeriesId
		target = todo
	} else {
		panic("请求的MountOn属性有误" + *payload.MountOn)
	}

	// 检查用户是否拥有将Todo写入指定Series的权限
	limit, err := todoService.CheckUserSeriesLimit(currentUser.ID, seriesId)
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
		todo, err = todoService.CreateTodoItem(*payload.Content, seriesId, currentUser.ID)
	}

	if err != nil {
		panic(err)
	}

	// 根据 mount on 字段决定后续的行为
	if *payload.MountOn == "group" {
		// 将TODO挂载到组
		group := target.(*todoDao.TodoGroup)
		err = todoService.MountTodoOnGroup(todo, group)
	} else if *payload.MountOn == "todo" {
		// 将TODO挂载到Todo
		parentTodo := target.(*todoDao.TodoItem)
		err = todoService.MountTodoOnTodo(todo, parentTodo)
	}

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
