import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import "./index.css";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </RecoilRoot>
  </React.StrictMode>
);
