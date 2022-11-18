import { Avatar, Box, Stack } from "@mui/material";
import { FC } from "react";
import useChat, { ViewMessage } from "../../hooks/use-chat";
import StatusCircle from "../status-circle";

interface IMessage {
  message: ViewMessage;
}

const Message: FC<IMessage> = ({ message }) => {
  const { chat } = useChat();

  const isSelfMsg = message.MemberId === chat.currentMemberId;

  return (
    <Stack
      direction={isSelfMsg ? "row" : "row-reverse"}
      justifyContent={isSelfMsg ? "end" : "start"}
      alignItems="center"
    >
      <Box sx={{ alignSelf: "end" }}>
        <StatusCircle
          loading={!!message.Mark}
          target={message.TargetCheckedCount}
          current={message.CurrentCheckedCount}
        />
      </Box>
      <Stack alignItems="end" sx={{ mr: 1, ml: 0.5 }}>
        <Stack
          sx={{
            p: 1,
            minWidth: "1.5rem",
            bgcolor: "skyblue",
            borderRadius: 1,
            whiteSpace: "pre-line",
          }}
          alignItems="center"
        >
          {message.Content}
        </Stack>
      </Stack>
      <Box sx={{ alignSelf: "start" }}>
        <Avatar />
      </Box>
    </Stack>
  );
};

export default Message;
