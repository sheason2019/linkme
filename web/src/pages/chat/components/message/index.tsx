import { FC } from "react";
import { ViewMessage } from "../../hooks/use-chat";
import GroupInviteMessage from "./components/group-invite-message";
import ImageMessage from "./components/image-message";
import UserMessage from "./components/user-message";

export interface IMessage {
  message: ViewMessage;
}

const MessageParser: FC<IMessage> = (props) => {
  if (props.message.Type === "user-message") {
    return <UserMessage {...props} />;
  }

  if (props.message.Type === "group-invite") {
    return <GroupInviteMessage {...props} />;
  }

  if (props.message.Type === "image") {
    return <ImageMessage {...props} />;
  }

  console.error("无法解析的消息类型");
  return null;
};

export default MessageParser;
