package chatService

import (
	"encoding/json"

	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

// 创建群组用户邀请信息
func CreateUserInviteMessage(convId uint, memberId uint, invitedMemberId []uint) (*chatDao.MessageDao, error) {
	message := chatDao.MessageDao{}

	content, err := json.Marshal(invitedMemberId)
	if err != nil {
		return nil, err
	}

	message.MemberId = memberId
	message.Content = string(content)
	message.Type = chatDao.MessageType_GroupInvite
	message.ConversationId = convId

	conn := db.GetConn()
	err = conn.Create(&message).Error
	if err != nil {
		return nil, err
	}

	return &message, nil
}
