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
	Id      *int
	Content *string
	Steps   *[]TodoStep
	// Status是一个Int类型的Enum， 0: 未完成 1: 已完成 2: 已提交
	Status *string
}
type TodoStep struct {
	Id      *int
	Content *string
	Status  *string
}
type PostTodoPayload struct {
	// 当该字段不为0时，PostTodo逻辑将会创建指定Todo的引用，而不是创建新的Todo
	TodoId *int
	// Todo内容，仅TodoId为0时会调用该字段
	Content *string
	GroupId *int
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
type PutTodoRequest struct {
	Todo TodoItem `json:"todo"`
}
type DeleteTodoRequest struct {
	TodoId  int `form:"todoId"`
	GroupId int `form:"groupId"`
}
type PostTodoStepRequest struct {
	Content string `json:"content"`
	TodoId  int    `json:"todoId"`
}
type DeleteTodoStepRequest struct {
	StepId int `form:"stepId"`
}
type PutTodoStepRequest struct {
	Step TodoStep `json:"step"`
}
type PutGroupRequest struct {
	Group GroupInfo `json:"group"`
}
type GetTodoItemsByIdListRequest struct {
	IdList []int `form:"idList[]"`
}
