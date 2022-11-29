import { FC, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Popover,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";

import { getAccountClient } from "../../../../api-client";
import { User } from "../../../../api-lib/account-client";
import useErrorHandler from "../../../hooks/use-error-handler";
import LinkmeAvatar from "../../linkme-avatar";
import { useUserCard } from "..";
import useSocket from "../../../../pages/chat/hooks/use-socket";
import useUserInfo from "../../../hooks/use-user-info";

const UserCardPopover: FC = () => {
  const { userInfo } = useUserInfo();

  const { handler } = useErrorHandler();
  const { userCard, handleClose } = useUserCard();
  const { handleCreatePrivateConversation } = useSocket();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const client = getAccountClient();
      setLoading(true);
      const [err, user] = await client.GetUserByUserId(userCard.userId);
      setLoading(false);
      if (err) {
        handler(err);
        return;
      }

      setUser(user);
    };
    userCard.open && fetchUser();
  }, [userCard]);

  const handleOnClick = async () => {
    await handleCreatePrivateConversation(user!.UserId);
    handleClose();
  };

  const content = useMemo(() => {
    return (
      <>
        <Box sx={{ width: 240, p: 2 }}>
          <Typography sx={{ mb: 2 }}>用户名片</Typography>
          <Stack direction="row" spacing={1} alignItems="end">
            <LinkmeAvatar size={80} sourceHash={user?.AvatarUrl} />
            <Box>
              <Typography fontWeight="bold">{user?.Username}</Typography>
              <Typography color="GrayText" fontSize="0.85rem">
                UID:{user?.UserId}
              </Typography>
            </Box>
          </Stack>
          {userCard.nickname && (
            <Stack sx={{ px: 1, mt: 2 }} direction="row" spacing={1}>
              <Typography fontSize="0.85rem">群聊昵称</Typography>
              <Typography fontSize="0.85rem">{userCard.nickname}</Typography>
            </Stack>
          )}
          {user?.Signature && (
            <Stack sx={{ px: 1, mt: 2 }} direction="row" spacing={1}>
              <CreateIcon sx={{ fontSize: "0.85rem", fill: "gray" }} />
              <Typography fontSize="0.85rem">{user?.Signature}</Typography>
            </Stack>
          )}
        </Box>
        {userInfo.user?.UserId !== user?.UserId && (
          <Button fullWidth onClick={handleOnClick}>
            发起私聊
          </Button>
        )}
      </>
    );
  }, [user]);

  const skeleton = useMemo(() => {
    return (
      <>
        <Box sx={{ width: 240, p: 2 }}>
          <Typography sx={{ mb: 2 }}>用户名片</Typography>
          <Stack direction="row" spacing={1} alignItems="end">
            <Skeleton variant="circular" width={80} height={80} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" />
              <Skeleton variant="text" sx={{ fontSize: "0.85rem" }} />
            </Box>
          </Stack>
        </Box>
      </>
    );
  }, []);

  return (
    <Popover
      open={userCard.open}
      anchorEl={userCard.el}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{ mt: 1 }}
    >
      <Card>{loading ? skeleton : content}</Card>
    </Popover>
  );
};

export default UserCardPopover;
