import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { atom, useRecoilState } from "recoil";
import { useCheckMobile } from "../../../../../common/hooks/use-check-mobile";
import useChat from "../../../hooks/use-chat";
import GroupMembers from "./group-members";
import InfoPanel from "./info-panel";
import CloseIcon from "@mui/icons-material/Close";

interface IDrawerState {
  open: boolean;
}

const groupMenuDrawerState = atom<IDrawerState>({
  key: "chat/group-menu-drawer",
  default: {
    open: false,
  },
});

export const useGroupMenuDrawer = () => {
  const [drawer, setDrawer] = useRecoilState(groupMenuDrawerState);

  const handleOpenDrawer = () => {
    setDrawer({ open: true });
  };
  const handleCloseDrawer = () => {
    setDrawer({ open: false });
  };

  return {
    drawer,
    setDrawer,

    handleOpenDrawer,
    handleCloseDrawer,
  };
};

const GroupMenuDrawer = () => {
  const { chat } = useChat();
  const { drawer, handleCloseDrawer } = useGroupMenuDrawer();

  const { isMobile } = useCheckMobile();

  return (
    <Drawer
      sx={{ zIndex: 10001 }}
      anchor="right"
      open={drawer.open}
      onClose={handleCloseDrawer}
    >
      <Box
        sx={{ width: isMobile ? "100vw" : 380, p: 2, boxSizing: "border-box" }}
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="h5" sx={{ flex: 1 }}>
            群组信息
          </Typography>
          <IconButton onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box sx={{ height: "8px" }} />
        <InfoPanel label="群组名称" value={chat.currentConv?.Name} />
        <Box sx={{ height: "8px" }} />
        <Typography>群组成员</Typography>
        <GroupMembers />
      </Box>
    </Drawer>
  );
};

export default GroupMenuDrawer;
