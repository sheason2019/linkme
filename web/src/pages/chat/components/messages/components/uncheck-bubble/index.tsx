import { FC } from "react";
import { Box, Fab } from "@mui/material";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

interface IProps {
  onClick?: () => any;
  uncheckedCount: number;
}

const UncheckBubble: FC<IProps> = ({ uncheckedCount, onClick }) => {
  if (uncheckedCount === 0) return null;

  return (
    <Box sx={{ position: "absolute", bottom: 16, right: 32 }}>
      <Fab variant="extended" color="primary" onClick={onClick}>
        <KeyboardDoubleArrowDownIcon />
        {uncheckedCount} 条新消息
      </Fab>
    </Box>
  );
};

export default UncheckBubble;
