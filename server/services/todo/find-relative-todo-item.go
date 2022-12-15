package todoService

import todoDao "github.com/sheason2019/linkme/dao/todo-dao"

func FindRelativeTodoIdMap(todo *todoDao.TodoItem, relativeMap map[uint]bool) (map[uint]bool, error) {
	if relativeMap == nil {
		relativeMap = make(map[uint]bool)
	}

	relativeMap[todo.ID] = true
	searchList := []uint{}

	// 使用Map去重
	for _, id := range todo.Contained {
		if !relativeMap[id] {
			relativeMap[id] = true
			searchList = append(searchList, id)
		}
	}
	for _, id := range todo.References {
		if !relativeMap[id] {
			relativeMap[id] = true
			searchList = append(searchList, id)
		}
	}

	todos, err := FindTodoItemsByIdList(searchList)
	if err != nil {
		return nil, err
	}

	for _, todo := range todos {
		_, err = FindRelativeTodoIdMap(&todo, relativeMap)
		if err != nil {
			return nil, err
		}
	}

	return relativeMap, nil
}
