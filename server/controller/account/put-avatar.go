package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/account"
)

func (accountImpl) PutAvatar(ctx *gin.Context, imageHash string) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	conn := db.GetConn()

	err := conn.
		Model(&currentUser).
		Where("id = ?", currentUser.ID).
		Update("avatar", imageHash).
		Error

	if err != nil {
		panic(err)
	}
}

func attachPutAvatar(r *gin.Engine) {
	r.PUT(account.AccountDefinition.PUT_AVATAR_PATH, func(ctx *gin.Context) {
		props := account.PutAvatarRequest{}
		ctx.BindJSON(&props)

		controller.PutAvatar(ctx, props.ImageHash)
		ctx.String(200, "OK")
	})
}
