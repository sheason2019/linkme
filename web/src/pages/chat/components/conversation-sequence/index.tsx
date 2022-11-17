import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import useChat from "../../hooks";

const ConversationSequence = () => {
  const { chat } = useChat();

  return (
    <List sx={{ width: "100%", flex: 1, overflowY: "auto" }}>
      {chat.sequence &&
        chat.sequence.map((item) => (
          <ListItemButton key={item.ConversationId}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText>{item.Name}</ListItemText>
          </ListItemButton>
        ))}
    </List>
  );
};

export default ConversationSequence;
