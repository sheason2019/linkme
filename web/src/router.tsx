import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Account相关页面
const Account = lazy(() => import("./pages/account"));
const Regist = lazy(() => import("./pages/account/regist"));
const Login = lazy(() => import("./pages/account/login"));
const CurrentUser = lazy(() => import("./pages/account/current-user"));
const UserSpace = lazy(() => import("./pages/account/space"));

// TODO相关页面
const TodoPage = lazy(() => import("./pages/todo"));
const TodoHomePage = lazy(() => import("./pages/todo/components/home"));
const TodoGroupPage = lazy(() => import("./pages/todo/components/group"));

// 首页
const HomePage = lazy(() => import("./pages/homepage"));

// 即时通讯页面
const Chat = lazy(() => import("./pages/chat"));

const Suspenser = (
  Comp: React.LazyExoticComponent<() => JSX.Element | null>
) => {
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
        path: "/",
        element: Suspenser(HomePage),
      },
      {
        path: "/account",
        element: Suspenser(Account),
        children: [
          {
            path: "space",
            element: Suspenser(UserSpace),
          },
          {
            path: "login",
            element: Suspenser(Login),
          },
          {
            path: "regist",
            element: Suspenser(Regist),
          },
          {
            path: "current-user",
            element: Suspenser(CurrentUser),
          },
        ],
      },
      {
        path: "/chat",
        element: Suspenser(Chat),
      },
      {
        path: "/:username/todo",
        element: Suspenser(TodoPage),
        children: [
          {
            path: "",
            element: Suspenser(TodoHomePage),
          },
          {
            path: "group/:groupid",
            element: Suspenser(TodoGroupPage),
          },
        ],
      },
    ],
  },
]);

export enum APP_URLS {
  LOGIN_PAGE_URL = "/account/login",
  REGIST_PAGE_URL = "/account/regist",
  CURRENT_USER_PAGE_URL = "/account/current-user",
  USER_SPACE_URL = "/account/space",

  CHAT_URL = "/chat",

  TODO_URL = "/todo",

  HOME_URL = "/",
}
