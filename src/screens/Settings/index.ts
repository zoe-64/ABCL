import { ModName } from "../../types/definitions";

export const initSettingsScreen = async () => {
  PreferenceRegisterExtensionSetting({
    Identifier: modIdentifier,
    ButtonText: `${ModName} Settings`,
    Image: `${publicURL}/abcl.png`,
    click: () => {},
    run: () => {},
    exit: () => {
      return true;
    },
    load: () => {},
  });
};
