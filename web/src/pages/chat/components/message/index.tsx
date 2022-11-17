import { Avatar, Box, Stack } from "@mui/material";
import { FC } from "react";
import { ViewMessage } from "../../hooks";
import StatusCircle from "../status-circle";

interface IMessage {
  message: ViewMessage;
}

const Message: FC<IMessage> = ({ message }) => {
  return (
    <Stack direction="row" justifyContent="end" alignItems="center">
      <Box sx={{ alignSelf: "end" }}>
        <StatusCircle loading={!!message.Mark} target={1} current={1} />
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
