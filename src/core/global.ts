import { averageColor } from "./player/diaper";
import { clearData, updateData, syncData } from "./settings";
(<any>window).clearData = clearData;
(<any>window).saveData = syncData;
(<any>window).mutateData = updateData;

(<any>window).noOp = () => {};
(<any>window).averageColor = averageColor;
console.log(averageColor("#ffffff", "#928f67", 0.99));
