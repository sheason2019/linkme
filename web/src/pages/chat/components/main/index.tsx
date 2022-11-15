import {
  Box,
  Button,
  Divider,
  List,
  ListSubheader,
  Stack,
  Toolbar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useChat from "../../hooks";

const Main = () => {
  const { chat } = useChat();

  return (
    <Stack
      flex={1}
      flexDirection="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Stack sx={{ width: 300 }}>
        <ListSubheader>消息列表</ListSubheader>
        <List sx={{ width: "100%", flex: 1, overflowY: "auto" }}></List>
      </Stack>
      <Stack flex={1} alignItems="stretch">
        <Toolbar>会话ID - {chat.currentConvId}</Toolbar>
        <Divider />
        <Box sx={{ flex: 1 }} />
        <Divider />
        <Stack sx={{ height: 280 }} divider={<Divider flexItem />}>
          <Box sx={{ height: 36 }} />
          <Box sx={{ flex: 1 }} />
          <Box sx={{ py: 1, px: 2, textAlign: "right" }}>
            <Button variant="contained" endIcon={<SendIcon />}>
              发送
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Main;
