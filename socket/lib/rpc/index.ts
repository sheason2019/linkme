import fs from "fs";
import randomString from "../utils/random-string";

const RPC_TOKEN_PATH = "/var/linkme/rpc-token";
const RPC_TOKEN_LENGTH = 128;

export const generateRpc = () => {
  const token = randomString(RPC_TOKEN_LENGTH);
  const map = getRpcMap();
  map["socket"] = token;

  setRpcMap(map);
};

export const getRpcMap = (): Record<string, string> => {
  try {
    return JSON.parse(fs.readFileSync(RPC_TOKEN_PATH).toString());
  } catch (e) {
    return {};
  }
};

export const setRpcMap = (obj: Record<string, string>) => {
  fs.writeFileSync(RPC_TOKEN_PATH, JSON.stringify(obj));
};
