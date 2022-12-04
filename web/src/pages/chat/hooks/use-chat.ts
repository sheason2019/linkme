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
  // 当前IM的在线状态
  online: OnlineStatus;

  // 因为拉取会话信息是使用HTTP请求，而进入会话是使用Socket.io的长连接实现
  // 所以下面两个信息可能存在不同步的问题，因此必须等前端和服务端的数据校对完毕之后
  // 才可以确认用户已经进入指定的会话

  // 当前存储的会话信息
  currentConv: Conversation | undefined;
  // Socket正在连接的会话ID
  socketConvId: number | undefined;
  // 用户在指定会话中的成员ID
  currentMemberId?: number;
  // 是否正在加载消息列表
  loadingSequence: boolean;
  // 消息列表
  sequence: SequenceItem[];

  // 当前会话的消息，这个实现其实很不好，因为没有对已经拉取到的信息做缓存
  // 后续会参照之前的实现把Message缓存和定额GC加入进来，但可能需要一定的时间
  messages: ViewMessage[];
  // 成员Map，用来索引各个成员的信息
  memberMap: Map<number, MessageMember>;
  // 是否有更多消息，这个实现主要是为了方便，但未来在实现根据用户搜索的内容跳转
  // 到指定会话位置功能的时候，可能会引发一些问题，那时候用户除了拉取更早的信息，
  // 还有可能会拉取更晚的信息进行查阅，到时候这里可能还要再添加一个字段，
  // 判断是否有更晚的消息，并提供拉取交互
  hasMoreMessage: boolean;
}

const DEFAULT_CHAT_STATE: IChatState = {
  online: OnlineStatus.Offline,
  currentConv: undefined,
  socketConvId: undefined,
  loadingSequence: false,
  sequence: [],
  messages: [],
  memberMap: new Map(),
  hasMoreMessage: false,
};

const chatState = atom<IChatState>({
  key: "chat/common",
  default: DEFAULT_CHAT_STATE,
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

  const handleResetChatState = () => {
    setChat(DEFAULT_CHAT_STATE);
  };

  return {
    chat,
    setChat,
    handleSetOnline,
    handleSetSequence,
    handleResetChatState,
    handleSetConversation,
    handleSetLoadingSequence,
    handleCloseCurrentConversation,
  };
};

export default useChat;
