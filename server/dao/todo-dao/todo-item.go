package todoDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/omi/todo"
	"github.com/sheason2019/linkme/utils"
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
	References []uint `gorm:"serializer:json"`
	// 任务事项所引用的事项
	Contained []uint `gorm:"serializer:json"`
	// 待办事项状态 对应TodoItemStatus中声明的字段
	Status string

	SeriesId uint
	Series   TodoSeries `gorm:"foreignKey:SeriesId"`

	OwnerId uint
	Owner   userDao.UserDao `gorm:"foreignKey:OwnerId"`
}

func (model TodoItem) ToIdl() todo.TodoItem {
	todo := todo.TodoItem{}
	todo.Id = utils.ConvertNumberToIntPtr(model.ID)
	todo.Content = &model.Content
	containedList := utils.Map(model.Contained, func(item uint, index int) int {
		return int(item)
	})
	todo.ContainedList = &containedList
	referenceList := utils.Map(model.References, func(item uint, index int) int {
		return int(item)
	})
	todo.ReferenceList = &referenceList
	todo.Status = &model.Status

	return todo
}
