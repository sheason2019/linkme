import React from "react";
import { Dialog, Divider, Slide, Stack } from "@mui/material";
import { useCheckMobile } from "../../../../common/hooks/use-check-mobile";
import useChat from "../../hooks/use-chat";
import ChatBox from "../chat-box";

import ConversationSequence from "../conversation-sequence";
import ConversationSequenceToolbar from "../conversation-sequence-toolbar";
import EmptyChatBox from "../empty-chat-box";
import { TransitionProps } from "@mui/material/transitions";

const Main = () => {
  const { isMobile } = useCheckMobile();

  return isMobile ? <Mobile /> : <Desktop />;
};

const Desktop = () => {
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

const Mobile = () => {
  const { chat } = useChat();

  return (
    <>
      <Stack>
        <ConversationSequenceToolbar />
        <ConversationSequence />
      </Stack>
      <Dialog
        fullScreen
        open={!!chat.currentConv}
        TransitionComponent={Transition}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          zIndex: 10000,
        }}
      >
        <ChatBox />
      </Dialog>
    </>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default Main;
