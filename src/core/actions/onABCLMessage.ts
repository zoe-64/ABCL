import { CombinedAction } from "../../types/types";
import { sendChatLocal } from "../utils";

export type onABCLMessageListeners = {
  onABCLMessage: string;
};
export const onABCLMessage: CombinedAction = {
  listeners: {
    onABCLMessage: ({ Sender }, message) => {
      sendChatLocal(message, undefined, "background: #FFA9A93B");
    },
  },
};
