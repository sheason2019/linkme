import { Box } from "@mui/material";
import useChat from "../../hooks/use-chat";
import Message from "../message";

const Messages = () => {
  const { chat } = useChat();

  return (
    <Box flex={1}>
      {chat.messages.map((item) => (
        <Message key={item.Id ?? item.Mark} message={item} />
      ))}
    </Box>
  );
};

export default Messages;
