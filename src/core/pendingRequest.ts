import {
  ChangeDiaperRequestEntry,
  PluginServerChatRoomMessage,
} from "../types/types";
import { generateUniqueID } from "./utils";

export const pendingRequests: Map<string, PendingRequest> = new Map();
export class PendingRequest {
  target: number;
  state: "pending" | "accepted" | "rejected" | "timedout" | "cancelled";
  type: string;
  id: string;
  timeout: number;
  requestTime: number = Date.now();
  constructor(target: number, type: string, timeout: number = 10000) {
    this.target = target;
    this.state = "pending";
    this.type = type;
    this.id = generateUniqueID(type);
    this.timeout = timeout;
    pendingRequests.set(this.id, this);
    setTimeout(() => {
      if (this.state !== "pending") return;
      this.state = "timedout";
      this.sync();
    }, timeout);
    this.sync();
  }
  sync() {
    const message: PluginServerChatRoomMessage = {
      Type: "Hidden",
      Content: `${modIdentifier}Msg`,
      Sender: Player.MemberNumber,
      Target: this.target,
      Dictionary: [
        {
          message: {
            type: this.type,
            state: this.state,
            id: this.id,
          } as ChangeDiaperRequestEntry,
        },
      ],
    };
    ServerSend("ChatRoomChat", message as ServerChatRoomMessage);
  }
  cancel() {
    this.state = "cancelled";
    this.sync();
  }
}
