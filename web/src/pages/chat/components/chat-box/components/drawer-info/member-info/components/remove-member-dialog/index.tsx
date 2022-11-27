import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { getChatClient } from "../../../../../../../../../api-client";
import { MessageMember } from "../../../../../../../../../api-lib/chat-client";
import LinkmeAvatar from "../../../../../../../../../common/components/linkme-avatar";
import useErrorHandler from "../../../../../../../../../common/hooks/use-error-handler";

interface IRemoveMemberDialog {
  open: boolean;
  onClose: () => any;
  member?: MessageMember;
}

const RemoveMemberDialog: FC<IRemoveMemberDialog> = ({
  open,
  member,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { handler } = useErrorHandler();

  const handleRemoveMember = async () => {
    if (!member) return;

    const client = getChatClient();
    const [err] = await client.DeleteMembers([member?.MemberId]);
    if (err) {
      handler(err);
      return;
    }

    enqueueSnackbar("删除群组成员成功", { variant: "success" });
    onClose();
  };

  return (
    <Dialog
      open={open}
      sx={{ zIndex: 1020 }}
      maxWidth="xs"
      fullWidth
      onClose={onClose}
    >
      <DialogTitle>正在移除会话成员</DialogTitle>
      <DialogContent>
        <Typography>即将移除群聊中的会话成员</Typography>
        <ListItem sx={{ background: "#ECECEC", borderRadius: 2, mt: 1 }}>
          <ListItemAvatar>
            <LinkmeAvatar sourceHash={member?.AvatarUrl} />
          </ListItemAvatar>
          <ListItemText>{member?.Name}</ListItemText>
        </ListItem>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" color="error" onClick={handleRemoveMember}>
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveMemberDialog;
