import { AssetManager } from "@sugarch/bc-asset-manager";
import untrainersThin from "./items/untrainersThin";
import highchair from "./items/highchair";
import stroller from "./items/stroller";

export const initCustomItems = () => {
  AssetManager.init(() => {
    untrainersThin();
    highchair();
    stroller();
  });
};
