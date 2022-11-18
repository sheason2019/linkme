// 由于聊天信息是一个高频变化的数据，使用全量更新来更新聊天信息显然是不可能的
// 这里通过抽离出一个Hooks来帮助应用程序进行聊天信息的更新

import { ViewMessage } from "./use-chat";

let map: Map<number | string, ViewMessage> = new Map();

const useMessageUpdater = () => {
  const handleClearMarkMessage = (mark: string) => {
    map.delete(mark);
  };

  const handleUpdateMessage = (msgArr: ViewMessage[]) => {
    msgArr.forEach((msg) => {
      map.set(msg.Id === 0 && msg.Mark ? msg.Mark : msg.Id, msg);
    });
  };

  const handleGetMessages = (): ViewMessage[] => {
    const msgArr: ViewMessage[] = [];
    map.forEach((msg) => {
      msgArr.push(msg);
    });
    return msgArr.sort((a, b) => a.TimeStamp - b.TimeStamp);
  };

  const handleClearMessages = () => (map = new Map());

  return {
    handleUpdateMessage,
    handleGetMessages,
    handleClearMessages,
    handleClearMarkMessage,
  };
};

export default useMessageUpdater;
