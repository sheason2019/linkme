import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../../common/components/custom-link";
import { useCheckMobile } from "../../../common/hooks/use-check-mobile";
import { APP_URLS } from "../../../router";
import FormContainer from "../common/form-container";
import RedColorSpan from "../../../common/components/red-color-span";
import useLogin from "./hooks";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const {
    form,
    setForm,
    err,
    handleSubmit,
    handleChange,
    loading,
    loadingCryptoInfo,
  } = useLogin();
  const { isMobile } = useCheckMobile();
  const navigate = useNavigate();

  const handleToRegist = () => {
    navigate(APP_URLS.REGIST_PAGE_URL);
  };

  return (
    <FormContainer onSubmit={handleSubmit} loading={loadingCryptoInfo}>
      <Stack sx={{ alignItems: "center", px: isMobile ? 2 : 8, pt: 2 }}>
        <Typography variant="h5">用户登录</Typography>
        <FormGroup sx={{ width: "100%", marginTop: 2 }}>
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
        </FormGroup>
        <FormGroup sx={{ width: "100%", marginTop: 0.5 }}>
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
        </FormGroup>
        <FormGroup sx={{ padding: 0 }}>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="7日内自动登录"
            checked={form.useLocal}
            onChange={(_, value) =>
              setForm((prev) => ({ ...prev, useLocal: value }))
            }
          />
        </FormGroup>
      </Stack>
      <Box sx={{ mx: 8, mb: 2 }}>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={loading}
          loadingIndicator="正在登录"
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
