import { FC } from "react";
import { Avatar, Box, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../../../../../api-lib/account-client";

interface IUserSelector {
  user: User;
  onClick?: () => void;
  onClose?: () => void;
}

const UserSelector: FC<IUserSelector> = ({ user, onClick, onClose }) => {
  return (
    <Stack
      direction="row"
      sx={{
        ":hover": { backgroundColor: "whitesmoke", cursor: "pointer" },
      }}
      onClick={onClick}
    >
      <Box sx={{ mr: 1 }}>
        <Avatar />
      </Box>
      <Stack sx={{ flex: 1 }}>
        <Box>{user.Username}</Box>
      </Stack>
      {onClose && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export default UserSelector;
