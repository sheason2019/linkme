import { Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const RowStack: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 0.5 }}
    >
      {children}
    </Stack>
  );
};

export default RowStack;
