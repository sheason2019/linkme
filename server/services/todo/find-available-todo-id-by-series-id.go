package todoService

// 根据SeriesId获取所有可用的TODO ID
func FindAvailableTodoIdBySeriesId(seriesId uint) (map[uint]bool, error) {
	availableMap := make(map[uint]bool)

	groups, err := FindTodoGroupsBySeriesId(seriesId)
	if err != nil {
		return nil, err
	}
	searchList := make([]uint, 0)
	// 遍历找到所有可达的项
	for _, group := range groups {
		for _, todoId := range group.Contained {
			if !availableMap[todoId] {
				availableMap[todoId] = true
				searchList = append(searchList, todoId)
			}
		}
	}

	for {
		if len(searchList) == 0 {
			break
		}

		todos, err := FindTodoItemsByIdList(searchList)
		if err != nil {
			return nil, err
		}
		searchList = []uint{}

		for _, todo := range todos {
			for _, todoId := range todo.Contained {
				if !availableMap[todoId] {
					availableMap[todoId] = true
					searchList = append(searchList, todoId)
				}
			}
			for _, todoId := range todo.References {
				if !availableMap[todoId] {
					availableMap[todoId] = true
					searchList = append(searchList, todoId)
				}
			}
		}
	}

	return availableMap, nil
}
