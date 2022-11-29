import { FC, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { getAccountClient } from "../../../../api-client";
import { User } from "../../../../api-lib/account-client";
import useErrorHandler from "../../../hooks/use-error-handler";
import LinkmeAvatar from "../../linkme-avatar";
import { useUserCard } from "..";
import useSocket from "../../../../pages/chat/hooks/use-socket";
import useUserInfo from "../../../hooks/use-user-info";

const UserCardDialog: FC = () => {
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

        {userInfo.user?.UserId !== user?.UserId && (
          <Box position="fixed" bottom={16} left={16} right={16} zIndex={1020}>
            <Button variant="contained" fullWidth onClick={handleOnClick}>
              发起私聊
            </Button>
          </Box>
        )}
      </>
    );
  }, [user]);

  const skeleton = useMemo(() => {
    return (
      <>
        <Stack direction="row" spacing={1} alignItems="end">
          <Skeleton variant="circular" width={80} height={80} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" />
            <Skeleton variant="text" sx={{ fontSize: "0.85rem" }} />
          </Box>
        </Stack>
      </>
    );
  }, []);

  return (
    <Dialog open={userCard.open} onClose={handleClose} fullScreen>
      <Toolbar sx={{ mb: 2 }}>
        <IconButton onClick={handleClose}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography sx={{ ml: 2 }}>用户名片</Typography>
      </Toolbar>
      <Container sx={{ px: 4 }}>{loading ? skeleton : content}</Container>
    </Dialog>
  );
};

export default UserCardDialog;
