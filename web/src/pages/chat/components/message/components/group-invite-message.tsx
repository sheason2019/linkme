import { Link, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { IMessage } from "..";
import useChat from "../../../hooks/use-chat";

const UsernameSpan: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Link underline="none" component="span" sx={{ cursor: "pointer", mx: 0.5 }}>
      {children}
    </Link>
  );
};

const GroupInviteMessage: FC<IMessage> = ({ message }) => {
  const { chat } = useChat();

  const invited: number[] = JSON.parse(message.Content);

  const invitorName = chat.memberMap.get(message.MemberId)?.Name;
  const invitedName = invited.map((item) => chat.memberMap.get(item)?.Name);

  return (
    <Typography variant="body2" sx={{ textAlign: "center", color: "gray" }}>
      <UsernameSpan>{invitorName}</UsernameSpan>
      <span>邀请了</span>
      <UsernameSpan>{invitedName}</UsernameSpan>
      <span>加入群聊</span>
    </Typography>
  );
};

export default GroupInviteMessage;
