import { Stack, Typography } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const EmptyChatBox = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ flex: 1 }}
      spacing={1}
    >
      <PendingActionsIcon sx={{ width: 96, height: 96 }} color="disabled" />
      <Typography variant="body1" color="GrayText">
        当前暂无开启的会话
      </Typography>
    </Stack>
  );
};

export default EmptyChatBox;
