import { Box, Grid, InputBase, Stack, Typography } from "@mui/material";
import React, { FC } from "react";

interface IInfoPanel {
  label: string;
  value: React.ReactNode;
  placeholder?: string;
}

const InfoPanel: FC<IInfoPanel> = ({ label, value, placeholder }) => {
  return (
    <Stack
      sx={{ p: 2, borderRadius: 2, background: "#ECECEC" }}
      direction="row"
      alignItems="center"
    >
      <Box sx={{ width: "5.5rem" }}>{label}</Box>
      <Box>
        <InputBase
          size="small"
          readOnly
          value={value}
          placeholder={placeholder}
          inputProps={{ sx: { pb: 0 } }}
        />
      </Box>
    </Stack>
  );
};

export default InfoPanel;
