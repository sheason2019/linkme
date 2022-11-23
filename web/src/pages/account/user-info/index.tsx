import { Avatar, Container, Tooltip, Typography } from "@mui/material";
import UploadAvatarDialog from "./upload-avatar-dialog";

const AVATAR_SIZE = 256;

const UserInfoPage = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Tooltip title="点击切换头像" arrow>
          <Avatar
            sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, cursor: "pointer" }}
          />
        </Tooltip>
        <Typography variant="h5" sx={{ mt: 1 }}>
          USERNAME
        </Typography>
        <Typography variant="h6" color="GrayText">
          UID:10001
        </Typography>
      </Container>
      <UploadAvatarDialog />
    </>
  );
};

export default UserInfoPage;
