import { Grid, FormLabel, TextField, FormHelperText } from "@mui/material";
import React, { FC } from "react";

interface Props {
  label: string;
  error?: string;
  element: React.ReactNode;
}

const FormItem: FC<Props> = ({ label, error, element }) => {
  return (
    <Grid container alignItems="start">
      <Grid xs={3}>
        <FormLabel
          sx={{ height: "40px", display: "flex", alignItems: "center" }}
        >
          {label}
        </FormLabel>
      </Grid>
      <Grid xs={9}>{element}</Grid>
      <Grid xs={3} />
      <Grid xs={9}>
        <FormHelperText>{error}</FormHelperText>
      </Grid>
    </Grid>
  );
};

export default FormItem;
