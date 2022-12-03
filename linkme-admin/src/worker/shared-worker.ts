import io, { Socket } from "socket.io-client";
import { AdminServerToClientEvents } from "../../../socket/shared/admin";
import { MachineStatusMessage } from "./typings";

const sharedWorkerGlobal: SharedWorkerGlobalScope = self;

const ports = new Set<MessagePort>();

sharedWorkerGlobal.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);
};

const socket: Socket<AdminServerToClientEvents> = io("/admin");
socket.on("machineStatus", (msg) => {
  const msm: MachineStatusMessage = {
    type: "machineStatus",
    data: msg,
  };
  ports.forEach((p) => {
    p.postMessage(msm);
  });
});
