package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

func PutMemberNickname(member *chatDao.MemberDao, nickname string) error {
	if nickname == "" {
		member.NickName = nil
	} else {
		member.NickName = &nickname
	}

	conn := db.GetConn()

	return conn.Save(&member).Error
}
