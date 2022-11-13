import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../../common/components/custom-link";
import { useCheckMobile } from "../../../common/hooks/use-check-mobile";
import { REGIST_PAGE_URL } from "../../../router";
import FormContainer from "../common/form-container";
import RedColorSpan from "../../../common/components/red-color-span";
import useLogin from "./hooks";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const { form, err, handleSubmit, handleChange, loading, loadingCryptoInfo } =
    useLogin();
  const { isMobile } = useCheckMobile();
  const navigate = useNavigate();

  const handleToRegist = () => {
    navigate(REGIST_PAGE_URL);
  };

  return (
    <FormContainer onSubmit={handleSubmit} loading={loadingCryptoInfo}>
      <Stack
        spacing={2}
        sx={{ alignItems: "center", px: isMobile ? 2 : 8, py: 2 }}
      >
        <Typography variant="h5">用户登录</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="请输入用户名"
          value={form.username}
          onChange={handleChange}
          name="username"
          helperText={<RedColorSpan>{err.username}</RedColorSpan>}
        />
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="请输入密码"
          type="password"
          value={form.password}
          onChange={handleChange}
          name="password"
          helperText={<RedColorSpan>{err.password}</RedColorSpan>}
        />
      </Stack>
      <Box sx={{ mx: 8, mb: 2 }}>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={loading}
          loadingIndicator="正在登录"
          sx={{ mt: 2 }}
        >
          登录
        </LoadingButton>
      </Box>
      <Box sx={{ mt: 2, fontSize: "0.8rem", textAlign: "center" }}>
        没有账号？<CustomLink onClick={handleToRegist}>点击注册</CustomLink>
      </Box>
    </FormContainer>
  );
};

export default Login;
