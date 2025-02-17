import { drawCheckbox } from "../../core/bcUI";
import { abclPlayer } from "../../core/player/player";
import { defaultSettings } from "../../core/settings";
import { ModName } from "../../types/definitions";
export function getMetabolismValue(
  value: MetabolismSettingValues,
  next: boolean
): MetabolismSettingValues {
  if (next) {
    const metabolismMap: Record<
      MetabolismSettingValues,
      MetabolismSettingValues
    > = {
      Slow: "Normal",
      Normal: "Fast",
      Fast: "Faster",
      Faster: "Fastest",
      Fastest: "Slow",
    };
    return metabolismMap[value];
  }
  const metabolismMap: Record<
    MetabolismSettingValues,
    MetabolismSettingValues
  > = {
    Slow: "Fastest",
    Normal: "Slow",
    Fast: "Normal",
    Faster: "Fast",
    Fastest: "Faster",
  };
  return metabolismMap[value];
}

export const initSettingsScreen = async () => {
  PreferenceRegisterExtensionSetting({
    Identifier: modIdentifier,
    ButtonText: `${ModName} Settings`,
    Image: `${publicURL}/abcl.png`,
    run: () => {
      drawCheckbox(
        150,
        130,
        65,
        65,
        "Disable wetting",
        abclPlayer.settings.DisableWetting,
        false,
        "black",
        230,
        35
      );
      drawCheckbox(
        150,
        250,
        65,
        65,
        "Disable soiling",
        abclPlayer.settings.DisableSoiling,
        false,
        "black",
        230,
        35
      );
      DrawText(
        "Metabolism, the speed of your bladder/bowel filling up",
        560,
        420,
        "black"
      );
      DrawBackNextButton(
        150,
        450,
        580,
        90,
        abclPlayer.settings.Metabolism,
        "white",
        "",
        () => getMetabolismValue(abclPlayer.settings.Metabolism, false),
        () => getMetabolismValue(abclPlayer.settings.Metabolism, true)
      );
      DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
    },
    click: () => {
      if (MouseIn(150, 130, 65, 65)) {
        abclPlayer.settings.DisableWetting =
          !abclPlayer.settings.DisableWetting;
      }
      if (MouseIn(150, 250, 65, 65)) {
        abclPlayer.settings.DisableSoiling =
          !abclPlayer.settings.DisableSoiling;
      }

      if (MouseIn(150, 450, 580 / 2, 90)) {
        abclPlayer.settings.Metabolism = getMetabolismValue(
          abclPlayer.settings.Metabolism,
          false
        );
      }
      if (MouseIn(150 + 580 / 2, 450, 580 / 2, 90)) {
        abclPlayer.settings.Metabolism = getMetabolismValue(
          abclPlayer.settings.Metabolism,
          true
        );
      }
      if (MouseIn(1815, 75, 90, 90)) PreferenceSubscreenExtensionsExit();
    },
    exit: () => {
      return true;
    },
    load: () => {},
  });
};
