package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
	"github.com/sheason2019/linkme/omi/chat"
	"github.com/sheason2019/linkme/utils"
)

func ConvertConversationToSequenceItem(userId uint, conv chatDao.ConversationDao) (*chat.SequenceItem, error) {
	item := chat.SequenceItem{}
	conn := db.GetConn()

	item.ConversationId = utils.ConvertNumberToIntPtr(conv.ID)
	// 获取会话中的最后一条信息
	lastMessage := &chatDao.MessageDao{}

	var count int64
	conn.
		Where("conversation_id = ?", conv.ID).
		Preload("Member").
		Preload("Member.User").
		Order("created_at desc").
		Limit(1).
		Find(lastMessage).
		Count(&count)

	if count == 0 {
		lastMessage = nil
	}

	// 发送消息的用户名
	var senderName string
	if conv.Type == chatDao.ConversationType_Group && lastMessage != nil {
		senderName = lastMessage.Member.User.Username + "："
	}

	item.Name = conv.ToIDL(userId).Name
	// 设置消息列表中消息相关的数据（最后信息、信息时间等）
	if lastMessage != nil {
		if lastMessage.Type == chatDao.MessageType_UserMessage {
			msg := senderName + lastMessage.Content
			item.LastMessage = &msg
		} else if lastMessage.Type == chatDao.MessageType_GroupInvite {
			msg := "会话成员变更"
			item.LastMessage = &msg
		} else if lastMessage.Type == chatDao.MessageType_Image {
			msg := senderName + "[图片]"
			item.LastMessage = &msg
		}
		item.LastUpdateTime = utils.ConvertNumberToIntPtr(lastMessage.CreatedAt.Unix())
	}

	// 拉取用户在指定会话的成员信息
	member, err := FindMember(int(conv.ID), int(userId))
	if err != nil {
		return nil, err
	}

	// 如果用户已被移出群组聊天
	if member.Removed {
		removedMessage := "您已被移出群聊"
		item.UnreadCount = utils.ConvertNumberToIntPtr(1)
		item.LastMessage = &removedMessage
		return &item, nil
	}

	// 拉取未读信息数量
	var unreadCount int64
	err = conn.
		Model(chatDao.MessageReciver{}).
		Where("member_id = ? and checked = ?", member.ID, false).
		Count(&unreadCount).
		Error
	if err != nil {
		return nil, err
	}
	item.UnreadCount = utils.ConvertNumberToIntPtr(unreadCount)

	return &item, nil
}
