import { atom, useRecoilState } from "recoil";
import {
  Conversation,
  Message,
  SequenceItem,
} from "../../../api-lib/chat-client";
import randomString from "../../../common/utils/random-string";

// View层的消息需要比Message额外添加一些属性
export interface ViewMessage extends Message {
  // 标记正在发送中的消息
  Mark?: string;
}

interface IChatState {
  currentConv: Conversation | undefined;
  loadingSequence: boolean;
  sequence: SequenceItem[];
  messages: ViewMessage[];
}

const chatState = atom<IChatState>({
  key: "chat/common",
  default: {
    currentConv: undefined,
    loadingSequence: false,
    sequence: [],
    messages: [],
  },
});

const useChat = () => {
  const [chat, setChat] = useRecoilState(chatState);

  const handleSetLoadingSequence = (loading: boolean) => {
    setChat((prev) => ({ ...prev, loadingSequence: loading }));
  };

  const handleSetSequence = (sequence: SequenceItem[]) => {
    setChat((prev) => ({ ...prev, sequence }));
  };

  return {
    chat,
    setChat,
    handleSetSequence,
    handleSetLoadingSequence,
  };
};

export default useChat;
