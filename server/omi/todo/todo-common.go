/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年12月11日 18:39:43.
 */
package todo

type GroupInfo struct {
	GroupId  *int
	Name     *string
	TodoList *[]int
}
type TodoItem struct {
	Id            *int
	Content       *string
	ReferenceList *[]int
	ContainedList *[]int
	// Status是一个Int类型的Enum， 0: 未完成 1: 已完成 2: 已提交
	Status *int
}

type GetTodoItemsByIdListRequest struct {
	IdList []int `form:"idList[]"`
}
