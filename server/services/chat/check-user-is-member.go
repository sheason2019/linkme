package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

func FindMember(convId, userId int) (*chatDao.MemberDao, error) {
	daoMember := chatDao.MemberDao{}
	daoMember.UserId = uint(userId)
	daoMember.ConversationId = uint(convId)

	conn := db.GetConn()
	// 检查指定的会话成员是否存在
	var count int64
	err := conn.Model(&daoMember).Where(&daoMember).Count(&count).Error
	if err != nil {
		return nil, err
	}
	// 若存在则找到指定的会话成员
	err = conn.Where(&daoMember).Find(&daoMember).Error
	if err != nil {
		return nil, err
	}

	return &daoMember, nil
}
