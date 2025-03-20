import { CombinedAction } from "../../types/types";
import { sendChatLocal } from "../utils";

export type onABCLMessageListeners = {
  onABCLMessage: { message: string; local: boolean };
};
export const onABCLMessage: CombinedAction = {
  listeners: {
    onABCLMessage: ({ Sender }, { message, local }) => {
      sendChatLocal(message, undefined, "background: #FFA9A93B", local);
    },
  },
};
