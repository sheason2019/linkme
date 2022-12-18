package todoService

import (
	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/utils"
	"gorm.io/gorm"
)

func DeleteTodoStep(step *todoDao.TodoStep) error {
	todoId := step.ID

	todo, err := FindTodoItemById(todoId)
	if err != nil {
		return err
	}

	return db.GetConn().Transaction(func(tx *gorm.DB) error {
		err := tx.Delete(step).Error
		if err != nil {
			return err
		}

		todo.Contained = utils.Filter(todo.Contained, func(id uint, index int) bool {
			return id != step.ID
		})
		return tx.Save(&todo).Error
	})
}
