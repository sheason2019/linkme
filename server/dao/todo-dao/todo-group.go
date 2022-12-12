package todoDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/omi/todo"
	"github.com/sheason2019/linkme/utils"
	"gorm.io/gorm"
)

// 默认事项组
const GroupOrSeriesType_Default = "default"

// 用户自定义事项组
const GroupOrSeriesType_Custom = "custom"

type TodoGroup struct {
	gorm.Model
	// 组的类别
	Type string
	// 组名
	Name string
	// 组内任务事项的引用数组
	Contained []uint `gorm:"serializer:json"`

	// 系列一定存在
	SeriesId uint
	Series   TodoSeries `gorm:"foreignKey:SeriesId"`

	// 边界的所有者
	OwnerId uint
	Owner   userDao.UserDao `gorm:"foreignKey:OwnerId"`
}

func (model TodoGroup) ToIdl() *todo.GroupInfo {
	group := todo.GroupInfo{}
	group.GroupId = utils.ConvertNumberToIntPtr(model.ID)
	group.Name = &model.Name

	todolist := utils.Map(model.Contained, func(item uint, index int) int {
		return int(item)
	})
	group.TodoList = &todolist
	group.Type = &model.Type

	return &group
}
