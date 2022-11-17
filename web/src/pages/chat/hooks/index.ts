import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { APP_URLS } from "../../../router";
import { Message, SequenceItem } from "../../../api-lib/chat-client";
import randomString from "../../../common/utils/random-string";

// View层的消息需要比Message额外添加一些属性
export interface ViewMessage extends Message {
  // 标记正在发送中的消息
  Mark?: string;
}

interface IChatState {
  currentConvId: number | undefined;
  sequence: SequenceItem[];
  messages: ViewMessage[];
}

const chatState = atom<IChatState>({
  key: "chat/common",
  default: {
    currentConvId: undefined,
    sequence: [],
    messages: [],
  },
});

const useChat = () => {
  const navigate = useNavigate();
  const [chat, setChat] = useRecoilState(chatState);

  const handleToConversation = (convId: number) => {
    setChat({
      currentConvId: convId,
      sequence: [],
      messages: [],
    });
    navigate(APP_URLS.CHAT_URL);
  };

  const handleSetSequence = (sequence: SequenceItem[]) => {
    setChat((prev) => ({ ...prev, sequence }));
  };

  // 发送消息事件
  const handlePostMessage = (content: string) => {
    // 首先生成消息，并将消息写入队列
    const message: ViewMessage = {
      Content: content,
      Id: 0,
      Type: "default",
      TimeStamp: 0,
      Mark: randomString(64),
    };
    setChat((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  return {
    chat,
    setChat,
    handleSetSequence,
    handleToConversation,
    handlePostMessage,
  };
};

export default useChat;
