package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
	"gorm.io/gorm"
)

func CreateTodoStep(todoItem *todoDao.TodoItem, content string, userId uint) (*todoDao.TodoStep, error) {
	step := todoDao.TodoStep{}
	conn := db.GetConn()

	err := conn.Transaction(func(tx *gorm.DB) error {
		step.Content = content
		step.Status = todoDao.TodoItemStatus_Waiting
		step.ItemId = todoItem.ID
		step.OwnerId = userId

		err := tx.Create(&step).Error
		if err != nil {
			return err
		}

		todoItem.Contained = append([]uint{step.ID}, todoItem.Contained...)
		err = tx.Save(&todoItem).Error
		return err
	})

	return &step, err
}
