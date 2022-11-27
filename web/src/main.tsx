import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "./common/utils/theme";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <RecoilRoot>
        <SnackbarProvider
          maxSnack={3}
          style={{ zIndex: 20000 }}
          classes={{ containerAnchorOriginTopLeft: "z-alert" }}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);
