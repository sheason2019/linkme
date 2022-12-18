package todoService_test

import (
	"fmt"
	"testing"

	todoService "github.com/sheason2019/linkme/services/todo"
)

func TestTodoItemGC(t *testing.T) {
	todo, err := todoService.FindTodoItemById(4)
	if err != nil {
		t.Errorf("%e", err)
	}

	fmt.Println(todo)
}
