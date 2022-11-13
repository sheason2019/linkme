package accountService

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/utils"
)

var jwt_secret_file = "jwt_secret"
var jwt_secret_path = secret_path + "/" + jwt_secret_file

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
	jwtSecret, err := os.ReadFile(jwt_secret_file)
	if err == nil && len(jwtSecret) > 0 {
		return jwtSecret
	}

	// 否则以64位随机字符串作为jwt的加密秘钥
	jwtSecret = []byte(utils.RandomString(64))
	// 并存入文件系统
	err = utils.WriteInfoFile(secret_path, jwt_secret_file, jwtSecret)
	if err != nil {
		panic(err)
	}

	return jwtSecret
}
