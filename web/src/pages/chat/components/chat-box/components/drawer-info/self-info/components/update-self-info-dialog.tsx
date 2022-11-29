import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { getChatClient } from "../../../../../../../../api-client";
import useErrorHandler from "../../../../../../../../common/hooks/use-error-handler";
import useChat from "../../../../../../hooks/use-chat";

interface IProps {
  open: boolean;
  onClose: () => any;
}

const UpdateSelfInfoDialog: FC<IProps> = ({ open, onClose }) => {
  const { handler } = useErrorHandler();
  const { chat } = useChat();

  const currentMember = useMemo(() => {
    return chat.memberMap.get(chat.currentMemberId!);
  }, [chat.currentConv]);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    handleReset();
  }, [open]);

  const handleReset = () => setInputValue(currentMember?.Nickname ?? "");

  const handleSubmit = async () => {
    const client = getChatClient();

    const [err] = await client.PutMemberNickname(
      chat.currentConv!.Id,
      inputValue
    );

    err && handler(err);

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>修改个人群成员信息</DialogTitle>
      <DialogContent>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 1 }}>
          <Typography sx={{ width: "6rem" }}>群昵称</Typography>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="在此处输入群昵称"
            size="small"
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset}>重置</Button>
        <Button variant="contained" onClick={handleSubmit}>
          提交
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateSelfInfoDialog;
