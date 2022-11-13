package accountService

import (
	"io/ioutil"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/utils"
)

var jwt_secret_file = "dist/jwt_secret"

var jwtSecret = GenerateJwtSecret()

type JwtClaims struct {
	userDao.UserDao
	jwt.RegisteredClaims
}

// 生成
func GenerateJwt(user *userDao.UserDao) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, JwtClaims{
		UserDao: *user,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(7 * 24 * time.Hour)),
			Issuer:    "Linkme",
		},
	})

	return token.SignedString(jwtSecret)
}

// 解析
func ParseJwt(tokenString string) (*JwtClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &JwtClaims{}, func(t *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if token != nil {
		if claims, ok := token.Claims.(*JwtClaims); ok && token.Valid {
			return claims, nil
		}
	}
	return nil, err
}

// 生成Jwt的加密秘钥
func GenerateJwtSecret() []byte {
	// 首先尝试从文件系统中获取
	jwtSecret, err := ioutil.ReadFile(jwt_secret_file)
	if err == nil && len(jwtSecret) > 0 {
		return jwtSecret
	}

	// 否则以64位随机字符串作为jwt的加密秘钥
	jwtSecret = []byte(utils.RandomString(64))
	// 并存入文件系统
	err = ioutil.WriteFile(jwt_secret_file, jwtSecret, 0777)
	if err != nil {
		panic(err)
	}

	return jwtSecret
}
