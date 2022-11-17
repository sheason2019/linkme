/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月17日 19:48:39.
 */
package chat

// 聊天服务 IDL 定义
type SequenceItem struct {
	ConversationId *int
	Name           *string
	LastMessage    *string
	AvatarUrl      *string
}
type Conversation struct {
	Id   *int
	Name *string
	Type *string
}
type Message struct {
	Id        *int
	Type      *string
	Content   *string
	TimeStamp *int
	// 发送该消息的会话成员信息
	MemberId *int
}
type MessageMember struct {
	MemberId  *int
	Name      *string
	AvatarUrl *string
}
type MessageResponse struct {
	Messages              *[]Message
	HasMoreEarlierMessage *bool
	HasMoreLaterMessage   *bool
}
type CreatePrivateConversationRequest struct {
	UserId int `json:"userId"`
}
type GetConversationByIdRequest struct {
	ConvId int `form:"convId"`
}

type GetDefaultMessageRequest struct {
	ConvId int `form:"convId"`
}
type GetSpecifiedMessageRequest struct {
	MessageId int    `form:"messageId"`
	Vector    string `form:"vector"`
}
type GetUserEnterConversationLimitRequest struct {
	UserId int `form:"userId"`
	ConvId int `form:"convId"`
}
type PostUserMessageRequest struct {
	UserId int     `json:"userId"`
	ConvId int     `json:"convId"`
	Msg    Message `json:"msg"`
}
type GetMessagesRequest struct {
	UserId          int `form:"userId"`
	ConvId          int `form:"convId"`
	OriginMessageId int `form:"originMessageId"`
}
