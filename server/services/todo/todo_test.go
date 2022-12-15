package todoService_test

import (
	"fmt"
	"testing"

	todoService "github.com/sheason2019/linkme/services/todo"
)

func TestFindRelativeTodoItem(t *testing.T) {
	todo, err := todoService.FindTodoItemById(5)
	if err != nil {
		t.Errorf("%e", err)
	}

	relativeMap, err := todoService.FindRelativeTodoIdMap(todo, nil)
	if err != nil {
		t.Errorf("%e", err)
	}

	fmt.Println(relativeMap)
}

func TestFindAvailableTodoItem(t *testing.T) {
	availableMap, err := todoService.FindAvailableTodoIdBySeriesId(5)
	if err != nil {
		t.Errorf("%e", err)
	}
	fmt.Println(availableMap)
}

func TestTodoItemGC(t *testing.T) {
	todo, err := todoService.FindTodoItemById(4)
	if err != nil {
		t.Errorf("%e", err)
	}

	todoService.TodoItemGC(todo)
}
