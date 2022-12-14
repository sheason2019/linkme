/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月29日 14:42:47.
 */
package account

type User struct {
	UserId    *int
	Username  *string
	Password  *string
	AvatarUrl *string
	Signature *string
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
type GetUserByUserIdRequest struct {
	UserId int `form:"userId"`
}
type GetUsernameExistRequest struct {
	Username string `form:"username"`
}
type PutAvatarRequest struct {
	ImageHash string `json:"imageHash"`
}
type PutSignatureRequest struct {
	Signature string `json:"signature"`
}
