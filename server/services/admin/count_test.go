package adminService_test

import (
	"fmt"
	"testing"

	adminService "github.com/sheason2019/linkme/services/admin"
)

func TestGetUserCount(t *testing.T) {
	items, err := adminService.GetUserCount(7)
	if err != nil {
		t.Error(err)
	}

	for _, v := range items {
		fmt.Println(*v.Label, *v.Count)
	}
}

func TestGetConversationCount(t *testing.T) {
	items, err := adminService.GetConversationCount(7)
	if err != nil {
		t.Error(err)
	}

	for _, v := range items {
		fmt.Println(*v.Label, *v.Count)
	}
}

func TestGetMessageCount(t *testing.T) {
	items, err := adminService.GetMessageCount(7)
	if err != nil {
		t.Error(err)
	}

	for _, v := range items {
		fmt.Println(*v.Label, *v.Count)
	}
}

func TestGetUvCount(t *testing.T) {
	items, err := adminService.GetUvCount(7)
	if err != nil {
		t.Error(err)
	}

	for _, v := range items {
		fmt.Println(*v.Label, *v.Count)
	}
}
