/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月18日 18:20:28.
 */
package socket

import (
	"github.com/imroc/req/v3"
)

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
