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
	GetTodoItemsByIdList(ctx *gin.Context, idList []int) []TodoItem
}
type typeTodoDefinition struct {
	GET_DEFAULT_GROUP_PATH         string
	GET_GROUP_INFO_BY_ID_PATH      string
	POST_TODO_PATH                 string
	PUT_TODO_PATH                  string
	GET_TODO_ITEMS_BY_ID_LIST_PATH string
}

var TodoDefinition = &typeTodoDefinition{
	GET_DEFAULT_GROUP_PATH:         "/Todo.DefaultGroup",
	GET_GROUP_INFO_BY_ID_PATH:      "/Todo.GroupInfoById",
	POST_TODO_PATH:                 "/Todo.Todo",
	PUT_TODO_PATH:                  "/Todo.Todo",
	GET_TODO_ITEMS_BY_ID_LIST_PATH: "/Todo.TodoItemsByIdList",
}
