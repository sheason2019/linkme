import { Box, Stack } from "@mui/material";
import useChat from "../../hooks/use-chat";
import Message from "../message";
import TimeStamp from "../time-stamp";

const Messages = () => {
  const { chat } = useChat();

  return (
    <Stack flex={1} p={1} spacing={1}>
      {chat.messages.map((item, index) => (
        <Box key={item.Id ?? item.Mark}>
          {(index === 0 ||
            item.TimeStamp - chat.messages[index - 1].TimeStamp > 3 * 60) && (
            <Box
              sx={{ textAlign: "center", fontSize: "0.8rem", color: "gray" }}
            >
              <TimeStamp timeStamp={item.TimeStamp} />
            </Box>
          )}
          <Message message={item} />
        </Box>
      ))}
    </Stack>
  );
};

export default Messages;
