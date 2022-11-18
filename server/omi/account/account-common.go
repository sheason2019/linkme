/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月18日 18:34:37.
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
type GetUsersByUsernameResponse struct {
	// 拉取的用户信息
	Users *[]User
	// 是否存有更多用户
	HasMore *bool
}

type LoginRequest struct {
	User   User `json:"user"`
	SaltId int  `json:"saltId"`
}
type RegistRequest struct {
	User   User `json:"user"`
	SaltId int  `json:"saltId"`
}

type GetUsersByUsernameRequest struct {
	Username string `form:"username"`
	Offset   int    `form:"offset"`
}
