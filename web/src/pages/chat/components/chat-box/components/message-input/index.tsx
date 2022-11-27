import { FC } from "react";

import { Box, Button, Divider, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import Editor from "../../../editor";
import { useCheckMobile } from "../../../../../../common/hooks/use-check-mobile";

interface IProps {
  onSend: () => any;
}

const MessageInput: FC<IProps> = ({ onSend }) => {
  const { isMobile } = useCheckMobile();

  if (!isMobile) {
    return (
      <Stack
        sx={{ height: isMobile ? 140 : 280 }}
        divider={<Divider flexItem />}
      >
        <Editor />
        <Box sx={{ py: 1, px: 2, textAlign: "right" }}>
          <Button onClick={onSend} variant="contained" endIcon={<SendIcon />}>
            发送
          </Button>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" sx={{ p: 1 }} spacing={1}>
      <Box sx={{ flex: 1 }}>
        <Editor />
      </Box>
      <Box sx={{ alignSelf: "end" }}>
        <Button onClick={onSend} variant="contained" endIcon={<SendIcon />}>
          发送
        </Button>
      </Box>
    </Stack>
  );
};

export default MessageInput;
