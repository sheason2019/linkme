package chatService

import (
	"github.com/sheason2019/linkme/dao/chatDao"
	"github.com/sheason2019/linkme/db"
)

// 这个逻辑在并发的时候可能会遇到重复写入用户的问题
// 如果真存在并发问题的话
// 可能需要针对ConvId加个乐观锁
func AddUserInfoConversation(convId int, usersId []int) ([]chatDao.MemberDao, error) {
	if len(usersId) == 0 {
		return make([]chatDao.MemberDao, 0), nil
	}

	// 首先拿到已加入、曾加入该群聊的人员名单
	members := make([]chatDao.MemberDao, 0)
	conn := db.GetConn()

	err := conn.
		Where("conversation_id = ? and user_id in ?", convId, usersId).
		Find(&members).
		Error
	if err != nil {
		return nil, err
	}

	// 创建一个Map，供待会儿遍历usersId时进行索引
	membersMap := make(map[uint]chatDao.MemberDao)
	for _, v := range members {
		membersMap[v.UserId] = v
	}

	// 受影响的用户
	effectedUsersId := make(map[uint]bool)

	// 遍历UsersId，如果已有的Member已存在，就复用之前的成员信息
	// 否则就创建一个新的成员信息
	members = make([]chatDao.MemberDao, len(usersId))
	for i, v := range usersId {
		member, exist := membersMap[uint(v)]
		if exist {
			members[i] = member
			members[i].Removed = false
			effectedUsersId[uint(v)] = member.Removed
		} else {
			members[i] = chatDao.MemberDao{}
			members[i].ConversationId = uint(convId)
			members[i].UserId = uint(v)
			effectedUsersId[uint(v)] = true
		}
	}

	// 保存成员信息
	err = conn.Save(&members).Error
	if err != nil {
		return nil, err
	}

	// 获取受影响的成员信息
	effectedMember := make([]chatDao.MemberDao, 0)
	for _, v := range members {
		effected, exist := effectedUsersId[v.UserId]
		if exist && effected {
			effectedMember = append(effectedMember, v)
		}
	}

	return effectedMember, nil
}
