import { FC } from "react";
import { Avatar, Box, Chip, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../../../../../api-lib/account-client";
import LinkmeAvatar from "../../../../../common/components/linkme-avatar";

interface IUserOption {
  exist?: boolean;
  user: User;
  onClick?: () => void;
  onClose?: () => void;
}

const UserOption: FC<IUserOption> = ({ user, exist, onClick, onClose }) => {
  return (
    <Stack
      direction="row"
      sx={{
        ":hover": { cursor: "pointer" },
      }}
      onClick={onClick}
    >
      <Box sx={{ mr: 1 }}>
        <LinkmeAvatar sourceHash={user.AvatarUrl} />
      </Box>
      <Stack sx={{ flex: 1 }} direction="row" spacing={2}>
        <Box>{user.Username}</Box>
        {exist && <Chip size="small" label="已加入" color="primary" />}
      </Stack>
      {onClose && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export default UserOption;
