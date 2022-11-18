package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/omi/chat"
	"gorm.io/gorm"
)

func CreateUserMessage(message chat.Message, convId uint, member *chatDao.MemberDao) (*chatDao.MessageDao, error) {
	conn := db.GetConn()

	daoMessage := chatDao.MessageDao{}

	err := conn.Transaction(func(tx *gorm.DB) error {
		// 根据参数设置消息的内容
		daoMessage.Type = chatDao.MessageType_UserMessage
		daoMessage.Content = *message.Content
		daoMessage.Member = *member
		daoMessage.ConversationId = convId

		// 创建消息
		err := tx.Create(&daoMessage).Error
		if err != nil {
			return err
		}

		// 拉取成员信息，获取消息的接收者
		err = tx.
			Preload("Conversation").
			Preload("Conversation.Members").
			Preload("Conversation.Members.User").
			Where(&member).
			Find(&member).
			Error
		if err != nil {
			return err
		}

		// 计算接收者人数
		reciverLength := len(member.Conversation.Members) - 1
		// 当用户自己给自己发消息的时候，接收者人数将为0
		if reciverLength == 0 {
			return nil
		}
		// 计算接收者列表
		reciverMembers := make([]chatDao.MessageReciver, reciverLength)
		index := 0
		for _, v := range member.Conversation.Members {
			if v.ID != member.ID {
				reciverMembers[index] = chatDao.MessageReciver{
					MemberId:  v.ID,
					MessageId: daoMessage.ID,
					Checked:   false,
				}
				index++
			}
		}
		// 创建消息接收者
		err = tx.Create(&reciverMembers).Error
		if err != nil {
			return err
		}

		daoMessage.MessageRecivers = reciverMembers

		return nil
	})

	if err != nil {
		return nil, err
	}

	return &daoMessage, nil
}
