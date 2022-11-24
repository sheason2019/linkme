import { Container, Typography } from "@mui/material";
import UploadAvatar from "./upload-avatar";

const AVATAR_SIZE = 256;

const UserInfoPage = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <UploadAvatar />
        <Typography variant="h5" sx={{ mt: 1 }}>
          USERNAME
        </Typography>
        <Typography variant="h6" color="GrayText">
          UID:10001
        </Typography>
      </Container>
    </>
  );
};

export default UserInfoPage;
