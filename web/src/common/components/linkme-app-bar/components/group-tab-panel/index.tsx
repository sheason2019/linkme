import { FC, useMemo } from "react";
import { TabPanel } from "@mui/lab";
import {
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

import { Conversation } from "../../../../../api-lib/chat-client";
import LinkmeAvatar from "../../../linkme-avatar";
import { SearchTabs } from "../../typings";
import EmptyResult from "../empty-result";
import useSocket from "../../../../../pages/chat/hooks/use-socket";
import { useSearchDialog } from "../search-dialog";

interface IGroupTabPanel {
  groups: Conversation[];
}

const GroupTabPanel: FC<IGroupTabPanel> = ({ groups }) => {
  const content = useMemo(() => {
    if (groups.length === 0) {
      return <EmptyResult />;
    }
    return (
      <List>
        {groups.map((conv) => (
          <GroupListItem key={conv.Id} group={conv} />
        ))}
      </List>
    );
  }, [groups]);

  return (
    <TabPanel value={SearchTabs.Group} sx={{ height: 280, p: 0 }}>
      {content}
    </TabPanel>
  );
};

interface IGroupListItem {
  group: Conversation;
}

const GroupListItem: FC<IGroupListItem> = ({ group }) => {
  const { handleClose } = useSearchDialog();
  const { handleToConversation } = useSocket();

  const handleOnClick = async () => {
    await handleToConversation(group.Id);
    handleClose();
  };

  return (
    <ListItemButton onClick={handleOnClick}>
      <ListItemAvatar>
        <LinkmeAvatar sourceHash={group.Avatar} />
      </ListItemAvatar>
      <Box flex={1} height="2.5rem">
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography fontWeight="bold">{group.Name}</Typography>
          <Typography color="GrayText" fontSize="0.8rem">
            <GroupIcon sx={{ width: "1rem", height: "1rem" }} />
            {group.MemberCount}
          </Typography>
        </Stack>
      </Box>
    </ListItemButton>
  );
};

export default GroupTabPanel;
