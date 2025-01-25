import { mutateData } from "./settings";

// might be a bit over the top
export const modData = {
  // #region Stats
  set Bladder(value: number) {
    if (value < 0) value = 0;
    if (value > 1) value = 1;

    mutateData({ Stats: { Bladder: { value: value } } });
  },
  set Bowel(value: number) {
    if (value < 0) value = 0;
    if (value > 1) value = 1;

    mutateData({ Stats: { Bowel: { value: value } } });
  },
  set Soiliness(value: number) {
    if (value < 0) value = 0;

    mutateData({ Stats: { Soiliness: { value: value } } });
  },
  set Wetness(value: number) {
    if (value < 0) value = 0;

    mutateData({ Stats: { Wetness: { value: value } } });
  },
  set WaterIntake(value: number) {
    if (value < 0) value = 0;

    mutateData({ Stats: { WaterIntake: { value: value } } });
  },
  set FoodIntake(value: number) {
    if (value < 0) value = 0;

    mutateData({ Stats: { FoodIntake: { value: value } } });
  },

  get Bladder() {
    return Player[modIdentifier].Stats.Bladder.value;
  },
  get Bowel() {
    return Player[modIdentifier].Stats.Bowel.value;
  },
  get Soiliness() {
    return Player[modIdentifier].Stats.Soiliness.value;
  },
  get Wetness() {
    return Player[modIdentifier].Stats.Wetness.value;
  },
  get WaterIntake() {
    return Player[modIdentifier].Stats.WaterIntake.value;
  },
  get FoodIntake() {
    return Player[modIdentifier].Stats.FoodIntake.value;
  },
  // #endregion

  // #region Settings
  set Metabolism(value: MetabolismSettingValues) {
    mutateData({ Settings: { Metabolism: { value: value } } });
  },
  set DisableWetting(value: boolean) {
    mutateData({ Settings: { DisableWetting: { value: value } } });
  },
  set DisableSoiling(value: boolean) {
    mutateData({ Settings: { DisableSoiling: { value: value } } });
  },
  addCaregiver(id: number) {
    mutateData({
      Settings: {
        CaregiverIDs: {
          value: [...Player[modIdentifier].Settings.CaregiverIDs.value, id],
        },
      },
    });
  },
  removeCaregiver(id: number) {
    mutateData({
      Settings: {
        CaregiverIDs: {
          value: Player[modIdentifier].Settings.CaregiverIDs.value.filter(
            (x) => x !== id
          ),
        },
      },
    });
  },
  set OpenRemoteSettings(value: boolean) {
    mutateData({ Settings: { OpenRemoteSettings: { value: value } } });
  },

  get Metabolism() {
    return Player[modIdentifier].Settings.Metabolism.value;
  },
  get DisableWetting() {
    return Player[modIdentifier].Settings.DisableWetting.value;
  },
  get DisableSoiling() {
    return Player[modIdentifier].Settings.DisableSoiling.value;
  },
  get CaregiverIDs() {
    return Player[modIdentifier].Settings.CaregiverIDs.value;
  },
  get OpenRemoteSettings() {
    return Player[modIdentifier].Settings.OpenRemoteSettings.value;
  },

  // #endregion
};

export const handlePlayerUpdate = () => {
  modData.Bladder += 1;
};
