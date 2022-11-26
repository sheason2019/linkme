import { CircularProgress, List, Stack, Typography } from "@mui/material";
import { useState } from "react";
import useChat from "../../hooks/use-chat";
import SequenceItemComp from "./components/sequence-item-comp";
import SequenceItemMenu from "./components/sequence-item-menu";

const ConversationSequence = () => {
  const { chat } = useChat();

  const [menu, setMenu] = useState({
    open: false,
    position: {
      x: 0,
      y: 0,
    },
    convId: 0,
  });

  const handleOpenMenu = (clientX: number, clientY: number, convId: number) => {
    setMenu({
      open: true,
      position: {
        x: clientX,
        y: clientY,
      },
      convId,
    });
  };
  const handleClose = () => {
    setMenu((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <List sx={{ width: "100%", flex: 1, overflowY: "auto" }}>
        {chat.loadingSequence ? (
          <Stack alignItems="center" spacing={2}>
            <CircularProgress />
            <Typography variant="body2">加载中…</Typography>
          </Stack>
        ) : (
          chat.sequence.map((item) => (
            <SequenceItemComp
              key={item.ConversationId}
              openMenu={handleOpenMenu}
              item={item}
            />
          ))
        )}
      </List>
      <SequenceItemMenu
        onClose={handleClose}
        open={menu.open}
        position={menu.position}
        convId={menu.convId}
      />
    </>
  );
};

export default ConversationSequence;
