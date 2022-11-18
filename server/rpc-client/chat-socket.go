package rpcClient

import (
	"github.com/sheason2019/linkme/omi/socket"
)

var ChatSocketClient = socket.ChatSocketClient{
	HOST:    "http://localhost:3000",
	Request: RpcRequestClient,
}

func initChatSocketClient() {
	ChatSocketClient = socket.ChatSocketClient{
		HOST:    "http://localhost:3000",
		Request: RpcRequestClient,
	}
}
