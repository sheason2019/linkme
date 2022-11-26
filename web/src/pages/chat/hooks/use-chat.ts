import { atom, useRecoilState } from "recoil";
import {
  Conversation,
  Message,
  MessageMember,
  SequenceItem,
} from "../../../api-lib/chat-client";
import useUserInfo from "../../../common/hooks/use-user-info";

// View层的消息需要比Message额外添加一些属性
export interface ViewMessage extends Message {
  // 标记正在发送中的消息
  Mark?: string;
}

export enum OnlineStatus {
  Offline = "离线",
  Login = "登录中",
  Online = "在线",
}

interface IChatState {
  online: OnlineStatus;
  currentConv: Conversation | undefined;
  socketConvId: number | undefined;
  currentMemberId?: number;
  loadingSequence: boolean;
  sequence: SequenceItem[];
  messages: ViewMessage[];
  memberMap: Map<number, MessageMember>;
  hasMoreMessage: boolean;
}

const chatState = atom<IChatState>({
  key: "chat/common",
  default: {
    online: OnlineStatus.Offline,
    currentConv: undefined,
    socketConvId: undefined,
    loadingSequence: false,
    sequence: [],
    messages: [],
    memberMap: new Map(),
    hasMoreMessage: false,
  },
});

const useChat = () => {
  const { userInfo } = useUserInfo();
  const [chat, setChat] = useRecoilState(chatState);

  const handleSetLoadingSequence = (loading: boolean) => {
    setChat((prev) => ({ ...prev, loadingSequence: loading }));
  };

  const handleSetSequence = (sequence: SequenceItem[]) => {
    setChat((prev) => ({ ...prev, sequence }));
  };

  const handleSetCurrentMemberId = (id?: number) => {
    setChat((prev) => ({ ...prev, currentMemberId: id }));
  };
  const handleSetMemberMap = (map: Map<number, MessageMember>) => {
    setChat((prev) => ({ ...prev, memberMap: map }));
  };
  const handleSetConversation = (conv: Conversation | undefined) => {
    if (!conv) {
      handleSetCurrentMemberId();
      return;
    }

    const members = conv.Members;
    const memberMap = new Map<number, MessageMember>();
    let id: number | undefined = undefined;
    for (let member of members) {
      memberMap.set(member.MemberId, member);
      if (member.UserId === userInfo.user?.UserId) {
        id = member.MemberId;
      }
    }
    handleSetCurrentMemberId(id);
    handleSetMemberMap(memberMap);

    setChat((prev) => ({ ...prev, currentConv: conv }));
  };
  const handleCloseCurrentConversation = () => {
    setChat((prev) => ({
      ...prev,
      currentConv: undefined,
      messages: [],
      memberMap: new Map(),
      hasMoreMessage: false,
    }));
  };
  const handleSetOnline = (online: OnlineStatus) => {
    setChat((prev) => ({ ...prev, online }));
  };

  return {
    chat,
    setChat,
    handleSetOnline,
    handleSetSequence,
    handleSetLoadingSequence,
    handleSetConversation,
    handleCloseCurrentConversation,
  };
};

export default useChat;
