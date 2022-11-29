import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../../../api-lib/account-client";
import useCreateGroupConversation from "../../hooks/use-create-group-conversation";
import FormItem from "./components/form-item";
import _ from "lodash";
import useErrorHandler from "../../../../common/hooks/use-error-handler";
import { getAccountClient } from "../../../../api-client";
import { OmiError } from "@omi-stack/omi-client/dist/typings";
import UserOption from "./components/user-option";
import useUserInfo from "../../../../common/hooks/use-user-info";

export const handleSearchUser = _.debounce(
  async (
    searchWord: string,
    setOptions: React.Dispatch<React.SetStateAction<User[]>>,
    handler: (err: OmiError) => void
  ) => {
    const client = getAccountClient();
    const [err, res] = await client.GetUsersByUsername(searchWord, 0);
    if (err) {
      handler(err);
      return;
    }

    setOptions(res.Users);
  },
  750,
  {
    trailing: true,
  }
);

const CreateGroupDialog = () => {
  const { userInfo } = useUserInfo();

  const { handler } = useErrorHandler();
  const {
    createGroupState,
    handleCloseDialog,
    resetForm,
    handleSubmit,
    handleAddGroupMember,
    handleChangeGroupName,
    handleRemoveGroupMember,
  } = useCreateGroupConversation();

  // 当Form的开闭状态发生变化时，重置表单
  useEffect(() => {
    resetForm();
  }, [createGroupState.dialog.open]);

  // 搜索用户的关键词State
  const [searchWord, setSearchWord] = useState("");
  // 搜索用户的可选项
  const [options, setOptions] = useState<User[]>([]);

  useEffect(() => {
    handleSearchUser(searchWord, setOptions, handler);
  }, [searchWord, setOptions]);

  if (!userInfo.user) return null;

  return (
    <Box component="form">
      <Dialog
        open={createGroupState.dialog.open}
        fullWidth
        onClose={handleCloseDialog}
      >
        <DialogTitle>创建群聊</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={1}>
            <FormItem
              label="群组名称"
              error=""
              element={
                <TextField
                  value={createGroupState.form.groupName}
                  onChange={(e) => handleChangeGroupName(e.target.value)}
                  fullWidth
                  size="small"
                />
              }
            />
            <FormItem
              label="群组成员"
              error=""
              element={
                <Autocomplete
                  options={options}
                  renderOption={(props, option: User) => (
                    <Box component="li" key={option.UserId} {...props}>
                      <UserOption user={option} />
                    </Box>
                  )}
                  getOptionLabel={(option: User) => option.Username}
                  onChange={(_, user) => {
                    user && handleAddGroupMember(user);
                  }}
                  inputValue={searchWord}
                  onInputChange={(_, v) => setSearchWord(v)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                />
              }
            />
            <FormItem
              label="成员列表"
              error=""
              element={
                <Box
                  sx={{
                    border: "1px solid lightgray",
                    minHeight: "6rem",
                    maxHeight: "20rem",
                    overflowY: "auto",
                    borderRadius: 1,
                  }}
                >
                  {[userInfo.user!, ...createGroupState.form.userList].map(
                    (user) => (
                      <Box
                        sx={{
                          p: 1,
                          ":hover": {
                            backgroundColor: "whitesmoke",
                            cursor: "pointer",
                          },
                        }}
                        key={user.UserId}
                      >
                        <UserOption
                          onClose={() => handleRemoveGroupMember(user.UserId)}
                          user={user}
                        />
                      </Box>
                    )
                  )}
                </Box>
              }
            />
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={resetForm}>重置</Button>
          <Button variant="contained" onClick={handleSubmit}>
            提交
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateGroupDialog;
