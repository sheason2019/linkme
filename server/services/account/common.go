package accountService

import (
	"encoding/base64"
	"errors"

	"github.com/sheason2019/linkme/omi/account"
)

// 接受到登录和注册信息时，用户的密码内容是经过RSA加密的，这里需要先将用户的密码内容进行解密
func DecryptPassword(user *account.User, saltId int) error {
	salt, err := GetSalt(saltId)
	if err != nil {
		return err
	}
	keypair, err := GetRsaKeyPair()
	if err != nil {
		return err
	}

	cipherPassword, err := base64.StdEncoding.DecodeString(*user.Password)
	if err != nil {
		return err
	}
	cipherPasswordBuf := []byte(cipherPassword)

	passwordBuf := RsaDecrypt(cipherPasswordBuf, []byte(keypair.PriKey))
	password := string(passwordBuf)

	err = ValidateSalt(password, *salt)
	if err != nil {
		return err
	}

	realPassword := RemoveSaltFromSource(password, *salt)
	user.Password = &realPassword

	// 成功获取到用户的完整注册信息后，删除指定的Salt
	RemoveSalt(saltId)

	return nil
}

// 校验salt
func ValidateSalt(source string, salt string) error {
	saltSlice := source[len(source)-len(salt):]
	sourceBytes := []byte(saltSlice)
	saltBytes := []byte(salt)

	for i, v := range sourceBytes {
		if v != saltBytes[i] {
			return errors.New("校验Salt失败 - source::" + source + " salt::" + salt)
		}
	}
	return nil
}

// 去除salt
func RemoveSaltFromSource(source string, salt string) string {
	return source[:len(source)-len(salt)]
}
