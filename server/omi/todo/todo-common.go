/**
* 本文件由Omi.js自动生成，谨慎改动！
 */
package todo

type GroupInfo struct {
	GroupId  *int
	Name     *string
	Type     *string
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
type GetDefaultGroupRequest struct {
	Username string `form:"username"`
}
type GetGroupInfoByIdRequest struct {
	GroupId int `form:"groupId"`
}
type GetTodoItemsByIdListRequest struct {
	IdList []int `form:"idList[]"`
}
