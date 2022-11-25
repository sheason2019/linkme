import { LoadingButton } from "@mui/lab";
import {
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Stack,
  InputBase,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAccountClient } from "../../../../../api-client";
import useErrorHandler from "../../../../../common/hooks/use-error-handler";
import useUserInfo from "../../../../../common/hooks/use-user-info";

const Signature = () => {
  const { handler } = useErrorHandler();
  const { userInfo, getCurrentUser } = useUserInfo();
  // 个性签名最多不超过100字
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    const client = getAccountClient();

    setLoading(true);
    const [err] = await client.PutSignature(inputValue);
    setLoading(false);

    if (err) {
      handler(err);
      return;
    }

    // 拉取最新的用户信息
    await getCurrentUser();
    // 关闭编辑模式
    setEdit(false);
  };

  useEffect(() => {
    setInputValue(userInfo.user?.Signature ?? "");
  }, [edit]);

  if (!edit) {
    return (
      <Stack sx={{ mt: 2 }}>
        <Typography>签名</Typography>
        <InputBase
          multiline
          readOnly
          value={userInfo.user?.Signature}
          placeholder="用户暂无签名信息"
        />
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => setEdit(true)}
        >
          编辑
        </Button>
      </Stack>
    );
  }

  return (
    <Stack sx={{ mt: 2 }}>
      <Typography>签名</Typography>
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="随便写点什么吧"
        multiline
      />
      <ButtonGroup fullWidth sx={{ mt: 3 }}>
        <Button onClick={() => setEdit(false)}>取消</Button>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant="contained"
        >
          提交
        </LoadingButton>
      </ButtonGroup>
    </Stack>
  );
};

export default Signature;
