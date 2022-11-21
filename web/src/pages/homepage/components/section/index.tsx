import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const Section: FC<PropsWithChildren> = ({ children }) => {
  return <Box sx={{ py: 16 }}>{children}</Box>;
};

export default Section;
