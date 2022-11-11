import { FC, lazy, PropsWithChildren, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const Account = lazy(() => import("./pages/account"));
const Regist = lazy(() => import("./pages/account/regist"));
const Login = lazy(() => import("./pages/account/login"));

const Suspenser = (Comp: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense>
      <Comp />
    </Suspense>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Unknown pages</div>,
    element: <App />,
    children: [
      {
        path: "/account",
        element: Suspenser(Account),
        children: [
          {
            path: "login",
            element: Suspenser(Login),
          },
          {
            path: "regist",
            element: Suspenser(Regist),
          },
        ],
      },
    ],
  },
]);

export const LOGIN_PAGE_URL = "/account/login";
export const REGIST_PAGE_URL = "/account/regist";
