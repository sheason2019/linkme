/**
* 本文件由Omi.js自动生成，谨慎改动！
 */
package socket

import (
	"github.com/imroc/req/v3"
)
import chat "github.com/sheason2019/linkme/omi/chat"

type ChatSocketClient struct {
	Request *req.Client
	HOST    string
}

func (ChatSocketClient) New(host string) (definition ChatSocketClient) {
	definition.HOST = host
	return
}
func (definition ChatSocketClient) GetRequestClient() *req.Client {
	if definition.Request != nil {
		return definition.Request
	}
	return req.C()
}
func (definition ChatSocketClient) PostUserSequence(userSequence []UserConversationSequence) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetBody(&PostUserSequenceRequest{UserSequence: userSequence}).Post(definition.HOST + "/ChatSocket.UserSequence")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatSocketClient) PostMessages(convId int, messages []chat.Message) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetBody(&PostMessagesRequest{ConvId: convId, Messages: messages}).SetBody(&PostMessagesRequest{ConvId: convId, Messages: messages}).Post(definition.HOST + "/ChatSocket.Messages")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatSocketClient) KickoutMember(members []chat.MessageMember) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetBody(&KickoutMemberRequest{Members: members}).Post(definition.HOST + "/ChatSocket.KickoutMember")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}

func (definition ChatSocketClient) ConversationUpdate(convId int) {
	client := definition.GetRequestClient()
	resp, err := client.R().SetBody(&ConversationUpdateRequest{ConvId: convId}).Post(definition.HOST + "/ChatSocket.ConversationUpdate")
	if err != nil {
		panic(err)
	}
	if resp.IsError() {
		panic("远程调用错误")
	}
	return
}
