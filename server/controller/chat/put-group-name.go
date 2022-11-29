package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
)

func (chatImpl) PutGroupName(ctx *gin.Context, groupId int, name string) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	conn := db.GetConn()

	if len(name) == 0 {
		panic("群名称不能为空")
	}

	conv := chatDao.ConversationDao{}

	err := conn.Where("id = ?", groupId).Find(&conv).Error
	if err != nil {
		panic(err)
	}

	if conv.OwnerId != currentUser.ID {
		panic("仅群主可更改基本信息")
	}

	conv.Name = name
	err = conn.Save(&conv).Error
	if err != nil {
		panic(err)
	}
}

func attachPutGroupName(r *gin.Engine) {
	r.PUT(chat.ChatDefinition.PUT_GROUP_NAME_PATH, func(ctx *gin.Context) {
		props := chat.PutGroupNameRequest{}
		ctx.BindJSON(&props)

		controller.PutGroupName(ctx, props.GroupId, props.Name)
		ctx.String(200, "OK")
	})
}
