/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月25日 18:18:51.
 */
package socket

import chat "github.com/sheason2019/linkme/omi/chat"

type UserConversationSequence struct {
	UserId   *int
	Sequence *[]chat.SequenceItem
}
type PostUserSequenceRequest struct {
	UserSequence []UserConversationSequence `json:"userSequence"[]`
}
type PostMessagesRequest struct {
	ConvId   int            `json:"convId"`
	Messages []chat.Message `json:"messages"[]`
}
