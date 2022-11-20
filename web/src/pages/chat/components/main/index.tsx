import { Divider, Stack } from "@mui/material";
import ChatBox from "../chat-box";

import ConversationSequence from "../conversation-sequence";
import ConversationSequenceToolbar from "../conversation-sequence-toolbar";

const Main = () => {
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
      <ChatBox />
    </Stack>
  );
};

export default Main;
