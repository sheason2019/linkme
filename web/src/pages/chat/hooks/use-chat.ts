import { useEffect } from "react";
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

interface IChatState {
  currentConv: Conversation | undefined;
  currentMemberId?: number;
  loadingSequence: boolean;
  sequence: SequenceItem[];
  messages: ViewMessage[];
  memberMap: Map<number, MessageMember>;
}

const chatState = atom<IChatState>({
  key: "chat/common",
  default: {
    currentConv: undefined,
    loadingSequence: false,
    sequence: [],
    messages: [],
    memberMap: new Map(),
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

  // 根据得到的会话信息自动设置用户在当前会话中的成员ID
  useEffect(() => {
    if (!chat.currentConv) {
      handleSetCurrentMemberId();
      return;
    }

    const members = chat.currentConv?.Members;
    const memberMap = new Map<number, MessageMember>();
    let id: number | undefined = undefined;
    for (let member of members) {
      console.log(member);
      memberMap.set(member.MemberId, member);
      if (member.UserId === userInfo.user?.UserId) {
        id = member.MemberId;
      }
    }
    handleSetCurrentMemberId(id);
    handleSetMemberMap(memberMap);
  }, [chat.currentConv]);

  return {
    chat,
    setChat,
    handleSetSequence,
    handleSetLoadingSequence,
  };
};

export default useChat;
