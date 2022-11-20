import { Box, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import CustomLink from "../../../../common/components/custom-link";
import useChat from "../../hooks/use-chat";
import useSocket from "../../hooks/use-socket";
import Message from "../message";
import TimeStamp from "../time-stamp";

const Messages = () => {
  const { chat } = useChat();
  const { handlePullMoreMessage } = useSocket();

  // 是否需要锁定在聊天信息的最底部
  const focusBottomRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToBottom = (element: HTMLDivElement | null) => {
    if (!element) return;

    element.scrollTo({ top: element.scrollHeight });
  };

  useEffect(() => {
    // 当用户切换房间后，自动将聊天内容锁定在页面的最底部
    focusBottomRef.current = true;
  }, [chat.currentConv?.Id]);

  useEffect(() => {
    if (focusBottomRef.current) {
      handleToBottom(containerRef.current);
    }
  }, [chat.messages]);

  // 当页面滚动到最底部时，将focusBottomRef设置为true，否则设置为false
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const eventHandler = (e: Event) => {
      const element = e.target as HTMLDivElement;
      const focusBottom =
        element.scrollTop + element.offsetHeight + 4 > element.scrollHeight;
      focusBottomRef.current = focusBottom;
    };
    element.addEventListener("scroll", eventHandler);
    return () => element.removeEventListener("scroll", eventHandler);
  }, [containerRef]);

  return (
    <Stack
      ref={containerRef}
      flex={1}
      p={1}
      spacing={1}
      sx={{ overflowY: "auto" }}
      component="div"
    >
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
