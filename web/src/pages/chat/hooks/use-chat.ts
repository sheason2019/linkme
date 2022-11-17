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

  // 发送消息事件
  const handlePostMessage = (content: string) => {
    // 首先生成消息，并将消息写入队列
    const message: ViewMessage = {
      Content: content,
      Id: 0,
      Type: "default",
      TimeStamp: 0,
      Mark: randomString(64),

      MemberId: 0,
    };
    setChat((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  return {
    chat,
    setChat,
    handleSetSequence,
    handlePostMessage,
    handleSetLoadingSequence,
  };
};

export default useChat;
