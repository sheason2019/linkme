import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APP_URLS } from "../../../../router";

const EnterButton = () => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(APP_URLS.LOGIN_PAGE_URL)}
      sx={{ position: "fixed", top: 16, right: 32, zIndex: 9 }}
    >
      <Button variant="contained">开始使用</Button>
    </Box>
  );
};

export default EnterButton;
