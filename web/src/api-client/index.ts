import axios from "axios";
import { AccountClient } from "../api-lib/account-client";
import { ChatClient } from "../api-lib/chat-client";
import JwtProxy from "../common/utils/jwt";

const getAxiosInstance = () => {
  const instance = axios.create({
    headers: {
      Authorization: JwtProxy.getJWT() ?? "",
    },
  });

  return instance;
};

export const getAccountClient = () => {
  const client = new AccountClient("/api", getAxiosInstance());

  return client;
};

export const getChatClient = () => {
  const client = new ChatClient("/api", getAxiosInstance());

  return client;
};
