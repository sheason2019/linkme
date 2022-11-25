import { OmiError } from "@omi-stack/omi-client/dist/typings";
import _ from "lodash";
import { getAccountClient, getChatClient } from "../../../api-client";
import { ISearchData } from "./typings";

export const debouncedFindUserByUsername = _.debounce(
  async (
    username: string,
    offset: number,
    setData: React.Dispatch<React.SetStateAction<ISearchData>>,
    handler: (err: OmiError) => void,
    setLoading: (loading: boolean) => any
  ) => {
    const client = getAccountClient();

    const [err, res] = await client.GetUsersByUsername(username, offset);
    setLoading(false);

    if (err) {
      handler(err);
      return;
    }
    setData((prev) => ({
      ...prev,
      users: res.Users,
      hasMore: res.HasMore,
    }));
  },
  1000,
  {
    trailing: true,
  }
);

export const debouncedFindGroupByName = _.debounce(
  async (
    searchText: string,
    offset: number,
    setData: React.Dispatch<React.SetStateAction<ISearchData>>,
    handler: (err: OmiError) => void,
    setLoading: (loading: boolean) => any
  ) => {
    const client = getChatClient();

    const [err, res] = await client.GetGroup(searchText, offset);
    setLoading(false);

    if (err) {
      handler(err);
      return;
    }
    setData((prev) => ({
      ...prev,
      groups: res.Groups,
      hasMore: res.HasMore,
    }));
  },
  1000,
  {
    trailing: true,
  }
);
