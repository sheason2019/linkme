package todoService

import (
	"fmt"

	todoDao "github.com/sheason2019/linkme/dao/todo-dao"
	"github.com/sheason2019/linkme/db"
)

func TodoItemGC(todo *todoDao.TodoItem) error {
	// 为指定TodoItem执行删除逻辑后，需要使用标记清理法确认TODO数据是否可以从数据库中移除
	availableMap, err := FindAvailableTodoIdBySeriesId(todo.SeriesId)
	if err != nil {
		return err
	}

	// 获取所有与该Todo相关的项
	relativeTodoMap, err := FindRelativeTodoIdMap(todo, nil)
	if err != nil {
		return err
	}

	// 拿到需要删除的队列
	deleteList := []uint{}
	for id := range relativeTodoMap {
		if !availableMap[id] {
			deleteList = append(deleteList, id)
		}
	}

	fmt.Println(deleteList)

	// 执行删除操作
	conn := db.GetConn()
	return conn.Where("id in ?", deleteList).Delete(&todoDao.TodoItem{}).Error
}
