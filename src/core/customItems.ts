import { AssetManager } from "@sugarch/bc-asset-manager";
import pamps from "./items/untrainerPamps";
import { bcModSDK } from "./utils";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import tempPamp from "./items/tempPamp";
import highchair from "./items/highchair";
import stroller from "./items/stroller";

export const initCustomItems = () => {
  HookManager.initWithMod(bcModSDK);
  AssetManager.init(() => {
    pamps();
    tempPamp();
    highchair();
    stroller();
  });
};
