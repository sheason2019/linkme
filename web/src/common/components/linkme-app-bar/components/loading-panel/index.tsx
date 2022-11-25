import { CircularProgress, Stack, Typography } from "@mui/material";

const LoadingPanel = () => {
  return (
    <Stack sx={{ height: 280 }} alignItems="center" justifyContent="center">
      <CircularProgress />
      <Typography sx={{ mt: 1 }}>结果加载中</Typography>
    </Stack>
  );
};

export default LoadingPanel;
