import { Stack, Toolbar, Divider, Box, IconButton } from "@mui/material";
import useChat from "../../hooks/use-chat";
import useEditor from "../../hooks/use-editor";
import useSocket from "../../hooks/use-socket";
import Messages from "../messages";

import MenuIcon from "@mui/icons-material/Menu";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import GroupMenuDrawer, {
  useGroupMenuDrawer,
} from "./components/group-menu-drawer";

import MessageInput from "./components/message-input";

const ChatBox = () => {
  const { chat } = useChat();
  const { handleLeaveConversation } = useSocket();
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
          <IconButton sx={{ mr: 1 }} onClick={handleLeaveConversation}>
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
        {/* <Box sx={{ height: 36 }} /> */}
        <MessageInput onSend={handleSend} />
      </Stack>
      <GroupMenuDrawer />
    </>
  );
};

export default ChatBox;
