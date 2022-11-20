import { Box, Link, Stack } from "@mui/material";
import CustomLink from "../../../../common/components/custom-link";
import useChat from "../../hooks/use-chat";
import useSocket from "../../hooks/use-socket";
import Message from "../message";
import TimeStamp from "../time-stamp";

const Messages = () => {
  const { chat } = useChat();
  const { handlePullMoreMessage } = useSocket();

  return (
    <Stack flex={1} p={1} spacing={1} sx={{ overflowY: "auto" }}>
      {chat.hasMoreMessage && (
        <Stack alignItems="center">
          <CustomLink
            sx={{ fontSize: "0.8rem" }}
            onClick={handlePullMoreMessage}
          >
            点击此处加载更多消息
          </CustomLink>
        </Stack>
      )}
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
