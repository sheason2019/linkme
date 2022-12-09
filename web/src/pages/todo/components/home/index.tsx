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
        <Stack direction="row" sx={{ verticalAlign: "baseline" }} spacing={2}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="h4">用户概览</Typography>
        </Stack>
        <Stack direction="row" sx={{ mt: 2 }}>
          <Stack sx={{ maxWidth: 256 }} spacing={1}>
            <Avatar sx={{ width: 256, height: 256 }} />
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
        <Stack direction="row" sx={{ verticalAlign: "baseline" }} spacing={2}>
          <CommitIcon fontSize="large" />
          <Typography variant="h4">Commit记录</Typography>
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
