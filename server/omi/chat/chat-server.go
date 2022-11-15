/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月15日 22:2:27.
 */
package chat

import (
	"github.com/gin-gonic/gin"
)

// 聊天服务 IDL 定义
type Chat interface {
	// 创建私聊会话，参数是指定的用户ID，返回的是会话ID
	CreatePrivateConversation(ctx *gin.Context, userId int) int
	// 获取会话信息
	GetConversationById(ctx *gin.Context, convId int) Conversation
}
type typeChatDefinition struct {
	CREATE_PRIVATE_CONVERSATION_PATH string
	GET_CONVERSATION_BY_ID_PATH      string
}

var ChatDefinition = &typeChatDefinition{
	CREATE_PRIVATE_CONVERSATION_PATH: "/Chat.CreatePrivateConversation",
	GET_CONVERSATION_BY_ID_PATH:      "/Chat.ConversationById",
}

type ChatRpc interface {
	// 获取消息列表信息
	GetSequenceItem(ctx *gin.Context) []SequenceItem
	// 获取默认的会话信息，即根据已读位置实现的会话信息，更早及更晚方向各拉取20条
	GetDefaultMessage(ctx *gin.Context, convId int) MessageResponse
	// 获取指定的会话信息, vector: earlier or later，返回40条信息
	GetSpecifiedMessage(ctx *gin.Context, messageId int, vector string) MessageResponse
}
type typeChatRpcDefinition struct {
	GET_SEQUENCE_ITEM_PATH     string
	GET_DEFAULT_MESSAGE_PATH   string
	GET_SPECIFIED_MESSAGE_PATH string
}

var ChatRpcDefinition = &typeChatRpcDefinition{
	GET_SEQUENCE_ITEM_PATH:     "/ChatRpc.SequenceItem",
	GET_DEFAULT_MESSAGE_PATH:   "/ChatRpc.DefaultMessage",
	GET_SPECIFIED_MESSAGE_PATH: "/ChatRpc.SpecifiedMessage",
}
