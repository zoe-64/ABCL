import { averageColor } from "./player/diaper";
import { clearData, updateData, syncData } from "./settings";
import { sendChatLocal } from "./utils";
(<any>window).clearData = clearData;
(<any>window).saveData = syncData;
(<any>window).mutateData = updateData;

(<any>window).noOp = () => {};
(<any>window).sendChatLocal = sendChatLocal;
(<any>window).averageColor = averageColor;
console.log(averageColor("#ffffff", "#928f67", 0.99));
