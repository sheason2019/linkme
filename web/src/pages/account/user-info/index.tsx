import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import useUserInfo from "../../../common/hooks/use-user-info";
import Signature from "./components/signature";
import UploadAvatar from "./components/upload-avatar";

const UserInfoPage = () => {
  const { userInfo } = useUserInfo();

  const [edit, setEdit] = useState(false);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Stack direction="row">
          <Box sx={{ width: 256 }}>
            <UploadAvatar />
            <Typography variant="h5" sx={{ mt: 1 }}>
              {userInfo.user?.Username}
            </Typography>
            <Typography variant="h6" color="GrayText">
              UID:{userInfo.user?.UserId}
            </Typography>
            <Signature />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default UserInfoPage;
