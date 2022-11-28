import {
  ConversationUpdateRequest,
  KickoutMemberRequest,
  PostMessagesRequest,
  PostUserSequenceRequest,
  UnimpledChatSocketController,
} from "../../api-lib/socket-server";
import { io } from "../../main";
import { UserSocketsMap } from "../socket";
import { SocketConvMap } from "../socket/socket-conv-map";

class ChatSocketController implements UnimpledChatSocketController {
  ConversationUpdate({
    convId,
  }: ConversationUpdateRequest): void | Promise<void> {
    io.to("conv::" + convId).emit("syncSequenceItem");
    io.to("conv::" + convId).emit("syncConversation");
  }
  KickoutMember({ members }: KickoutMemberRequest): void | Promise<void> {
    // 定义下面两个Map把逻辑的时间复杂度控制在O(n)

    // 这是应当向所有会话中的成员推送的成员变更信息Map
    const pushMap: Map<number, number[]> = new Map();
    // 这是用来记录哪些用户应当立即被移出会话的Map
    const kickoutMap: Map<number, string[]> = new Map();

    members.forEach((member) => {
      if (!pushMap.has(member.ConversationId)) {
        pushMap.set(member.ConversationId, []);
      }

      pushMap.get(member.ConversationId)!.push(member.MemberId);

      const socketsId =
        UserSocketsMap.getSocketsIdByUserId(member.UserId) ?? [];
      if (!kickoutMap.has(member.ConversationId)) {
        kickoutMap.set(member.ConversationId, []);
      }
      kickoutMap.set(member.ConversationId, [
        ...kickoutMap.get(member.ConversationId)!,
        ...socketsId,
      ]);
    });

    pushMap.forEach((membersId, convId) => {
      io.to("conv::" + convId).emit("kickout", membersId, convId);
    });

    kickoutMap.forEach((socketsId, convId) => {
      socketsId?.forEach((id) => {
        // 强制指定用户退出房间
        io.to(id).socketsLeave("conv::" + convId);
        // 同步消息列表
        io.to(id).emit("syncSequenceItem");
        SocketConvMap.set(id, undefined);
      });
    });
  }
  // 推送会话信息
  async PostMessages({ convId, messages }: PostMessagesRequest): Promise<void> {
    io.to("conv::" + convId).emit("messages", convId, messages);
  }
  // 推送用户内容
  PostUserSequence({
    userSequence,
  }: PostUserSequenceRequest): void | Promise<void> {
    userSequence.forEach((sequence) => {
      // 根据UserID获取Socket连接，若用户不在线则跳过
      const socketIds = UserSocketsMap.getSocketsIdByUserId(sequence.UserId);
      if (!socketIds) return;

      socketIds.forEach((id) => {
        io.to(id).emit("sequenceItem", sequence.Sequence);
      });
    });
  }
}

export default ChatSocketController;
