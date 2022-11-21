import axios from "axios";
import { getRpcMap } from ".";
import { AccountClient } from "../../api-lib/account-client";
import { ChatRpcClient } from "../../api-lib/chat-client";
import { isProduct } from "../../main";

const SERVER_HOST = () =>
  isProduct ? "http://linkme-server:8080" : "http://localhost:8080";

const getAxiosInstance = (jwt?: string) => {
  return axios.create({
    headers: {
      "rpc-token": getRpcMap()["socket"],
      Authorization: jwt ?? "",
    },
  });
};

export const getChatRpcClient = (jwt?: string) => {
  return new ChatRpcClient(SERVER_HOST(), getAxiosInstance(jwt));
};

export const getAccountClient = (jwt?: string) => {
  return new AccountClient(SERVER_HOST(), getAxiosInstance(jwt));
};
