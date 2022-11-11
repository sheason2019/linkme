import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../../common/components/custom-link";
import { useAppBar } from "../../../common/hooks/use-app-bar";
import { useCheckMobile } from "../../../common/hooks/use-check-mobile";
import { LOGIN_PAGE_URL } from "../../../router";
import FormContainer from "../common/form-container";

const Regist = () => {
  const { isMobile } = useCheckMobile();
  const { setAppBar } = useAppBar();
  const navigate = useNavigate();

  useEffect(() => {
    setAppBar((prev) => ({ ...prev, title: "用户注册" }));
  }, []);

  const handleToLogin = () => {
    navigate(LOGIN_PAGE_URL);
  };

  return (
    <FormContainer>
      <Stack
        spacing={2}
        sx={{ alignItems: "center", px: isMobile ? 2 : 8, py: 2 }}
      >
        <Typography variant="h5">用户注册</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="请输入用户名"
        />
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="请输入密码"
        />
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="请再次输入密码"
        />
      </Stack>
      <Box sx={{ mx: 8, mb: 2 }}>
        <Button fullWidth variant="contained">
          注册
        </Button>
      </Box>
      <Box sx={{ mt: 2, fontSize: "0.8rem", textAlign: "center" }}>
        已有账号？<CustomLink onClick={handleToLogin}>点击登录</CustomLink>
      </Box>
    </FormContainer>
  );
};

export default Regist;
