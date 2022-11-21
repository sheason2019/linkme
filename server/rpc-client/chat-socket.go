package rpcClient

import (
	"github.com/sheason2019/linkme/omi/socket"
)

var ChatSocketClient = socket.ChatSocketClient{
	HOST:    linkme_socket_host,
	Request: RpcRequestClient,
}

func initChatSocketClient() {
	ChatSocketClient = socket.ChatSocketClient{
		HOST:    linkme_socket_host,
		Request: RpcRequestClient,
	}
}
