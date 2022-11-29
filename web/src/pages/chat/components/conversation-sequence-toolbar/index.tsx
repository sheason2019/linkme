import {
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Box,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMemo, useRef, useState } from "react";
import CreateGroupDialog from "../create-group-dialog";
import useCreateGroupConversation from "../../hooks/use-create-group-conversation";
import useChat, { OnlineStatus } from "../../hooks/use-chat";

const ConversationSequenceToolbar = () => {
  const { chat } = useChat();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { handleOpenDialog } = useCreateGroupConversation();

  const chipColor = useMemo(() => {
    if (chat.online === OnlineStatus.Login) {
      return "success";
    }
    if (chat.online === OnlineStatus.Offline) {
      return "secondary";
    }
    return "primary";
  }, [chat.online]);

  return (
    <>
      <Toolbar sx={{ display: "flex" }}>
        <Typography variant="body2">消息列表</Typography>
        <Box sx={{ flex: 1, ml: 2 }}>
          <Chip
            sx={{ width: "4rem" }}
            label={chat.online}
            size="small"
            color={chipColor}
          />
        </Box>
        <IconButton ref={buttonRef} onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Menu
        anchorEl={buttonRef.current}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem onClick={handleOpenDialog}>创建群组</MenuItem>
      </Menu>
      <CreateGroupDialog />
    </>
  );
};

export default ConversationSequenceToolbar;
