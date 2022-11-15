import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import useChat from ".";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../../../../socket/shared/socket";
import useErrorHandler from "../../../common/hooks/use-error-handler";
import JwtProxy from "../../../common/utils/jwt";

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

    socket.connect();

    socketRef.current = socket;
  };

  useEffect(() => {
    if (!socketRef.current) initSocket();
  }, []);
};

export default useSocket;