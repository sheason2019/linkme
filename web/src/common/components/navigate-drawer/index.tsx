import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { atom, useRecoilState } from "recoil";

export interface INavigateDrawer {
  open: boolean;
}

const navigateDrawerState = atom<INavigateDrawer>({
  key: "common/navigate-drawer",
  default: {
    open: false,
  },
});

export const useNavigateDrawer = () => {
  const [drawer, setDrawer] = useRecoilState(navigateDrawerState);

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

const NavigateDrawer = () => {
  const { drawer, handleCloseDrawer } = useNavigateDrawer();

  return (
    <Drawer anchor="left" open={drawer.open} onClose={handleCloseDrawer}>
      <List sx={{ width: 300 }}>
        <ListSubheader>功能菜单</ListSubheader>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="即时通讯" />
          </ListItemButton>
        </List>
      </List>
    </Drawer>
  );
};

export default NavigateDrawer;
