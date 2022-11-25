import { Drawer, IconButton, Stack, Typography } from "@mui/material";
import { atom, useRecoilState } from "recoil";
import { useCheckMobile } from "../../../../../common/hooks/use-check-mobile";
import useChat from "../../../hooks/use-chat";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo } from "react";
import BaseInfo from "./drawer-info/base-info";
import MemberInfo from "./drawer-info/member-info";
import SelfInfo from "./drawer-info/self-info";

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
  const isOwner = useMemo(() => {
    const currentMember = chat.currentConv?.Members.find(
      (item) => item.MemberId === chat.currentMemberId
    );
    return currentMember?.Type === "owner";
  }, [chat.currentMemberId, chat.currentConv?.Members]);

  return (
    <Drawer
      sx={{ zIndex: 10001 }}
      anchor="right"
      open={drawer.open}
      onClose={handleCloseDrawer}
    >
      <Stack
        sx={{ width: isMobile ? "100vw" : 380, p: 2, boxSizing: "border-box" }}
        spacing={2}
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="h5" sx={{ flex: 1 }}>
            群组信息
          </Typography>
          <IconButton onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <BaseInfo isOwner={isOwner} />
        <MemberInfo isOwner={isOwner} />
        <SelfInfo />
      </Stack>
    </Drawer>
  );
};

export default GroupMenuDrawer;
