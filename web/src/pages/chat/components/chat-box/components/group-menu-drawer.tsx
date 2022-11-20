import { Box, Drawer, Grid, Typography } from "@mui/material";
import { atom, useRecoilState } from "recoil";
import useChat from "../../../hooks/use-chat";
import GroupMembers from "./group-members";
import InfoPanel from "./info-panel";

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

  return (
    <Drawer anchor="right" open={drawer.open} onClose={handleCloseDrawer}>
      <Box sx={{ width: 380, p: 2 }}>
        <Typography variant="h5">群组信息</Typography>
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
