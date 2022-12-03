export interface IMachineStatus {
  cpuPercent: number;
  memSize: number;
  memUsed: number;
  diskSize: number;
  diskUsed: number;
}

export interface AdminServerToClientEvents {
  machineStatus: (machineStatus: IMachineStatus) => void;
}
