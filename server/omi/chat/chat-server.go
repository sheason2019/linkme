/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年12月11日 18:39:43.
 */
package chat

import (
	"github.com/gin-gonic/gin"
)

// 聊天服务 IDL 定义
type Chat interface {
	// 创建私聊会话，参数是指定的用户ID，返回的是会话ID
	CreatePrivateConversation(ctx *gin.Context, userId int) int
	// 创建群组会话，返回会话ID
	CreateGroupConversation(ctx *gin.Context, userIds []int, groupName string) int
	// 获取会话信息
	GetConversationById(ctx *gin.Context, convId int) Conversation
	// 搜索群组信息，目前只能搜索已加入的群组，在群组可见度功能上线后，这里要同步更改成所有可搜索到的群组
	GetGroup(ctx *gin.Context, searchText string, offset int) GetGroupResponse
	// 设置群组名称
	PutGroupName(ctx *gin.Context, groupId int, name string)
	// 移除群组中的成员
	DeleteMembers(ctx *gin.Context, membersId []int)
	// 移除消息列表中的项
	DeleteSequenceItem(ctx *gin.Context, convId int)
	// 为群组邀请新成员
	PutMembers(ctx *gin.Context, convId int, usersId []int)
	// 修改用户在群组中的昵称
	PutMemberNickname(ctx *gin.Context, convId int, nickName string)
}
type typeChatDefinition struct {
	CREATE_PRIVATE_CONVERSATION_PATH string
	CREATE_GROUP_CONVERSATION_PATH   string
	GET_CONVERSATION_BY_ID_PATH      string
	GET_GROUP_PATH                   string
	PUT_GROUP_NAME_PATH              string
	DELETE_MEMBERS_PATH              string
	DELETE_SEQUENCE_ITEM_PATH        string
	PUT_MEMBERS_PATH                 string
	PUT_MEMBER_NICKNAME_PATH         string
}

var ChatDefinition = &typeChatDefinition{
	CREATE_PRIVATE_CONVERSATION_PATH: "/Chat.CreatePrivateConversation",
	CREATE_GROUP_CONVERSATION_PATH:   "/Chat.CreateGroupConversation",
	GET_CONVERSATION_BY_ID_PATH:      "/Chat.ConversationById",
	GET_GROUP_PATH:                   "/Chat.Group",
	PUT_GROUP_NAME_PATH:              "/Chat.GroupName",
	DELETE_MEMBERS_PATH:              "/Chat.Members",
	DELETE_SEQUENCE_ITEM_PATH:        "/Chat.SequenceItem",
	PUT_MEMBERS_PATH:                 "/Chat.Members",
	PUT_MEMBER_NICKNAME_PATH:         "/Chat.MemberNickname",
}

type ChatRpc interface {
	// 获取消息列表信息
	GetSequenceItem(ctx *gin.Context) []SequenceItem
	// 添加消息列表中的项，返回值表示消息列表是否发生改变
	PostSequenceItem(ctx *gin.Context, userId int, convId int) bool
	// 获取用户进入会话的权限
	GetUserEnterConversationLimit(ctx *gin.Context, userId int, convId int) bool
	// 用户发送消息
	PostUserMessage(ctx *gin.Context, userId int, convId int, msg Message) Message
	// 拉取会话消息
	GetMessages(ctx *gin.Context, userId int, convId int, originMessageId int) MessageResponse
	// 消息已读功能，为了保证上线速度，这里略微偷个懒
	// 在用户进入Conversation的时候，Socet端会向服务端发起一个请求
	// 随后服务端会将用户在指定会话中的已读信息全部置为已读
	// 并且使用全量更新向用户推送经过变化的消息列表信息
	CheckMessage(ctx *gin.Context, userId int, convId int)
}
type typeChatRpcDefinition struct {
	GET_SEQUENCE_ITEM_PATH                 string
	POST_SEQUENCE_ITEM_PATH                string
	GET_USER_ENTER_CONVERSATION_LIMIT_PATH string
	POST_USER_MESSAGE_PATH                 string
	GET_MESSAGES_PATH                      string
	CHECK_MESSAGE_PATH                     string
}

var ChatRpcDefinition = &typeChatRpcDefinition{
	GET_SEQUENCE_ITEM_PATH:                 "/ChatRpc.SequenceItem",
	POST_SEQUENCE_ITEM_PATH:                "/ChatRpc.SequenceItem",
	GET_USER_ENTER_CONVERSATION_LIMIT_PATH: "/ChatRpc.UserEnterConversationLimit",
	POST_USER_MESSAGE_PATH:                 "/ChatRpc.UserMessage",
	GET_MESSAGES_PATH:                      "/ChatRpc.Messages",
	CHECK_MESSAGE_PATH:                     "/ChatRpc.CheckMessage",
}
