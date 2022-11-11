import { useMediaQuery, useTheme } from "@mui/material";

export const useCheckMobile = () => {
  const theme = useTheme();

  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));

  return {
    isMobile,
  };
};
