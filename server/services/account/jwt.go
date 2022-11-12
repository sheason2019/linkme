package accountService

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/utils"
)

// 以64位随机字符串作为jwt的加密秘钥
var jwtSecret = []byte(utils.RandomString(64))

type JwtClaims struct {
	userDao.UserDao
	jwt.RegisteredClaims
}

// 生成
func GenerateJwt(user *userDao.UserDao) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, JwtClaims{
		UserDao: *user,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(4 * time.Hour)),
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
