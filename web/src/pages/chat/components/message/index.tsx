import { Box } from "@mui/material";
import { FC, useEffect, useMemo, useRef } from "react";
import { ViewMessage } from "../../hooks/use-chat";
import GroupInviteMessage from "./components/group-invite-message";
import ImageMessage from "./components/image-message";
import UserMessage from "./components/user-message";

export interface IMessage {
  message: ViewMessage;
  io?: IntersectionObserver;
}

const MessageParser: FC<IMessage> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.io && ref.current) {
      props.io.observe(ref.current);
    }
  }, [props.io, ref]);

  const content = useMemo(() => {
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
  }, [props]);

  return (
    <Box
      ref={ref}
      id={`message-${props.message.Id}`}
      attr-message-id={props.message.Id}
    >
      {content}
    </Box>
  );
};

export default MessageParser;
