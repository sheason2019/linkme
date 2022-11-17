import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import useChat, { ViewMessage } from "./use-chat";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../../../../socket/shared/socket";
import useErrorHandler from "../../../common/hooks/use-error-handler";
import JwtProxy from "../../../common/utils/jwt";
import randomString from "../../../common/utils/random-string";
import { useNavigate } from "react-router-dom";
import { getChatClient } from "../../../api-client";
import { APP_URLS } from "../../../router";

let socketRef: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;

const useSocket = () => {
  const navigate = useNavigate();

  const { chat, handleSetSequence, handleSetLoadingSequence, setChat } =
    useChat();
  const { handler, strHandler } = useErrorHandler();

  const chatRef = useRef(chat);
  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  const initSocket = () => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
    // 连接到Socket以后进行登录
    socket.on("connect", () => {
      const jwt = JwtProxy.getJWT();
      // 如果用户登录信息不存在，直接关闭Socket连接
      if (!jwt) {
        socket.disconnect();
        return;
      }

      // 登录
      socket.emit("login", jwt);
    });
    // 完成登录后，执行下列初始化行为
    socket.on("login", (success) => {
      if (success) {
        handleSetLoadingSequence(true);
        socket.emit("sequenceItem");
      } else {
        socket.close();
      }
    });
    socket.on("sequenceItem", (sequence) => {
      handleSetLoadingSequence(false);
      handleSetSequence(sequence);
    });
    socket.on("error", (err) => {
      strHandler(err);
    });
    socket.on("postMessage", (msg, convId, mark) => {
      const chat = chatRef.current;
      if (convId === chat.currentConv?.Id) {
        let replaced = false;
        // 替换状态为Loading的消息
        const messages = chat.messages.map((item) => {
          if (item.Mark === mark) {
            replaced = true;
            return msg;
          } else {
            return item;
          }
        });
        if (replaced) {
          setChat((prev) => ({ ...prev, messages }));
        } else {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, msg] }));
        }
        console.log(messages);
      }
    });

    socket.connect();

    socketRef = socket;
  };

  const handlePostMessage = (content: string, convId: number) => {
    if (!content) {
      return;
    }

    const socket = socketRef;
    // 如果Socket实例不存在就不执行
    if (!socket) return;

    // 构建本地信息
    const message: ViewMessage = {
      Content: content,
      Id: 0,
      Type: "user-message",
      TimeStamp: 0,
      Mark: randomString(64),

      MemberId: 0,
    };
    setChat((prev) => ({ ...prev, messages: [...prev.messages, message] }));

    // 向Socket发送信息
    socket.emit("postMessage", message.Content, convId, message.Mark!);
  };

  const handleToConversation = async (convId: number) => {
    navigate(APP_URLS.CHAT_URL);
    const client = getChatClient();
    const [err, res] = await client.GetConversationById(convId);
    if (err) {
      handler(err);
      return;
    }

    setChat((prev) => ({ ...prev, currentConv: res }));
    socketRef?.emit("enterConversation", res.Id);
  };

  useEffect(() => {
    if (!socketRef) initSocket();
  }, []);

  return {
    socket: socketRef,
    handlePostMessage,
    handleToConversation,
  };
};

export default useSocket;
