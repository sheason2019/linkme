import {
  Stack,
  Toolbar,
  Divider,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import useChat from "../../hooks/use-chat";
import useEditor from "../../hooks/use-editor";
import useSocket from "../../hooks/use-socket";
import Editor from "../editor";
import Messages from "../messages";

import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import GroupMenuDrawer, {
  useGroupMenuDrawer,
} from "./components/group-menu-drawer";
import { useCheckMobile } from "../../../../common/hooks/use-check-mobile";

const ChatBox = () => {
  const { isMobile } = useCheckMobile();

  const { chat, handleCloseCurrentConversation } = useChat();
  const { handlePostMessage } = useSocket();
  const { handleClearContent, handleGetContent } = useEditor();

  const { handleOpenDrawer } = useGroupMenuDrawer();

  const handleSend = () => {
    const content = handleGetContent();

    chat.currentConv && handlePostMessage(content, chat.currentConv.Id);

    handleClearContent();
  };

  const isGroup = chat.currentConv?.Type === "group";

  return (
    <>
      <Stack flex={1} alignItems="stretch" sx={{ height: "100%" }}>
        <Toolbar>
          <IconButton sx={{ mr: 1 }} onClick={handleCloseCurrentConversation}>
            <NavigateBeforeIcon />
          </IconButton>
          <Box sx={{ flex: 1 }}>{chat.currentConv?.Name}</Box>
          {isGroup && (
            <IconButton onClick={handleOpenDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
        <Divider />
        <Messages />
        <Divider />
        <Stack
          sx={{ height: isMobile ? 140 : 280 }}
          divider={<Divider flexItem />}
        >
          {/* <Box sx={{ height: 36 }} /> */}
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
      <GroupMenuDrawer />
    </>
  );
};

export default ChatBox;
