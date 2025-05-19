import { AssetManager } from "@sugarch/bc-asset-manager";
import stroller from "./items/stroller";
import diaperOverwrite from "./items/diaperOverwrite";
export const initCustomItems = () => {
  AssetManager.init(() => {
    diaperOverwrite();
    stroller();
  });
};
