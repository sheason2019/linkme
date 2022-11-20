import { Grid } from "@mui/material";
import React, { FC } from "react";

interface IInfoPanel {
  label: string;
  value: React.ReactNode;
}

const InfoPanel: FC<IInfoPanel> = ({ label, value }) => {
  return (
    <Grid container sx={{ p: 2, borderRadius: 2, background: "#ECECEC" }}>
      <Grid item xs={3}>
        {label}
      </Grid>
      <Grid item xs={9}>
        {value}
      </Grid>
    </Grid>
  );
};

export default InfoPanel;
