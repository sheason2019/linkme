import { Box, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_URLS } from "../../../../../router";
import useUserInfo from "../../../../hooks/use-user-info";
import LinkmeAvatar from "../../../linkme-avatar";

const UserAvatarWithMenu = () => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();

  const avatarRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const handleTo = (url: APP_URLS) => {
    navigate(url);
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen(true)}
        ref={avatarRef}
      >
        <LinkmeAvatar sourceHash={userInfo.user?.AvatarUrl} />
      </Box>
      <Menu
        open={open}
        anchorEl={avatarRef.current}
        onClose={() => setOpen(false)}
        sx={{ mt: 2 }}
      >
        <MenuItem
          sx={{ fontWeight: "bold" }}
          onClick={() => handleTo(APP_URLS.USER_SPACE_URL)}
        >
          {userInfo.user?.Username}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleTo(APP_URLS.CURRENT_USER_PAGE_URL)}
          sx={{ color: "red" }}
        >
          退出登录
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatarWithMenu;
