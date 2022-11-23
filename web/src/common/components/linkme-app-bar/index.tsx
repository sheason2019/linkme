import {
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useMemo } from "react";
import useUserInfo from "../../hooks/use-user-info";
import { useNavigate } from "react-router-dom";
import { APP_URLS } from "../../../router";
import NavigateDrawer, { useNavigateDrawer } from "../navigate-drawer";
import SearchIcon from "@mui/icons-material/Search";
import SearchDialog, { useSearchDialog } from "./components/search-dialog";
import UserAvatarWithMenu from "./components/user-avatar-with-menu";

const LinkmeAppBar = () => {
  const navigate = useNavigate();

  const { handleOpenDrawer } = useNavigateDrawer();
  const { handleOpen } = useSearchDialog();

  const { userInfo } = useUserInfo();

  const actionButton = useMemo(() => {
    if (userInfo.isLogin) {
      return <UserAvatarWithMenu />;
    }
    return (
      <Button color="inherit" onClick={() => navigate(APP_URLS.LOGIN_PAGE_URL)}>
        Login
      </Button>
    );
  }, [userInfo]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ position: "relative" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Linkme
          </Typography>
          <IconButton onClick={handleOpen} sx={{ mr: 2 }}>
            <SearchIcon sx={{ color: "#FFF" }} />
          </IconButton>
          {actionButton}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NavigateDrawer />
      <SearchDialog />
    </>
  );
};

export default LinkmeAppBar;
