import { Divider, Stack } from "@mui/material";
import useChat from "../../hooks/use-chat";
import ChatBox from "../chat-box";

import ConversationSequence from "../conversation-sequence";
import ConversationSequenceToolbar from "../conversation-sequence-toolbar";
import EmptyChatBox from "../empty-chat-box";

const Main = () => {
  const { chat } = useChat();

  return (
    <Stack
      flex={1}
      flexDirection="row"
      sx={{ overflowY: "hidden" }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Stack sx={{ width: 300, flexShrink: 0 }}>
        <ConversationSequenceToolbar />
        <ConversationSequence />
      </Stack>
      {chat.currentConv ? <ChatBox /> : <EmptyChatBox />}
    </Stack>
  );
};

export default Main;
