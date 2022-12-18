package todoService

import (
	"errors"

	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func FindTodoStepById(id uint) (*todoDao.TodoStep, error) {
	conn := db.GetConn()

	steps := make([]todoDao.TodoStep, 0)
	err := conn.Where("id = ?", id).Limit(1).Find(&steps).Error
	if err != nil {
		return nil, err
	}

	if len(steps) == 0 {
		return nil, errors.New("指定的记录不存在")
	}

	step := steps[0]
	return &step, nil
}
