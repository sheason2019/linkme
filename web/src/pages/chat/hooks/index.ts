import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { APP_URLS } from "../../../router";

interface IChatState {
  currentConvId?: number;
}

const chatState = atom<IChatState>({
  key: "chat/common",
  default: {},
});

const useChat = () => {
  const navigate = useNavigate();
  const [chat, setChat] = useRecoilState(chatState);

  const handleToConversation = (convId: number) => {
    setChat({
      currentConvId: convId,
    });
    navigate(APP_URLS.CHAT_URL);
  };

  return {
    chat,
    setChat,
    handleToConversation,
  };
};

export default useChat;
