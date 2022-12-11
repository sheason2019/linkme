package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	chatService "github.com/sheason2019/linkme/services/chat"
	"github.com/sheason2019/linkme/utils"
)

func (chatImpl) DeleteSequenceItem(ctx *gin.Context, convId int) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	conn := db.GetConn()

	sequenceDao, err := chatService.GetSequence(currentUser.ID)
	if err != nil {
		panic(err)
	}
	sequence := sequenceDao.Sequence

	sequence = utils.Filter(sequence, func(item uint, index int) bool {
		return item != uint(convId)
	})

	sequenceDao.Sequence = sequence
	err = conn.Save(&sequenceDao).Error
	if err != nil {
		panic(err)
	}
}

func attachDeleteSequenceItem(r *gin.Engine) {
	r.DELETE(chat.ChatDefinition.DELETE_SEQUENCE_ITEM_PATH, func(ctx *gin.Context) {
		props := chat.DeleteSequenceItemRequest{}
		ctx.BindQuery(&props)

		controller.DeleteSequenceItem(ctx, props.ConvId)
		ctx.String(200, "OK")
	})
}
