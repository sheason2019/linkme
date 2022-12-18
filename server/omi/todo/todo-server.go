/**
* 本文件由Omi.js自动生成，谨慎改动！
 */
package todo

import (
	"github.com/gin-gonic/gin"
)

type Todo interface {
	GetDefaultGroup(ctx *gin.Context, username string) GroupInfo
	GetGroupInfoById(ctx *gin.Context, groupId int) GroupInfo
	// 创建Todo
	PostTodo(ctx *gin.Context, req PostTodoPayload)
	// 修改Todo
	PutTodo(ctx *gin.Context, todo TodoItem)
	// 删除TODO
	DeleteTodo(ctx *gin.Context, todoId int, groupId int)
	// 创建步骤
	PostTodoStep(ctx *gin.Context, content string, todoId int)
	// 删除步骤
	DeleteTodoStep(ctx *gin.Context, stepId int)
	// 修改步骤
	PutTodoStep(ctx *gin.Context, step TodoStep)
	// 修改Group
	PutGroup(ctx *gin.Context, group GroupInfo)
	GetTodoItemsByIdList(ctx *gin.Context, idList []int) []TodoItem
}
type typeTodoDefinition struct {
	GET_DEFAULT_GROUP_PATH         string
	GET_GROUP_INFO_BY_ID_PATH      string
	POST_TODO_PATH                 string
	PUT_TODO_PATH                  string
	DELETE_TODO_PATH               string
	POST_TODO_STEP_PATH            string
	DELETE_TODO_STEP_PATH          string
	PUT_TODO_STEP_PATH             string
	PUT_GROUP_PATH                 string
	GET_TODO_ITEMS_BY_ID_LIST_PATH string
}

var TodoDefinition = &typeTodoDefinition{
	GET_DEFAULT_GROUP_PATH:         "/Todo.DefaultGroup",
	GET_GROUP_INFO_BY_ID_PATH:      "/Todo.GroupInfoById",
	POST_TODO_PATH:                 "/Todo.Todo",
	PUT_TODO_PATH:                  "/Todo.Todo",
	DELETE_TODO_PATH:               "/Todo.Todo",
	POST_TODO_STEP_PATH:            "/Todo.TodoStep",
	DELETE_TODO_STEP_PATH:          "/Todo.TodoStep",
	PUT_TODO_STEP_PATH:             "/Todo.TodoStep",
	PUT_GROUP_PATH:                 "/Todo.Group",
	GET_TODO_ITEMS_BY_ID_LIST_PATH: "/Todo.TodoItemsByIdList",
}
