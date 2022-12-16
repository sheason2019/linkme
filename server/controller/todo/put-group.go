package todoController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/todo"
	todoService "github.com/sheason2019/linkme/services/todo"
	"github.com/sheason2019/linkme/utils"
)

func (todoImpl) PutGroup(ctx *gin.Context, group todo.GroupInfo) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	groupDao, err := todoService.FindTodoGroupById(uint(*group.GroupId))
	if err != nil {
		panic(err)
	}

	// 权限校验
	if groupDao.OwnerId != currentUser.ID {
		panic("没有足够的权限执行操作")
	}

	// 应用用户上传的List
	containedList := utils.Map(*group.TodoList, func(item int, index int) uint {
		return uint(item)
	})
	groupDao.Contained = containedList

	commitedList := utils.Map(*group.CommitedList, func(item int, index int) uint {
		return uint(item)
	})
	groupDao.CommitedList = commitedList

	groupDao.Name = *group.Name

	conn := db.GetConn()

	err = conn.Save(&groupDao).Error
	if err != nil {
		panic(err)
	}

}

func attachPutGroup(r *gin.Engine) {
	r.PUT(todo.TodoDefinition.PUT_GROUP_PATH, func(ctx *gin.Context) {
		props := todo.PutGroupRequest{}
		ctx.BindJSON(&props)

		controller.PutGroup(ctx, props.Group)
		ctx.String(200, "OK")
	})
}
