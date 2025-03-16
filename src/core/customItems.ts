import { AssetManager } from "./../../bc-modding-utilities/src/";
import pamps from "./items/pamps";

export const initCustomItems = () => {
  AssetManager.init(() => {
    pamps();
  });
};
