import { Box, Typography, Button } from "@mui/material";
import { FC } from "react";
import RowStack from "../../row-stack";

const SelfInfo: FC = () => {
  return (
    <Box>
      <RowStack>
        <Typography variant="h6">个人信息</Typography>
        <Button>编辑</Button>
      </RowStack>
    </Box>
  );
};

export default SelfInfo;
