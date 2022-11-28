import { Box, Stack } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import CustomLink from "../../../../common/components/custom-link";
import useChat from "../../hooks/use-chat";
import useSocket from "../../hooks/use-socket";
import Message from "../message";
import TimeStamp from "../time-stamp";
import UncheckBubble from "./components/uncheck-bubble";

const Messages = () => {
  const { chat } = useChat();
  const { handlePullMoreMessage } = useSocket();

  // 是否需要锁定在聊天信息的最底部
  const focusBottomRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  // 已阅览的最后一条消息
  const [maxMessageId, setMaxMessageId] = useState(0);

  const lastMessageId = useMemo(
    () => chat.messages[chat.messages.length - 1]?.Id ?? 0,
    [chat.messages]
  );

  const handleToBottom = (element: HTMLDivElement | null) => {
    if (!element) return;

    element.scrollTo({ top: element.scrollHeight });
  };

  useEffect(() => {
    // 当用户切换房间后，自动将聊天内容锁定在页面的最底部
    focusBottomRef.current = true;
  }, [chat.currentConv?.Id]);

  useEffect(() => {
    // 切换房间后将已阅览的消息ID设置为此时的最后一条消息
    if (focusBottomRef.current) {
      setMaxMessageId(lastMessageId);
    }
  }, [setMaxMessageId, lastMessageId, focusBottomRef]);

  if (focusBottomRef.current) {
    handleToBottom(containerRef.current);
  }

  // 当页面滚动到最底部时，将focusBottomRef设置为true，否则设置为false
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const eventHandler = (e: Event) => {
      const el = e.target as HTMLDivElement;
      const focusBottom = el.scrollTop + el.offsetHeight + 4 > el.scrollHeight;
      // 当绑定底部状态从是切换到否的时候，记录此时已阅览的最后一条消息的ID
      if (focusBottomRef.current && !focusBottom) {
        setMaxMessageId(lastMessageId);
      }

      focusBottomRef.current = focusBottom;
    };
    element.addEventListener("scroll", eventHandler);
    return () => element.removeEventListener("scroll", eventHandler);
  }, [containerRef, chat]);

  // React Event遗留问题，用Ref包一下让IntersectionObservable能拿到最新的值
  const maxMessageIdRef = useRef(maxMessageId);
  useEffect(() => {
    maxMessageIdRef.current = maxMessageId;
  }, [maxMessageId]);

  const ioRef = useRef(
    new IntersectionObserver((entries) => {
      let nextMessageId = maxMessageIdRef.current;
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.25) {
          const messageId =
            Number(entry.target.getAttribute("attr-message-id")) ?? 0;
          if (messageId > nextMessageId) {
            nextMessageId = messageId;
          }

          ioRef.current.unobserve(entry.target);
        }
      });
      setMaxMessageId(nextMessageId);
    })
  );

  const { uncheckedCount, uncheckedMsgId } = useMemo(() => {
    if (maxMessageId === 0) return { uncheckedCount: 0, uncheckedMsgId: 0 };

    let count = 0;
    // 最早未查阅的消息ID
    let uncheckedMsgId = 0;

    for (let i = chat.messages.length - 1; i > -1; i--) {
      if (chat.messages[i].Id > maxMessageId) {
        count++;
      } else {
        if (i !== chat.messages.length - 1) {
          uncheckedMsgId = chat.messages[i + 1].Id;
        }
        break;
      }
    }
    return { uncheckedCount: count, uncheckedMsgId };
  }, [chat.messages, maxMessageId]);

  // 直接用原生方法来Focus指定的DOM，虽然有点Hack，但Ref的实现方式太绕了
  const handleFocusMessage = (messageId: number) => {
    const domId = `message-${messageId}`;

    const el = document.getElementById(domId);

    if (!el) return;

    containerRef.current?.scrollTo({ top: el.offsetTop });
  };

  return (
    <Stack flex={1} sx={{ overflow: "hidden", position: "relative" }}>
      <Stack
        ref={containerRef}
        p={1}
        spacing={1}
        flex={1}
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
                sx={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  color: "gray",
                }}
              >
                <TimeStamp timeStamp={item.TimeStamp} />
              </Box>
            )}
            <Message
              message={item}
              io={
                item.Id > maxMessageId && maxMessageId !== 0
                  ? ioRef.current
                  : undefined
              }
            />
          </Box>
        ))}
      </Stack>
      <UncheckBubble
        uncheckedCount={uncheckedCount}
        onClick={() => handleFocusMessage(uncheckedMsgId)}
      />
    </Stack>
  );
};

export default Messages;
