import {
  PostMessagesRequest,
  PostUserSequenceRequest,
  UnimpledChatSocketController,
} from "../../api-lib/socket-server";
import { io } from "../../main";
import { UserSocketsMap } from "../socket";

class ChatSocketController implements UnimpledChatSocketController {
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
