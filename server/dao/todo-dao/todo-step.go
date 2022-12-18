package todoDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/omi/todo"
	"github.com/sheason2019/linkme/utils"
	"gorm.io/gorm"
)

type TodoStep struct {
	gorm.Model

	Status string

	Content string

	Item   TodoItem `gorm:"foreignKey:ItemId"`
	ItemId uint

	// 系列的所有者
	OwnerId uint
	Owner   userDao.UserDao `gorm:"foreignKey:OwnerId"`
}

func (model TodoStep) ToIdl() todo.TodoStep {
	step := todo.TodoStep{}

	step.Id = utils.ConvertNumberToIntPtr(model.ID)
	step.Content = &model.Content
	step.Status = &model.Status

	return step
}
