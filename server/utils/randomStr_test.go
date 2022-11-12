package utils_test

import (
	"fmt"
	"testing"

	"github.com/sheason2019/linkme/utils"
)

func TestRandomString(t *testing.T) {
	var str = utils.RandomString(24)
	fmt.Println(str)
}
