package rpc

import (
	"encoding/json"
	"os"

	"github.com/sheason2019/linkme/utils"
)

const rpc_token_length = 128
const rpc_token_dir = "/var/linkme"
const rpc_token_file = "rpc-token"
const rpc_token_path = rpc_token_dir + "/" + rpc_token_file

// 生成RPC TOKEN
func GenerateRpcToken() {
	token := utils.RandomString(rpc_token_length)

	tokenMap, err := GetRpcToken()
	if err != nil {
		tokenMap = make(map[string]string)
	}
	tokenMap["server"] = token
	err = SetRpcToken(tokenMap)
	if err != nil {
		panic(err)
	}
}

func GetRpcToken() (map[string]string, error) {
	content, err := os.ReadFile(rpc_token_path)
	if err != nil {
		return nil, err
	}

	tokenMap := make(map[string]string)
	err = json.Unmarshal(content, &tokenMap)
	if err != nil {
		return nil, err
	}

	return tokenMap, nil
}

func SetRpcToken(tokenMap map[string]string) error {
	content, err := json.Marshal(tokenMap)
	if err != nil {
		return err
	}

	err = utils.WriteInfoFile(rpc_token_dir, rpc_token_file, content)
	if err != nil {
		return err
	}

	return nil
}

func CheckRpcToken(token string) (bool, error) {
	tokenMap, err := GetRpcToken()
	if err != nil {
		return false, err
	}

	for _, v := range tokenMap {
		if v == token {
			return true, nil
		}
	}

	return false, nil
}
