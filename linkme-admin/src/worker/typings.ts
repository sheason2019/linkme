import { IMachineStatus } from "../../../socket/shared/admin";

export interface MachineStatusMessage {
  type: "machineStatus";
  data: IMachineStatus;
}
