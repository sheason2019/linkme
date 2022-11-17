import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import useChat, { ViewMessage } from ".";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../../../../socket/shared/socket";
import useErrorHandler from "../../../common/hooks/use-error-handler";
import JwtProxy from "../../../common/utils/jwt";
import md5 from "js-md5";
import randomString from "../../../common/utils/random-string";

const useSocket = () => {
  const { handleSetSequence } = useChat();
  const { strHandler } = useErrorHandler();

  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

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
    socket.on("login", (success) => {
      if (success) {
        socket.emit("sequenceItem");
      } else {
        socket.close();
      }
    });
    socket.on("sequenceItem", (sequence) => {
      console.log(sequence);
      handleSetSequence(sequence);
    });
    socket.on("error", (err) => {
      strHandler(err);
    });
    socket.on("postMessage", (contentMd5) => {});

    socket.connect();

    socketRef.current = socket;
  };

  const handlePostMessage = (message: ViewMessage, convId: number) => {
    const socket = socketRef.current;
    // 如果Socket实例不存在就不执行
    if (!socket) return;

    socket.emit("postMessage", message.Content, convId, message.Mark!);
  };

  useEffect(() => {
    if (!socketRef.current) initSocket();
  }, []);

  return {
    handlePostMessage,
  };
};

export default useSocket;
