package accountController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/account"
	accountService "github.com/sheason2019/linkme/services/account"
)

func (accountImpl) GetCryptoInfo(ctx *gin.Context) account.GetCryptoInfoResponse {
	keypair, err := accountService.GetRsaKeyPair()
	if err != nil {
		panic(err)
	}

	salt, id := accountService.GenerateSalt()

	return account.GetCryptoInfoResponse{
		RsaPubKey: &keypair.PubKey,
		Salt:      &salt,
		SaltId:    &id,
	}
}

func attachGetCryptoInfo(r *gin.Engine) {
	r.GET(account.AccountDefinition.GET_CRYPTO_INFO_PATH, func(ctx *gin.Context) {
		ctx.JSON(200, controller.GetCryptoInfo(ctx))
	})
}
