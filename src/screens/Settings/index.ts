import { syncData } from "../../core/settings";
import { ModName } from "../../types/definitions";
import { getElement } from "src/core/utils";
import renderApp from "../App";
import { overlay, resizeElements } from "src/core/player/ui";

export const initSettingsScreen = async () => {
  renderApp();
  PreferenceRegisterExtensionSetting({
    Identifier: modIdentifier,
    ButtonText: `${ModName} Settings`,
    Image: `${publicURL}/abcl.png`,
    run: () => {
      //DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
    },
    click: () => {
      // if (MouseIn(1815, 75, 90, 90)) PreferenceSubscreenExtensionsExit();
    },
    exit: () => {
      getElement(document.body, "#ABCL-settings-page").classList.add(`ABCL-hidden`);
      syncData();
      return true;
    },
    load: () => {
      getElement(document.body, "#ABCL-settings-page").classList.remove(`ABCL-hidden`);
      resizeElements();
    },
  });
};

export const inModSubscreen = () => {
  if (!document.getElementById(`ABCL-settings-page`)) return false;
  if (!document.getElementById(`ABCL-settings-page`)?.classList.contains("ABCL-hidden")) return true;
  return false;
};
