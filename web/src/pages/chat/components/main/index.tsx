import {
  Box,
  Button,
  Divider,
  ListSubheader,
  Stack,
  Toolbar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useChat from "../../hooks/use-chat";
import ConversationSequence from "../conversation-sequence";
import Editor from "../editor";
import useEditor from "../../hooks/use-editor";
import Messages from "../messages";

const Main = () => {
  const { chat, handlePostMessage } = useChat();
  const { handleClearContent, handleGetContent } = useEditor();

  const handleSend = () => {
    const content = handleGetContent();
    console.log(content);
    handlePostMessage(content);

    handleClearContent();
  };

  return (
    <Stack
      flex={1}
      flexDirection="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Stack sx={{ width: 300, flexShrink: 0 }}>
        <ListSubheader>消息列表</ListSubheader>
        <ConversationSequence />
      </Stack>
      <Stack flex={1} alignItems="stretch">
        <Toolbar>会话ID - {chat.currentConv?.Id}</Toolbar>
        <Divider />
        <Messages />
        <Divider />
        <Stack sx={{ height: 280 }} divider={<Divider flexItem />}>
          <Box sx={{ height: 36 }} />
          <Editor />
          <Box sx={{ py: 1, px: 2, textAlign: "right" }}>
            <Button
              onClick={handleSend}
              variant="contained"
              endIcon={<SendIcon />}
            >
              发送
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Main;
