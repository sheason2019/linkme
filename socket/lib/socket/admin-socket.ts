import { Socket } from "socket.io";
import { AdminServerToClientEvents, IMachineStatus } from "../../shared/admin";
import { getCPUUsage, getDiskInfo, getMemInfo } from "../machine-status";

let count = 0;
let timer: NodeJS.Timer | null = null;

let machineStatus: IMachineStatus | null = null;

function setCount(next: number) {
  count = next;

  if (next > 0 && !timer) {
    // 开始拉取本机信息
    createStatusInterval();
  }
  if (next === 0 && !!timer) {
    // 停止拉取本机信息
    clearStatusInverval();
  }
}

// 创建拉取本机信息计时器
function createStatusInterval() {
  timer = setInterval(async () => {
    const memInfo = getMemInfo();
    const diskInfo = await getDiskInfo();
    const cpuUsage = await getCPUUsage();

    machineStatus = {
      cpuPercent: cpuUsage,
      memSize: memInfo.totalMem,
      memUsed: memInfo.freeMem,
      diskSize: diskInfo.blocks,
      diskUsed: diskInfo.used,
    };
  }, 3000);
}

// 关闭拉取本机信息计时器
function clearStatusInverval() {
  timer && clearInterval(timer);
  timer = null;
}

const initAdminSocket = (socket: Socket<AdminServerToClientEvents>) => {
  setCount(count + 1);

  const emitTimer = setInterval(() => {
    !!machineStatus && socket.emit("machineStatus", machineStatus);
  }, 3000);

  socket.on("disconnect", () => {
    setCount(count - 1);
    clearInterval(emitTimer);
  });
};

export default initAdminSocket;
