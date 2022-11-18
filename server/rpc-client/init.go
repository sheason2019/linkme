package rpcClient

import (
	"errors"

	"github.com/imroc/req/v3"
	"github.com/sheason2019/linkme/rpc"
)

var RpcRequestClient *req.Client

func InitRpcClient() error {
	tokenMap, err := rpc.GetRpcToken()
	if err != nil {
		return err
	}

	token, exist := tokenMap["server"]
	if !exist {
		return errors.New("RPC Token尚未初始化")
	}

	rpcClient := req.C()
	rpcClient.SetCommonHeader("rpc-token", token)

	RpcRequestClient = rpcClient

	initChatSocketClient()

	return nil
}
