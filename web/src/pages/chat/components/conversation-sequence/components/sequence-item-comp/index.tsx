import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
  Box,
} from "@mui/material";
import { FC } from "react";
import { SequenceItem } from "../../../../../../../../socket/api-lib/chat-client";
import useChat from "../../../../hooks/use-chat";
import useSocket from "../../../../hooks/use-socket";
import TimeStamp from "../../../time-stamp";
import UnreadNum from "../../../unread-num";

interface ISequenceItem {
  item: SequenceItem;
  openMenu: (clientX: number, clientY: number, convId: number) => any;
}

const SequenceItemComp: FC<ISequenceItem> = ({ item, openMenu }) => {
  const { chat } = useChat();
  const { handleToConversation } = useSocket();

  return (
    <ListItemButton
      onClick={() => handleToConversation(item.ConversationId)}
      sx={{ display: "flex", alignItems: "center" }}
      onContextMenu={(e) => {
        openMenu(e.clientX, e.clientY, item.ConversationId);
        e.preventDefault();
      }}
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
            <UnreadNum
              num={
                chat.currentConv?.Id === item.ConversationId
                  ? 0
                  : item.UnreadCount
              }
            />
          </Stack>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
};

export default SequenceItemComp;
