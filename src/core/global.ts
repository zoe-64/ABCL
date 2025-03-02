import { clearData, updateData, syncData } from "./settings";
(<any>window).clearData = clearData;
(<any>window).saveData = syncData;
(<any>window).mutateData = updateData;

(<any>window).noOp = () => {};
