package chatService

import (
	"encoding/json"

	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/dao/userDao"
	"github.com/sheason2019/linkme/db"
)

// 将会话写入用户的消息列表
func PushConversationIntoSequence(conv *chatDao.ConversationDao, user *userDao.UserDao) error {
	conn := db.GetConn()

	sequenceDao := chatDao.SequenceDao{
		User: *user,
	}

	err := conn.Where(&sequenceDao).Limit(1).Find(&sequenceDao).Error
	if err != nil {
		return err
	}

	convSequence := make([]uint, 0)
	err = json.Unmarshal([]byte(sequenceDao.Sequence), &convSequence)
	if err != nil {
		// 解析ConversationSequence失败则表示用户尚未初始化消息列表
		convSequence = []uint{conv.ID}
	} else {
		// 否则需要在会话列表的顶部添加指定的会话
		convSequence = append([]uint{conv.ID}, convSequence...)
	}

	// 将修改后的conv序列化为字符串
	str, err := json.Marshal(convSequence)
	if err != nil {
		return err
	}
	sequenceDao.Sequence = string(str)

	err = conn.Save(&sequenceDao).Error
	if err != nil {
		return err
	}

	return nil
}
