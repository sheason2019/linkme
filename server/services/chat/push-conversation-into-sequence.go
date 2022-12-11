package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/utils"
)

// 将会话写入用户的消息列表
// setTop表示当用户列表中已经存在会话信息时，是否需要将指定的会话信息置顶
func PushConversationIntoSequence(convId uint, userId uint, setTop bool) error {
	conn := db.GetConn()

	sequenceDao := chatDao.SequenceDao{
		UserId: userId,
	}

	err := conn.Where(&sequenceDao).Limit(1).Find(&sequenceDao).Error
	if err != nil {
		return err
	}

	convSequence := sequenceDao.Sequence
	if err != nil {
		// 解析ConversationSequence失败则表示用户尚未初始化消息列表
		convSequence = []uint{convId}
	} else if exist, index := utils.Exist(convSequence, convId); exist {
		if setTop {
			// 如果列表中已经存在指定的会话信息，将该信息移动到列表顶部
			utils.ExchangeItem(convSequence, 0, index)
		} else {
			return nil
		}
	} else {
		// 否则需要在会话列表的顶部添加指定的会话
		convSequence = append([]uint{convId}, convSequence...)
	}

	sequenceDao.Sequence = convSequence

	err = conn.Save(&sequenceDao).Error
	if err != nil {
		return err
	}

	return nil
}
