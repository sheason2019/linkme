import { useEffect, useRef } from "react";
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
import useMessageUpdater from "./use-message-updater";
import { useKickoutDialog } from "../components/kickout-dialog";
import useUserInfo from "../../../common/hooks/use-user-info";

let socketRef: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
let socketUserId: number | undefined;

const useSocket = () => {
  const navigate = useNavigate();

  const { userInfo } = useUserInfo();
  const {
    chat,
    handleSetSequence,
    handleSetLoadingSequence,
    setChat,
    handleSetConversation,
    handleCloseCurrentConversation,
  } = useChat();
  const { handler, strHandler } = useErrorHandler();
  const {
    handleUpdateMessage,
    handleGetMessages,
    handleClearMessages,
    handleClearMarkMessage,
  } = useMessageUpdater();
  const { handleOpen } = useKickoutDialog();

  // 这里使用chatRef是因为React的重渲染会导致socket定义的事件无法获取到最新上下文中的chat
  const chatRef = useRef(chat);
  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  const initSocket = () => {
    if (!!socketRef) return;

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
        strHandler("登录失败");
        socket.close();
      }
    });
    socket.on("sequenceItem", (sequence) => {
      handleSetLoadingSequence(false);
      handleSetSequence(sequence);
    });
    socket.on("syncSequenceItem", () => {
      socket.emit("sequenceItem");
    });
    socket.on("error", (err) => {
      strHandler(err);
    });
    socket.on("postMessage", (msg, convId, mark) => {
      const chat = chatRef.current;
      if (convId === chat.currentConv?.Id) {
        handleClearMarkMessage(mark);
        handleUpdateMessage([msg]);
        setChat((prev) => ({ ...prev, messages: handleGetMessages() }));
      }
    });
    socket.on("messages", (convId, messages, hasMore) => {
      const chat = chatRef.current;
      if (convId === chat.currentConv?.Id) {
        handleUpdateMessage(messages);
        setChat((prev) => ({ ...prev, messages: handleGetMessages() }));
        socket.emit("checkedMessage", convId);
        if (hasMore === true || hasMore === false) {
          setChat((prev) => ({ ...prev, hasMoreMessage: hasMore }));
        }
      }
    });
    socket.on("kickout", (membersId, convId, isCurrent) => {
      const chat = chatRef.current;

      if (membersId.indexOf(chat.currentMemberId!) !== -1 || isCurrent) {
        handleOpen(convId);
        return;
      }

      handleGetConversationById(convId);
    });
    socket.on("enterConversation", (convId) => {
      setChat((prev) => ({ ...prev, socketConvId: convId }));
    });
    socket.on("leaveConversation", () => {
      setChat((prev) => ({ ...prev, socketConvId: undefined }));
    });

    socket.connect();

    socketRef = socket;
    socketUserId = userInfo.user?.UserId;
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
      TimeStamp: Math.floor(new Date().getTime() / 1000),
      Mark: randomString(64),

      CurrentCheckedCount: 0,
      TargetCheckedCount: 0,

      MemberId: chat.currentMemberId ?? 0,
    };
    handleUpdateMessage([message]);
    setChat((prev) => ({ ...prev, messages: handleGetMessages() }));

    // 向Socket发送信息
    socket.emit("postMessage", message.Content, convId, message.Mark!);
  };

  const handlePullMessage = (convId: number) => {
    socketRef?.emit("messages", convId);
  };
  const handlePullMoreMessage = () => {
    socketRef?.emit("messages", chat.currentConv?.Id ?? 0, chat.messages[0].Id);
  };

  const handleToConversation = async (convId: number) => {
    navigate(APP_URLS.CHAT_URL);
    socketRef?.emit("enterConversation", convId);
    handleClearMessages();
    handlePullMessage(convId);
    setChat((prev) => ({ ...prev, messages: [] }));

    await handleGetConversationById(convId);
  };

  const handleGetConversationById = async (convId: number) => {
    const client = getChatClient();
    const [err, res] = await client.GetConversationById(convId);
    if (err) {
      handler(err);
      return;
    }

    handleSetConversation(res);
  };

  const handleLeaveConversation = () => {
    socketRef?.emit("leaveConversation");
    handleCloseCurrentConversation();
  };

  const handlePullSequence = () => {
    socketRef?.emit("sequenceItem");
  };

  const handleDeleteSequence = async (convId: number) => {
    const client = getChatClient();
    const [err] = await client.DeleteSequenceItem(convId);

    if (err) {
      handler(err);
      return;
    }

    handlePullSequence();
  };

  useEffect(() => {
    if (!userInfo.user?.UserId) return;

    if (!socketRef) {
      initSocket();
    } else if (userInfo.user.UserId !== socketUserId) {
      initSocket();
    }
  }, [userInfo.user?.UserId]);

  return {
    socket: socketRef,
    handlePostMessage,
    handleToConversation,
    handlePullMessage,
    handlePullMoreMessage,
    handlePullSequence,
    handleLeaveConversation,
    handleGetConversationById,
    handleDeleteSequence,
  };
};

export default useSocket;
