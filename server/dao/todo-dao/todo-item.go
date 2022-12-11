package todoDao

import (
	"gorm.io/gorm"
)

const TodoItemStatus_Waiting = "waiting"
const TodoItemStatus_Finished = "finished"
const TodoItemStatus_Commited = "commited"

type TodoItem struct {
	gorm.Model
	// 这是任务事项的内容
	Content string
	// 引用了该任务事项的任务事项
	References []TodoItem
	// 该任务事项所引用的任务事项
	Contained []TodoItem
	// 任务事项所引用的事项的排序关系，是一个 []int 字符串
	ContainedIndex []uint `gorm:"serializer:json"`
	// 待办事项状态 对应TodoItemStatus中声明的字段
	Status string

	SeriesId uint
	Series   TodoSeries `gorm:"foreignKey:SeriesId"`
}
