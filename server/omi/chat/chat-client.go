/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月26日 19:20:28.
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

func (definition ChatClient) CreateGroupConversation(userIds []int, groupName string) (result int) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetBody(&CreateGroupConversationRequest{UserIds: userIds, GroupName: groupName}).SetBody(&CreateGroupConversationRequest{UserIds: userIds, GroupName: groupName}).SetResult(&result).Post(definition.HOST + "/Chat.CreateGroupConversation")
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

func (definition ChatClient) GetGroup(searchText string, offset int) (result GetGroupResponse) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetQueryParam("searchText", fmt.Sprint(searchText)).SetQueryParam("offset", fmt.Sprint(offset)).SetResult(&result).Get(definition.HOST + "/Chat.Group")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatClient) PutGroupName(groupId int, name string) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetBody(&PutGroupNameRequest{GroupId: groupId, Name: name}).SetBody(&PutGroupNameRequest{GroupId: groupId, Name: name}).Put(definition.HOST + "/Chat.GroupName")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatClient) DeleteMembers(membersId []int) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetQueryParam("membersId", fmt.Sprint(membersId)).Delete(definition.HOST + "/Chat.Members")
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

func (definition ChatRpcClient) GetMessages(userId int, convId int, originMessageId int) (result MessageResponse) {
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

func (definition ChatRpcClient) CheckMessage(userId int, convId int) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetBody(&CheckMessageRequest{UserId: userId, ConvId: convId}).SetBody(&CheckMessageRequest{UserId: userId, ConvId: convId}).Post(definition.HOST + "/ChatRpc.CheckMessage")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}
