import { AssetManager } from "@sugarch/bc-asset-manager";
import stroller from "./items/stroller";

export const initCustomItems = () => {
  AssetManager.init(() => {
    stroller();
  });
};
