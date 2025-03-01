import { clearData, mutateData, saveData } from "./settings";
(<any>window).clearData = clearData;
(<any>window).saveData = saveData;
(<any>window).mutateData = mutateData;

(<any>window).noOp = () => {};
