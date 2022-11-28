import {
  Stack,
  Toolbar,
  Divider,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from "@mui/icons-material/Group";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import useChat from "../../hooks/use-chat";
import useEditor from "../../hooks/use-editor";
import useSocket from "../../hooks/use-socket";
import Messages from "../messages";
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
          <Stack
            direction="row"
            sx={{ flex: 1 }}
            spacing={1}
            alignItems="center"
          >
            <Typography>{chat.currentConv?.Name}</Typography>
            {isGroup && (
              <Typography color="GrayText" fontSize="0.8rem">
                <GroupIcon sx={{ width: "1rem", height: "1rem" }} />
                {chat.currentConv?.MemberCount}
              </Typography>
            )}
          </Stack>
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
