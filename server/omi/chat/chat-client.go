/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月18日 18:20:28.
 */
package chat

import (
	"fmt"

	"github.com/imroc/req/v3"
)

// 聊天服务 IDL 定义
type ChatClient struct {
	Request *req.Client
	HOST    string
}

func (ChatClient) New(host string) (definition ChatClient) {
	definition.HOST = host
	return
}
func (definition ChatClient) GetRequestClient() *req.Client {
	if definition.Request != nil {
		return definition.Request
	}
	return req.C()
}
func (definition ChatClient) CreatePrivateConversation(userId int) (result int) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetBody(&CreatePrivateConversationRequest{UserId: userId}).SetResult(&result).Post(definition.HOST + "/Chat.CreatePrivateConversation")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatClient) GetConversationById(convId int) (result Conversation) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetQueryParam("convId", fmt.Sprint(convId)).SetResult(&result).Get(definition.HOST + "/Chat.ConversationById")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

type ChatRpcClient struct {
	Request *req.Client
	HOST    string
}

func (ChatRpcClient) New(host string) (definition ChatRpcClient) {
	definition.HOST = host
	return
}
func (definition ChatRpcClient) GetRequestClient() *req.Client {
	if definition.Request != nil {
		return definition.Request
	}
	return req.C()
}
func (definition ChatRpcClient) GetSequenceItem() (result []SequenceItem) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetResult(&result).Get(definition.HOST + "/ChatRpc.SequenceItem")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatRpcClient) GetDefaultMessage(convId int) (result MessageResponse) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetQueryParam("convId", fmt.Sprint(convId)).SetResult(&result).Get(definition.HOST + "/ChatRpc.DefaultMessage")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatRpcClient) GetSpecifiedMessage(messageId int, vector string) (result MessageResponse) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetQueryParam("messageId", fmt.Sprint(messageId)).SetQueryParam("vector", fmt.Sprint(vector)).SetResult(&result).Get(definition.HOST + "/ChatRpc.SpecifiedMessage")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatRpcClient) GetUserEnterConversationLimit(userId int, convId int) (result bool) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetQueryParam("userId", fmt.Sprint(userId)).SetQueryParam("convId", fmt.Sprint(convId)).SetResult(&result).Get(definition.HOST + "/ChatRpc.UserEnterConversationLimit")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatRpcClient) PostUserMessage(userId int, convId int, msg Message) (result Message) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetBody(&PostUserMessageRequest{UserId: userId, ConvId: convId, Msg: msg}).SetBody(&PostUserMessageRequest{UserId: userId, ConvId: convId, Msg: msg}).SetBody(&PostUserMessageRequest{UserId: userId, ConvId: convId, Msg: msg}).SetResult(&result).Post(definition.HOST + "/ChatRpc.UserMessage")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatRpcClient) GetMessages(userId int, convId int, originMessageId int) (result []Message) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetQueryParam("userId", fmt.Sprint(userId)).SetQueryParam("convId", fmt.Sprint(convId)).SetQueryParam("originMessageId", fmt.Sprint(originMessageId)).SetResult(&result).Get(definition.HOST + "/ChatRpc.Messages")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}