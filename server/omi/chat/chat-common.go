/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月25日 0:16:35.
 */
package chat

// 聊天服务 IDL 定义
type SequenceItem struct {
	ConversationId *int
	Name           *string
	LastMessage    *string
	LastUpdateTime *int
	UnreadCount    *int
	AvatarUrl      *string
}
type Conversation struct {
	Id      *int
	Name    *string
	Type    *string
	Members *[]MessageMember
}
type Message struct {
	Id        *int
	Type      *string
	Content   *string
	TimeStamp *int
	// 发送该消息的会话成员信息
	MemberId *int
	// 已读信息的人数统计
	TargetCheckedCount  *int
	CurrentCheckedCount *int
}
type MessageMember struct {
	MemberId  *int
	UserId    *int
	Name      *string
	AvatarUrl *string
}
type MessageResponse struct {
	Messages *[]Message
	HasMore  *bool
}
type CreatePrivateConversationRequest struct {
	UserId int `json:"userId"`
}
type CreateGroupConversationRequest struct {
	UserIds   []int  `json:"userIds"[]`
	GroupName string `json:"groupName"`
}
type GetConversationByIdRequest struct {
	ConvId int `form:"convId"`
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
type CheckMessageRequest struct {
	UserId int `json:"userId"`
	ConvId int `json:"convId"`
}
