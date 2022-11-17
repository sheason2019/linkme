import {
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
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText>{item.Name}</ListItemText>
          </ListItemButton>
        ))
      )}
    </List>
  );
};

export default ConversationSequence;
