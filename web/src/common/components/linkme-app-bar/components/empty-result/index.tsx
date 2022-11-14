import { Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const SIZE = 96;

const EmptyResult = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ height: "100%" }}
    >
      <ErrorOutlineIcon
        sx={{ width: SIZE, height: SIZE, color: "lightgray" }}
      />
      <Typography variant="body2" color="gray">
        没有搜索到相关信息
      </Typography>
    </Stack>
  );
};

export default EmptyResult;
