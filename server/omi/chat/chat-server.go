/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月15日 13:8:4.
 */
package chat

import (
	"github.com/gin-gonic/gin"
)

// 聊天服务 IDL 定义
type Chat interface {
	// 创建私聊会话，参数是指定的用户ID，返回的是会话ID
	CreatePrivateConversation(ctx *gin.Context, userId int) int
}
type typeChatDefinition struct {
	CREATE_PRIVATE_CONVERSATION_PATH string
}

var ChatDefinition = &typeChatDefinition{
	CREATE_PRIVATE_CONVERSATION_PATH: "/Chat.CreatePrivateConversation",
}
