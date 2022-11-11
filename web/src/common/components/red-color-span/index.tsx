import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const RedColorSpan: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ color: "red" }} component="span">
      {children}
    </Box>
  );
};

export default RedColorSpan;
