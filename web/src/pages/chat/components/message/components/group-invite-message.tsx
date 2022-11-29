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

  const invitor = chat.memberMap.get(message.MemberId);
  const invitedMembers = invited.map((item) => chat.memberMap.get(item));

  return (
    <Typography variant="body2" sx={{ textAlign: "center", color: "gray" }}>
      <UsernameSpan>{invitor?.Nickname ?? invitor?.Username}</UsernameSpan>
      <span>邀请了</span>
      {invitedMembers.map((member, index) => (
        <UsernameSpan key={index}>
          {member?.Nickname ?? member?.Username}
        </UsernameSpan>
      ))}
      <span>加入群聊</span>
    </Typography>
  );
};

export default GroupInviteMessage;
