package todoDao

import (
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
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
	// 任务事项所引用的StepId
	Contained []uint `gorm:"serializer:json"`
	// 待办事项状态 对应TodoItemStatus中声明的字段
	Status string

	SeriesId uint
	Series   TodoSeries `gorm:"foreignKey:SeriesId"`

	// 所属的Group，通过这一字段分辨该Todo是被引用的还是原生创建的
	GroupId uint
	Group   TodoGroup `gorm:"foreignKey:GroupId"`

	OwnerId uint
	Owner   userDao.UserDao `gorm:"foreignKey:OwnerId"`
}

func (model TodoItem) ToIdl() todo.TodoItem {
	todoItem := todo.TodoItem{}
	todoItem.Id = utils.ConvertNumberToIntPtr(model.ID)
	todoItem.Content = &model.Content

	todoItem.Status = &model.Status

	steps, err := FindStepsByIdList(model.Contained)
	if err != nil {
		panic(err)
	}

	idlSteps := utils.Map(steps, func(step TodoStep, index int) todo.TodoStep {
		return step.ToIdl()
	})
	todoItem.Steps = &idlSteps

	return todoItem
}

func FindStepsByIdList(idList []uint) ([]TodoStep, error) {
	steps := make([]TodoStep, 0)
	conn := db.GetConn()

	err := conn.Where("id in ?", idList).Find(&steps).Error
	if err != nil {
		return nil, err
	}

	stepMap := make(map[uint]TodoStep)
	for _, step := range steps {
		stepMap[step.ID] = step
	}

	stepList := utils.Map(idList, func(id uint, index int) TodoStep {
		return stepMap[id]
	})

	return stepList, nil
}
