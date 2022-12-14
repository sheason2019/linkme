/**
* 本文件由Omi.js自动生成，谨慎改动！
 */
package todo

type GroupInfo struct {
	GroupId      *int
	Name         *string
	Type         *string
	TodoList     *[]int
	CommitedList *[]int
}
type TodoItem struct {
	Id            *int
	Content       *string
	ReferenceList *[]int
	ContainedList *[]int
	// Status是一个Int类型的Enum， 0: 未完成 1: 已完成 2: 已提交
	Status *string
}
type PostTodoPayload struct {
	// 当该字段不为0时，PostTodo逻辑将会创建指定Todo的引用，而不是创建新的Todo
	TodoId *int
	// Todo内容，仅TodoId为0时会调用该字段
	Content *string
	// 挂载位置 group 或 todo
	MountOn *string
	MountId *int
}
type GetDefaultGroupRequest struct {
	Username string `form:"username"`
}
type GetGroupInfoByIdRequest struct {
	GroupId int `form:"groupId"`
}
type PostTodoRequest struct {
	Req PostTodoPayload `json:"req"`
}
type GetTodoItemsByIdListRequest struct {
	IdList []int `form:"idList[]"`
}
