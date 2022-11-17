package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
)

func (chatRpcImpl) GetUserEnterConversationLimit(ctx *gin.Context, userId, convId int) bool {
	daoMember := chatDao.MemberDao{}
	daoMember.UserId = uint(userId)
	daoMember.ConversationId = uint(convId)

	conn := db.GetConn()
	var count int64
	err := conn.Model(&daoMember).Where(&daoMember).Count(&count).Error
	if err != nil {
		panic(err)
	}

	return count != 0
}

func attachGetUserEnterConversationLimit(r *gin.Engine) {
	r.GET(chat.ChatRpcDefinition.GET_USER_ENTER_CONVERSATION_LIMIT_PATH, middleware.RpcGuard, func(ctx *gin.Context) {
		props := chat.GetUserEnterConversationLimitRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, rpcController.GetUserEnterConversationLimit(ctx, props.UserId, props.ConvId))
	})
}
