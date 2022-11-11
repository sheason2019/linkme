/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年11月11日 20:29:6.
 */
package user

type User struct {
	Username *string
	Password *string
}
type LoginRequest struct {
	User User `json:"user"`
}
type RegistRequest struct {
	User User `json:"user"`
}
