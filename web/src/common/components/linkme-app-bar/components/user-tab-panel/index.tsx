import { TabPanel } from "@mui/lab";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useMemo } from "react";
import { getChatClient } from "../../../../../api-client";
import { User } from "../../../../../api-lib/account-client";
import useErrorHandler from "../../../../hooks/use-error-handler";
import EmptyResult from "../empty-result";
import { useSearchDialog } from "../search-dialog";
import ChatIcon from "@mui/icons-material/Chat";
import useSocket from "../../../../../pages/chat/hooks/use-socket";
import LinkmeAvatar from "../../../linkme-avatar";
import { useCheckMobile } from "../../../../hooks/use-check-mobile";
import { SearchTabs } from "../../typings";

interface IUserTabPanel {
  users: User[];
}

const UserTabPanel: FC<IUserTabPanel> = ({ users }) => {
  const content = useMemo(() => {
    if (users.length === 0) {
      return <EmptyResult />;
    }
    return (
      <List>
        {users.map((user) => (
          <UserListItem key={user.UserId} user={user} />
        ))}
      </List>
    );
  }, [users]);

  return (
    <TabPanel value={SearchTabs.User} sx={{ height: 280, p: 0 }}>
      {content}
    </TabPanel>
  );
};

interface IUserListItem {
  user: User;
}

const UserListItem: FC<IUserListItem> = ({ user }) => {
  const { handleClose } = useSearchDialog();
  const { handleCreatePrivateConversation } = useSocket();

  const { isMobile } = useCheckMobile();

  const handleOnClick = async () => {
    await handleCreatePrivateConversation(user.UserId);

    handleClose();
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <LinkmeAvatar sourceHash={user.AvatarUrl} />
      </ListItemAvatar>
      <Box flex={1} height="2.5rem">
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography fontWeight="bold">{user.Username}</Typography>
          {!isMobile && user.Signature && (
            <Typography color="GrayText" fontSize="0.8rem">
              {user.Signature}
            </Typography>
          )}
        </Stack>
      </Box>
      <IconButton onClick={handleOnClick}>
        <ChatIcon />
      </IconButton>
    </ListItem>
  );
};

export default UserTabPanel;
