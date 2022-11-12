package accountService

import (
	"errors"
	"time"

	"github.com/sheason2019/linkme/utils"
)

// 加密盐的长度
const salt_length = 64

// 加密盐使用Map存储在内存中
var salt_map map[int]string = make(map[int]string)

var salt_id = 0

// 生成盐
func GenerateSalt() (string, int) {
	// 生成盐并将之存储到map里，并创建一个定时器在10分钟之后删除盐，避免过多未使用的盐进行堆积导致内存泄露
	salt := utils.RandomString(salt_length)
	salt_map[salt_id] = salt

	saltTimer := time.NewTimer(time.Minute * 10)

	// 拉一个携程做定时器，在十分钟后删除指定的Salt
	go func() {
		id := salt_id
		for range saltTimer.C {
			RemoveSalt(id)
		}
	}()

	defer func() {
		salt_id++
	}()

	return salt, salt_id
}

func RemoveSalt(id int) {
	_, contain := salt_map[id]
	if contain {
		delete(salt_map, id)
	}
}

func GetSalt(id int) (*string, error) {
	salt, contain := salt_map[id]
	if contain {
		return &salt, nil
	}
	return nil, errors.New("指定的Salt不存在")
}
