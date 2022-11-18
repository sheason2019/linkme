import {
  Box,
  Avatar,
  CircularProgress,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import useChat from "../../hooks/use-chat";
import useSocket from "../../hooks/use-socket";
import TimeStamp from "../time-stamp";
import UnreadNum from "../unread-num";

const ConversationSequence = () => {
  const { chat } = useChat();
  const { handleToConversation } = useSocket();

  return (
    <List sx={{ width: "100%", flex: 1, overflowY: "auto" }}>
      {chat.loadingSequence ? (
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography variant="body2">加载中…</Typography>
        </Stack>
      ) : (
        chat.sequence.map((item) => (
          <ListItemButton
            key={item.ConversationId}
            onClick={() => handleToConversation(item.ConversationId)}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText sx={{ m: 0 }}>
              <Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Box>{item.Name}</Box>
                  <Box sx={{ color: "gray" }}>
                    <TimeStamp timeStamp={item.LastUpdateTime} />
                  </Box>
                </Stack>
                <Stack
                  sx={{ height: "24px" }}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Box sx={{ color: "gray" }}>{item.LastMessage}</Box>
                  <UnreadNum num={item.UnreadCount} />
                </Stack>
              </Stack>
            </ListItemText>
          </ListItemButton>
        ))
      )}
    </List>
  );
};

export default ConversationSequence;
