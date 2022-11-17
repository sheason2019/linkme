package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/utils"
)

func ConvertConversationToSequenceItem(userId uint, conv chatDao.ConversationDao) chat.SequenceItem {
	item := chat.SequenceItem{}

	item.ConversationId = utils.ConvertNumberToIntPtr(conv.ID)
	// 如果是私聊
	if conv.Type == chatDao.ConversationType_Private {
		item.Name = conv.ToPrivateIDL(userId).Name
	}

	return item
}
