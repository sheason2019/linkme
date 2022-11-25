import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { atom, useRecoilState } from "recoil";
import { TabContext } from "@mui/lab";
import { useEffect, useState } from "react";
import _ from "lodash";
import { User } from "../../../../../api-lib/account-client";
import { getAccountClient } from "../../../../../api-client";
import useErrorHandler from "../../../../hooks/use-error-handler";
import { OmiError } from "@omi-stack/omi-client/dist/typings";
import UserTabPanel from "../user-tab-panel";

export enum SearchTabs {
  Composite = "综合",
  User = "用户",
}

interface IDialogState {
  open: boolean;
}

interface ISearchData {
  searchText: string;
  users: User[];
  hasMore: boolean;
}

const searchDialogState = atom<IDialogState>({
  key: "common/search-dialog",
  default: {
    open: false,
  },
});

const debouncedFindUserByUsername = _.debounce(
  async (
    username: string,
    offset: number,
    setData: React.Dispatch<React.SetStateAction<ISearchData>>,
    handler: (err: OmiError) => void,
    setLoading: (loading: boolean) => any
  ) => {
    if (username.length === 0) return;

    const client = getAccountClient();

    setLoading(true);
    const [err, res] = await client.GetUsersByUsername(username, offset);
    setLoading(false);

    if (err) {
      handler(err);
      return;
    }
    setData((prev) => ({
      ...prev,
      users: [...prev.users, ...res.Users],
      hasMore: res.HasMore,
    }));
  },
  1000,
  {
    trailing: true,
  }
);

export const useSearchDialog = () => {
  const [value, setValue] = useState<SearchTabs>(SearchTabs.User);
  const [dialog, setDialog] = useRecoilState(searchDialogState);
  const handleOpen = () => setDialog({ open: true });
  const handleClose = () => setDialog({ open: false });

  return {
    dialog,
    value,
    setValue,
    setDialog,
    handleOpen,
    handleClose,
  };
};

const SearchDialog = () => {
  const { handler } = useErrorHandler();
  const { dialog, handleClose, value } = useSearchDialog();

  const [data, setData] = useState<ISearchData>({
    searchText: "",
    users: [],
    hasMore: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // 设置搜索字符串
    setData({ searchText: e.target.value, users: [], hasMore: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      debouncedFindUserByUsername(
        data.searchText,
        data.users.length,
        setData,
        handler,
        setLoading
      );
    };
    fetchData();
  }, [data.searchText]);

  return (
    <Dialog open={dialog.open} fullWidth onClose={handleClose}>
      <TabContext value={value}>
        <DialogContent>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              onChange={handleChange}
              value={data.searchText}
              placeholder="输入内容以搜索……"
            />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Tabs value={value}>
            {/* <Tab value={SearchTabs.Composite} label="综合" /> */}
            <Tab value={SearchTabs.User} label="用户" />
          </Tabs>
          <UserTabPanel users={data.users} />
        </DialogContent>
      </TabContext>
    </Dialog>
  );
};

export default SearchDialog;
