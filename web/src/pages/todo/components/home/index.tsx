import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommitIcon from "@mui/icons-material/Commit";
import PendingIcon from "@mui/icons-material/Pending";

const Home = () => {
  return (
    <Container sx={{ mt: 2 }}>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
          <AccountCircleIcon fontSize="large" />
          <Box sx={{ fontSize: "1.55rem" }}>用户概览</Box>
        </Stack>
        <Stack direction="row" sx={{ mt: 2 }}>
          <Stack sx={{ maxWidth: 256 }} spacing={2}>
            <Avatar sx={{ width: 220, height: 220, alignSelf: "center" }} />
            <Typography
              textOverflow="ellipsis"
              sx={{ overflow: "hidden" }}
              variant="h5"
            >
              SheasonALGKALSKDJLAKSJD
            </Typography>
          </Stack>
          <Divider orientation="vertical" sx={{ mx: 2 }} flexItem />
          <Box sx={{ flex: 1 }} />
        </Stack>
      </Card>
      <Card sx={{ mt: 2, p: 2 }}>
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
          <CommitIcon fontSize="large" />
          <Box sx={{ fontSize: "1.55rem" }}>Commit记录</Box>
        </Stack>
        <Stack
          sx={{ height: 360, color: "GrayText" }}
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <PendingIcon sx={{ height: 196, width: 196, fill: "#ECECEC" }} />
          <span>暂时没有数据</span>
        </Stack>
      </Card>
    </Container>
  );
};

export default Home;
