import {
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRef, useState } from "react";
import CreateGroupDialog from "../create-group-dialog";
import useCreateGroupConversation from "../../hooks/use-create-group-conversation";

const ConversationSequenceToolbar = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { handleOpenDialog } = useCreateGroupConversation();

  return (
    <>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">消息列表</Typography>
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
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
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
