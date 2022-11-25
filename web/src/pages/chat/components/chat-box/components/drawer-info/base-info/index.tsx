import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getChatClient } from "../../../../../../../api-client";
import useErrorHandler from "../../../../../../../common/hooks/use-error-handler";
import useChat from "../../../../../hooks/use-chat";
import useSocket from "../../../../../hooks/use-socket";
import InfoPanel from "../../info-panel";
import RowStack from "../../row-stack";

export interface WithOwner {
  isOwner: boolean;
}

const BaseInfo: FC<WithOwner> = ({ isOwner }) => {
  const { handler } = useErrorHandler();
  const { chat } = useChat();
  const { handleGetConversationById, handlePullSequence } = useSocket();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(chat.currentConv?.Name ?? "");
  }, [open]);

  const handleSubmit = async () => {
    const client = getChatClient();

    const [err] = await client.PutGroupName(chat.currentConv?.Id!, inputValue);
    if (err) {
      handler(err);
      return;
    }

    await handleGetConversationById(chat.currentConv?.Id!);
    await handlePullSequence();

    handleClose();
  };

  return (
    <>
      <Box>
        <RowStack>
          <Typography variant="h6">基本信息</Typography>
          {isOwner && <Button onClick={handleOpen}>编辑</Button>}
        </RowStack>
        <InfoPanel label="群组名称" value={chat.currentConv?.Name} />
      </Box>
      <Dialog
        open={open}
        sx={{ zIndex: 10020 }}
        maxWidth="xs"
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>编辑群组信息</DialogTitle>
        <DialogContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 1 }}>
            <Typography sx={{ width: "6rem" }}>群组名称</Typography>
            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              size="small"
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit}>提交</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BaseInfo;
