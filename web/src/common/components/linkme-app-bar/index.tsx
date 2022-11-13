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
import { useAppBar } from "../../hooks/use-app-bar";
import { useMemo } from "react";
import useUserInfo from "../../hooks/use-user-info";
import { useNavigate } from "react-router-dom";
import { CURRENT_USER_PAGE_URL, LOGIN_PAGE_URL } from "../../../router";

const LinkmeAppBar = () => {
  const navigate = useNavigate();

  const { appBar } = useAppBar();

  const appBarTitle = useMemo(() => {
    if (appBar.title.length > 0) {
      return `Linkme - ${appBar.title}`;
    }
    return "Linkme";
  }, [appBar]);

  const { userInfo } = useUserInfo();

  const actionButton = useMemo(() => {
    if (userInfo.isLogin) {
      return (
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(CURRENT_USER_PAGE_URL)}
        >
          <Avatar />
        </Box>
      );
    }
    return (
      <Button color="inherit" onClick={() => navigate(LOGIN_PAGE_URL)}>
        Login
      </Button>
    );
  }, [userInfo]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {appBarTitle}
          </Typography>
          {actionButton}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default LinkmeAppBar;
