import { Badge, Box } from "@mui/material";
import { FC } from "react";

interface Props {
  num: number;
}

const UnreadNum: FC<Props> = ({ num }) => {
  if (num === 0) {
    return null;
  }

  let numStr = num.toString();
  if (num > 99) {
    numStr = "99+";
  }

  return (
    <Box sx={{ position: "relative", pr: 1 }}>
      <Badge badgeContent={numStr} color="error" />
    </Box>
  );
};

export default UnreadNum;
