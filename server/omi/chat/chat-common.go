/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月29日 14:42:47.
 */
package chat

// 聊天服务 IDL 定义
type SequenceItem struct {
	ConversationId *int
	Name           *string
	LastMessage    *string
	LastUpdateTime *int
	UnreadCount    *int
	Avatar         *string
}
type Conversation struct {
	Id          *int
	Name        *string
	Type        *string
	MemberCount *int
	Members     *[]MessageMember
	Avatar      *string
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
	// 成员ID和群昵称
	MemberId *int
	Nickname *string
	// 成员相关的用户信息
	UserId   *int
	Username *string
	// 成员所在的会话
	ConversationId *int
	// 成员类型和头像SourceHash
	Type      *string
	AvatarUrl *string
	// 成员是否被移出群聊
	Removed *bool
}
type MessageResponse struct {
	Messages *[]Message
	HasMore  *bool
}
type GetGroupResponse struct {
	Groups  *[]Conversation
	HasMore *bool
}
type CreatePrivateConversationRequest struct {
	UserId int `json:"userId"`
}
type CreateGroupConversationRequest struct {
	UserIds   []int  `json:"userIds"`
	GroupName string `json:"groupName"`
}
type GetConversationByIdRequest struct {
	ConvId int `form:"convId"`
}
type GetGroupRequest struct {
	SearchText string `form:"searchText"`
	Offset     int    `form:"offset"`
}
type PutGroupNameRequest struct {
	GroupId int    `json:"groupId"`
	Name    string `json:"name"`
}
type DeleteMembersRequest struct {
	MembersId []int `form:"membersId[]"`
}
type DeleteSequenceItemRequest struct {
	ConvId int `form:"convId"`
}
type PutMembersRequest struct {
	ConvId  int   `json:"convId"`
	UsersId []int `json:"usersId"`
}
type PutMemberNicknameRequest struct {
	ConvId   int    `json:"convId"`
	NickName string `json:"nickName"`
}

type PostSequenceItemRequest struct {
	UserId int `json:"userId"`
	ConvId int `json:"convId"`
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
