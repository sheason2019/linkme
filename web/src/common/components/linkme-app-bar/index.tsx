import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppBar } from "../../hooks/use-app-bar";
import { useMemo } from "react";

const LinkmeAppBar = () => {
  const { appBar } = useAppBar();

  const appBarTitle = useMemo(() => {
    if (appBar.title.length > 0) {
      return `Linkme - ${appBar.title}`;
    }
    return "Linkme";
  }, [appBar]);

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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default LinkmeAppBar;
