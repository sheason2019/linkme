import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../../common/hooks/use-user-info";
import { LOGIN_PAGE_URL } from "../../../router";
import FormContainer from "../common/form-container";
import LogoutConfirmDialog, {
  useConfirmDialog,
} from "./components/logout-confirm-dialog";

const CurrentUser = () => {
  const navigate = useNavigate();
  const { handleOpen } = useConfirmDialog();

  const { userInfo } = useUserInfo();
  const user = userInfo.user;

  useEffect(() => {
    // 如果找不到当前用户信息则前往登录页面
    if (!user) {
      navigate(LOGIN_PAGE_URL);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <>
      <FormContainer>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h5">当前用户</Typography>
          <Stack alignItems="center" spacing={1}>
            <Avatar sx={{ width: 88, height: 88 }} />
            <Box>{user.Username}</Box>
          </Stack>
          <Button variant="contained" color="error" onClick={handleOpen}>
            退出登录
          </Button>
        </Stack>
      </FormContainer>
      <LogoutConfirmDialog />
    </>
  );
};

export default CurrentUser;
