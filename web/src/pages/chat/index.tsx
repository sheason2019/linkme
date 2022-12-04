import { useEffect } from "react";
import LinkmeAppBar from "../../common/components/linkme-app-bar";
import UserCard from "../../common/components/user-card";
import useUserInfo from "../../common/hooks/use-user-info";
import KickoutDialog from "./components/kickout-dialog";
import Main from "./components/main";
import useSocket from "./hooks/use-socket";

const ChatPage = () => {
  const { userInfo } = useUserInfo();
  // TODO: 检查登录状态，若登录状态失效则令用户退回到登录页面
  const { initSocket, handleResetChatState } = useSocket();

  useEffect(() => {
    handleResetChatState();
    initSocket();
  }, [userInfo.user?.UserId]);
  return (
    <>
      <LinkmeAppBar />
      <Main />
      <KickoutDialog />
      <UserCard />
    </>
  );
};

export default ChatPage;
