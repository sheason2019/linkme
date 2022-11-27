import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { getChatClient } from "../../../../../../../../../api-client";
import { User } from "../../../../../../../../../api-lib/account-client";
import useErrorHandler from "../../../../../../../../../common/hooks/use-error-handler";
import useChat from "../../../../../../../hooks/use-chat";
import { handleSearchUser } from "../../../../../../create-group-dialog";
import FormItem from "../../../../../../create-group-dialog/components/form-item";
import UserSelector from "../../../../../../create-group-dialog/components/user-option";

interface IProps {
  open: boolean;
  onClose: () => any;
}

const InviteMemberDialog: FC<IProps> = ({ open, onClose }) => {
  const { chat } = useChat();

  const { handler, strHandler } = useErrorHandler();

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchWord, setSearchWord] = useState<string | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [options, setOptions] = useState<User[]>([]);

  const initUserSet = () =>
    new Set(
      chat.currentConv?.Members.filter((member) => !member.Removed).map(
        (member) => member.UserId
      )
    );

  const userSet = useRef<Set<number>>(initUserSet());

  const handleAddUser = (user: User) => {
    if (userSet.current.has(user.UserId)) {
      strHandler("邀请的用户已存在");
      return;
    }
    userSet.current.add(user.UserId);
    setUserList((prev) => [...prev, user]);
    inputRef.current?.blur();
  };

  const handleRemoveUser = (userId: number) => {
    if (!userSet.current.has(userId)) {
      return;
    }
    setUserList((prev) => prev.filter((user) => user.UserId !== userId));
    userSet.current.delete(userId);
  };

  const handleClearUser = () => {
    setUserList([]);
    userSet.current = initUserSet();
  };

  useEffect(() => {
    handleSearchUser(searchWord ?? "", setOptions, handler);
  }, [searchWord]);

  useEffect(() => {
    handleClearUser();
  }, [open]);

  const handleSubmit = async () => {
    const client = getChatClient();

    const [err, _] = await client.PutMembers(
      chat.currentConv!.Id,
      userList.map((user) => user.UserId)
    );

    if (err) {
      handler(err);
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ zIndex: 1020 }} fullWidth>
      <DialogTitle>邀请群组成员</DialogTitle>
      <DialogContent>
        <FormItem
          label="群组名称"
          error=""
          element={
            <TextField
              disabled
              value={chat.currentConv?.Name}
              fullWidth
              size="small"
            />
          }
        />
        <FormItem
          label="搜索用户"
          error=""
          element={
            <Autocomplete
              options={options}
              renderOption={(props, option: User) => (
                <Box component="li" key={option.UserId} {...props}>
                  <UserSelector
                    user={option}
                    exist={userSet.current.has(option.UserId)}
                  />
                </Box>
              )}
              getOptionLabel={(option: User) => option.Username}
              onChange={(_, user) => {
                user && handleAddUser(user);
              }}
              inputValue={searchWord ?? ""}
              onInputChange={(_, v) => setSearchWord(v)}
              isOptionEqualToValue={(option, value) =>
                option.UserId === value.UserId
              }
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField inputRef={inputRef} {...params} />
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
              {userList.map((user) => (
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
                  <UserSelector
                    onClose={() => handleRemoveUser(user.UserId)}
                    user={user}
                  />
                </Box>
              ))}
            </Box>
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearUser}>重置</Button>
        <Button onClick={handleSubmit}>确认</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteMemberDialog;
