import { Box, Container, Stack, Typography } from "@mui/material";
import { useCheckMobile } from "../../../common/hooks/use-check-mobile";
import useUserInfo from "../../../common/hooks/use-user-info";
import Signature from "./components/signature";
import UploadAvatar from "./components/upload-avatar";

const UserSpacePage = () => {
  const { userInfo } = useUserInfo();

  const { isMobile } = useCheckMobile();

  if (!isMobile) {
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
  }

  return (
    <Container>
      <Stack alignItems="center" sx={{ mt: 2 }}>
        <UploadAvatar />
        <Typography variant="h5" sx={{ mt: 1 }}>
          {userInfo.user?.Username}
        </Typography>
        <Typography variant="h6" color="GrayText">
          UID:{userInfo.user?.UserId}
        </Typography>
      </Stack>
      <Signature />
    </Container>
  );
};

export default UserSpacePage;
