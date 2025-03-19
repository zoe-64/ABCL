import { AssetManager } from "@sugarch/bc-asset-manager";
import pamps from "./items/untrainerPamps";
import { bcModSDK } from "./utils";
import { HookManager } from "@sugarch/bc-mod-hook-manager";

export const initCustomItems = () => {
  HookManager.initWithMod(bcModSDK);
  AssetManager.init(() => {
    pamps();
  });
};
