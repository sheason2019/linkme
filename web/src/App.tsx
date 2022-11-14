import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import useUserInfo from "./common/hooks/use-user-info";

function App() {
  const { preLogin } = useUserInfo();

  useEffect(() => {
    preLogin();
  }, []);
  return <Outlet />;
}

export default App;
