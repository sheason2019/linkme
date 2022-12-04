import { AdminClient } from "../api-lib/admin-client";

export const getAdminClient = () => {
  return new AdminClient("/api");
};
