import { FC } from "react";
import { ViewMessage } from "../../hooks/use-chat";
import GroupInviteMessage from "./components/group-invite-message";
import UserMessage from "./components/user-message";

export interface IMessage {
  message: ViewMessage;
}

const MessageParser: FC<IMessage> = ({ message }) => {
  if (message.Type === "user-message") {
    return <UserMessage message={message} />;
  }

  if (message.Type === "group-invite") {
    return <GroupInviteMessage message={message} />;
  }

  console.error("无法解析的消息类型");
  return null;
};

export default MessageParser;
