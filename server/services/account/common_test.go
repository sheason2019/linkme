package accountService_test

import (
	"testing"

	accountService "github.com/sheason2019/linkme/serivces/account"
)

func TestValidateSalt(t *testing.T) {
	sourceText := "abc123"
	salt := "123"

	err := accountService.ValidateSalt(sourceText, salt)
	if err != nil {
		t.Error(err)
	}
}

func TestRemoveSaltFromSource(t *testing.T) {
	sourceText := "abc123"
	salt := "123"

	target := accountService.RemoveSaltFromSource(sourceText, salt)
	if target != "abc" {
		t.Error("Target Error: ", target)
	}
}
