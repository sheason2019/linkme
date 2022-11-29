package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/account"
)

func (accountImpl) PutSignature(ctx *gin.Context, signature string) {
	currentUser := middleware.MustGetCurrentUser(ctx)

	// 验证签名是否合规
	if len(signature) > 100 {
		panic("签名长度最多为100个字符")
	}

	conn := db.GetConn()
	err := conn.
		Model(&userDao.UserDao{}).
		Where("id = ?", currentUser.ID).
		Update("signature", signature).
		Error
	if err != nil {
		panic(err)
	}
}

func attachPutSignature(r *gin.Engine) {
	r.PUT(account.AccountDefinition.PUT_SIGNATURE_PATH, func(ctx *gin.Context) {
		props := account.PutSignatureRequest{}
		ctx.BindJSON(&props)

		controller.PutSignature(ctx, props.Signature)
		ctx.String(200, "OK")
	})
}
