import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import LinkmeAppBar from "../../common/components/linkme-app-bar";
import Navigator from "./components/navigator";

const TodoPage = () => {

  return (
    <>
      <LinkmeAppBar />
      <Stack
        direction="row"
        alignItems="stretch"
        sx={{ overflow: "hidden", flex: 1, background: "whitesmoke" }}
      >
        <Navigator />
        <Outlet />
      </Stack>
    </>
  );
};

export default TodoPage;
