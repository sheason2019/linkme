package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	rpcClient "github.com/sheason2019/linkme/rpc-client"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatImpl) PutMemberNickname(ctx *gin.Context, convId int, nickName string) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	member, err := chatService.FindMember(convId, int(currentUser.ID))
	if err != nil {
		panic(err)
	}

	if member == nil {
		panic("指定的会话成员不存在")
	}

	if member.Removed {
		panic("指定的成员已被移出会话")
	}

	err = chatService.PutMemberNickname(member, nickName)
	if err != nil {
		panic(err)
	}

	// 这里应该通知当前在会话中的用户重新拉取会话信息，以获取新的用户昵称
	rpcClient.ChatSocketClient.ConversationUpdate(convId)
}

func attachPutMemberNickname(r *gin.Engine) {
	r.PUT(chat.ChatDefinition.PUT_MEMBER_NICKNAME_PATH, func(ctx *gin.Context) {
		props := chat.PutMemberNicknameRequest{}
		ctx.BindJSON(&props)

		controller.PutMemberNickname(ctx, props.ConvId, props.NickName)
		ctx.String(200, "OK")
	})
}
