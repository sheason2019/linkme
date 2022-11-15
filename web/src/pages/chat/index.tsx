import LinkmeAppBar from "../../common/components/linkme-app-bar";
import Main from "./components/main";
import useSocket from "./hooks/use-socket";

const ChatPage = () => {
  // TODO: 检查登录状态，若登录状态失效则令用户退回到登录页面
  useSocket();
  return (
    <>
      <LinkmeAppBar />
      <Main />
    </>
  );
};

export default ChatPage;
