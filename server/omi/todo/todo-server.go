/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年12月11日 18:39:43.
 */
package todo

import (
	"github.com/gin-gonic/gin"
)

type Todo interface {
	GetDefaultGroup(ctx *gin.Context) GroupInfo
	GetTodoItemsByIdList(ctx *gin.Context, idList []int) []TodoItem
}
type typeTodoDefinition struct {
	GET_DEFAULT_GROUP_PATH         string
	GET_TODO_ITEMS_BY_ID_LIST_PATH string
}

var TodoDefinition = &typeTodoDefinition{
	GET_DEFAULT_GROUP_PATH:         "/Todo.DefaultGroup",
	GET_TODO_ITEMS_BY_ID_LIST_PATH: "/Todo.TodoItemsByIdList",
}
