import { Box, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../../common/components/custom-link";
import RedColorSpan from "../../../common/components/red-color-span";
import { useCheckMobile } from "../../../common/hooks/use-check-mobile";
import { APP_URLS } from "../../../router";
import FormContainer from "../common/form-container";
import useRegist from "./hooks";

const Regist = () => {
  const { form, err, handleSubmit, handleChange, loading, loadingCryptoInfo } =
    useRegist();

  const { isMobile } = useCheckMobile();
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate(APP_URLS.LOGIN_PAGE_URL);
  };

  return (
    <FormContainer onSubmit={handleSubmit} loading={loadingCryptoInfo}>
      <Stack
        spacing={1}
        sx={{ alignItems: "center", px: isMobile ? 2 : 8, py: 2 }}
      >
        <Typography variant="h5">用户注册</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="请输入用户名"
          name="username"
          value={form.username}
          onChange={handleChange}
          helperText={<RedColorSpan>{err.username}</RedColorSpan>}
        />
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="请输入密码"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          helperText={<RedColorSpan>{err.password}</RedColorSpan>}
        />
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="请再次输入密码"
          type="password"
          name="repassword"
          value={form.repassword}
          onChange={handleChange}
          helperText={<RedColorSpan>{err.repassword}</RedColorSpan>}
        />
      </Stack>
      <Box sx={{ mx: 8, mb: 2 }}>
        <LoadingButton
          loading={loading}
          loadingIndicator="正在注册"
          type="submit"
          fullWidth
          variant="contained"
        >
          注册
        </LoadingButton>
      </Box>
      <Box sx={{ mt: 2, fontSize: "0.8rem", textAlign: "center" }}>
        已有账号？<CustomLink onClick={handleToLogin}>点击登录</CustomLink>
      </Box>
    </FormContainer>
  );
};

export default Regist;
