import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { APP_URLS } from "../../../router";
import { SequenceItem } from "../../../api-lib/chat-client";

interface IChatState {
  currentConvId?: number;
  sequence?: SequenceItem[];
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

  const handleSetSequence = (sequence: SequenceItem[]) => {
    setChat((prev) => ({ ...prev, sequence }));
  };

  return {
    chat,
    setChat,
    handleSetSequence,
    handleToConversation,
  };
};

export default useChat;
