import { ServiceEventModel } from "../model";
import ReconnectingWebSocket from "reconnecting-websocket";

export const serviceEvent = (
  data: ServiceEventModel,
  socket: ReconnectingWebSocket
) => {
  if (data.event === "info" && data.code === 20051) {
    socket.close();
  } else if (data.event === "info" && data.code === 20060) {
    setTimeout(() => {
      socket.close();
    }, 5000);
  }
};

