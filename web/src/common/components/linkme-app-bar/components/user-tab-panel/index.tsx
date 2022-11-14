import { TabPanel } from "@mui/lab";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { FC, useMemo } from "react";
import { User } from "../../../../../api-lib/account-client";
import EmptyResult from "../empty-result";
import { SearchTabs } from "../search-dialog";

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
  return (
    <ListItem
      sx={{
        cursor: "pointer",
        borderRadius: 2,
        ":hover": {
          background: "#EAEAEA",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText>{user.Username}</ListItemText>
    </ListItem>
  );
};

export default UserTabPanel;
