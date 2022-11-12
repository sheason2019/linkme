/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月12日 20:15:7.
 */
package account

type User struct {
	UserId    *int
	Username  *string
	Password  *string
	AvatarUrl *string
}
type GetCryptoInfoResponse struct {
	RsaPubKey *string
	Salt      *string
	SaltId    *int
}

type LoginRequest struct {
	User   User `json:"user"`
	SaltId int  `json:"saltId"`
}
type RegistRequest struct {
	User   User `json:"user"`
	SaltId int  `json:"saltId"`
}
