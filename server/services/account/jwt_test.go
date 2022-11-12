package accountService_test

import (
	"testing"

	"github.com/sheason2019/linkme/dao/userDao"
	accountService "github.com/sheason2019/linkme/services/account"
)

func TestJwt(t *testing.T) {
	user := userDao.UserDao{}

	user.ID = 1
	user.Username = "TestUser"

	tokenString, err := accountService.GenerateJwt(&user)
	if err != nil {
		t.Error(err)
	}

	claim, err := accountService.ParseJwt(tokenString)
	if err != nil {
		t.Error(err)
	}

	parsedUser := claim.UserDao
	if parsedUser.ID != 1 || parsedUser.Username != "TestUser" {
		t.Error("用户信息有误")
	}
}
