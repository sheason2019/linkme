import {
  Box,
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
import useErrorHandler from "../../../../hooks/use-error-handler";
import UserTabPanel from "../user-tab-panel";
import LoadingPanel from "../loading-panel";
import {
  debouncedFindGroupByName,
  debouncedFindUserByUsername,
} from "../../lambda";
import { IDialogState, SearchTabs, ISearchData } from "../../typings";

import _ from "lodash";
import GroupTabPanel from "../group-tab-panel";

const searchDialogState = atom<IDialogState>({
  key: "common/search-dialog",
  default: {
    open: false,
  },
});

export const useSearchDialog = () => {
  const [tab, setTab] = useState<SearchTabs>(SearchTabs.User);
  const [dialog, setDialog] = useRecoilState(searchDialogState);
  const handleOpen = () => setDialog({ open: true });
  const handleClose = () => setDialog({ open: false });

  return {
    dialog,
    tab,
    setTab,
    setDialog,
    handleOpen,
    handleClose,
  };
};

const SearchDialog = () => {
  const { handler } = useErrorHandler();
  const { dialog, handleClose, tab, setTab } = useSearchDialog();

  const [data, setData] = useState<ISearchData>({
    searchText: "",
    users: [],
    groups: [],
    hasMore: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // 设置搜索字符串
    setData((prev) => ({
      ...prev,
      searchText: e.target.value,
      hasMore: false,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (tab === SearchTabs.User) {
        debouncedFindUserByUsername(
          data.searchText,
          0,
          setData,
          handler,
          setLoading
        );
      }
      if (tab === SearchTabs.Group) {
        debouncedFindGroupByName(
          data.searchText,
          0,
          setData,
          handler,
          setLoading
        );
      }
    };
    if (data.searchText.length > 0) fetchData();
  }, [data.searchText, tab]);

  return (
    <Dialog open={dialog.open} fullWidth onClose={handleClose}>
      <TabContext value={tab}>
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
          <Tabs value={tab} onChange={(_, tab) => setTab(tab)}>
            {/* <Tab value={SearchTabs.Composite} label="综合" /> */}
            <Tab value={SearchTabs.User} label="用户" />
            <Tab value={SearchTabs.Group} label="群组" />
          </Tabs>
          <Box sx={{ height: 280 }}>
            {loading ? (
              <LoadingPanel />
            ) : (
              <>
                <UserTabPanel users={data.users} />
                <GroupTabPanel groups={data.groups} />
              </>
            )}
          </Box>
        </DialogContent>
      </TabContext>
    </Dialog>
  );
};

export default SearchDialog;
