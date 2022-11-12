import { AccountClient } from "../api-lib/account-client";

export const getAccountClient = () => {
  const client = new AccountClient("/api");

  return client;
};
