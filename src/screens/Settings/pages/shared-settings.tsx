import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { settingsRemote } from "src/core/actions/sync";
import { getElement, sendChatLocal } from "src/core/utils";
import { ButtonGroup } from "src/screens/components/buttonGroup";
import { Checkbox } from "src/screens/components/checkbox";
import { MetabolismBar } from "src/screens/components/metabolismDropDown";
import { Group } from "src/screens/components/positionComponents";
import { SettingPanel } from "src/screens/components/settingPanel";

export default function SharedSettingsPage({ setPage, selectedCharacter }: { setPage: (page: string) => void; selectedCharacter?: Character }): JSX.Element {
  if (!selectedCharacter) return <div> No Character Selected </div>;
  if (!selectedCharacter.ABCL) return <div> No ABCL Data </div>;
  if (!window.LITTLISH_CLUB.isMommyOf(Player, selectedCharacter) && !window.LITTLISH_CLUB.isCaregiverOf(Player, selectedCharacter))
    return <div> Not a Mommy or Caregiver to this Character </div>;
  const [peeMetabolism, setPeeMetabolism] = useState<MetabolismSetting>(selectedCharacter.ABCL.Settings.PeeMetabolism);
  const [poopMetabolism, setPoopMetabolism] = useState<MetabolismSetting>(selectedCharacter.ABCL.Settings.PoopMetabolism);
  const [mentalMetabolism, setMentalMetabolism] = useState<MetabolismSetting>(selectedCharacter.ABCL.Settings.MentalRegressionModifier);
  const [diaperChangePromptSetting, setDiaperChangePromptSetting] = useState<DiaperChangePromptSetting>(selectedCharacter.ABCL.Settings.OnDiaperChange);
  const [pauseStats, setPauseStats] = useState<boolean>(selectedCharacter.ABCL.Settings.PauseStats);
  const [disableWettingLeaks, setDisableWettingLeaks] = useState<boolean>(selectedCharacter.ABCL.Settings.DisableWettingLeaks);
  const [disableSoilingLeaks, setDisableSoilingLeaks] = useState<boolean>(selectedCharacter.ABCL.Settings.DisableSoilingLeaks);
  const [disableClothingStains, setDisableClothingStains] = useState<boolean>(selectedCharacter.ABCL.Settings.DisableClothingStains);
  const [disableDiaperStains, setDisableDiaperStains] = useState<boolean>(selectedCharacter.ABCL.Settings.DisableDiaperStains);
  const [accidentsByActivities, setAccidentsByActivities] = useState<boolean>(selectedCharacter.ABCL.Settings.AccidentsByActivities);

  const [peeMetabolismLocked, setPeeMetabolismLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.PeeMetabolism);
  const [poopMetabolismLocked, setPoopMetabolismLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.PoopMetabolism);
  const [mentalMetabolismLocked, setMentalMetabolismLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.MentalRegressionModifier);
  const [diaperChangePromptSettingLocked, setDiaperChangePromptSettingLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.OnDiaperChange);
  const [pauseStatsLocked, setPauseStatsLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.PauseStats);
  const [disableWettingLeaksLocked, setDisableWettingLeaksLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.DisableWettingLeaks);
  const [disableSoilingLeaksLocked, setDisableSoilingLeaksLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.DisableSoilingLeaks);
  const [disableClothingStainsLocked, setDisableClothingStainsLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.DisableClothingStains);
  const [disableDiaperStainsLocked, setDisableDiaperStainsLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.DisableDiaperStains);
  const [accidentsByActivitiesLocked, setAccidentsByActivitiesLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.AccidentsByActivities);
  return (
    <div>
      <button
        onClick={() => {
          getElement(document.body, "#ABCL-settings-page").classList.add(`ABCL-hidden`);
          setPage("menu");
          InformationSheetLoadCharacter(selectedCharacter);
          ToastManager.success(`Updated ${selectedCharacter.Name}'s settings.`);
          sendChatLocal(`Updated ${selectedCharacter.Name}'s settings.`);
          InformationSheetReturnScreen = ["Online", "ChatRoom"];
          if (!selectedCharacter.ABCL || typeof selectedCharacter.MemberNumber !== "number") return;
          settingsRemote.emit(selectedCharacter.MemberNumber, "updateSettings", {
            settings: {
              PauseStats: pauseStats,
              PeeMetabolism: peeMetabolism,
              PoopMetabolism: poopMetabolism,
              MentalRegressionModifier: mentalMetabolism,
              OnDiaperChange: diaperChangePromptSetting,
              DisableClothingStains: disableClothingStains,
              DisableDiaperStains: disableDiaperStains,
              AccidentsByActivities: accidentsByActivities,
              DisableWettingLeaks: disableWettingLeaks,
              DisableSoilingLeaks: disableSoilingLeaks,
            },
            settingPermissions: {
              PauseStats: pauseStatsLocked,
              PeeMetabolism: peeMetabolismLocked,
              PoopMetabolism: poopMetabolismLocked,
              MentalRegressionModifier: mentalMetabolismLocked,
              OnDiaperChange: diaperChangePromptSettingLocked,
              DisableClothingStains: disableClothingStainsLocked,
              DisableDiaperStains: disableDiaperStainsLocked,
              AccidentsByActivities: accidentsByActivitiesLocked,
              DisableWettingLeaks: disableWettingLeaksLocked,
              DisableSoilingLeaks: disableSoilingLeaksLocked,
            },
          });
        }}
        className="ABCL-exit-button"
      />
      <Group>
        <SettingPanel title="Pause Stats">
          <Checkbox checked={pauseStats} setChecked={setPauseStats} locked={pauseStatsLocked} setLocked={setPauseStatsLocked} />
        </SettingPanel>
        <SettingPanel title="Wetting Leaks / Puddles">
          <Checkbox
            checked={disableWettingLeaks}
            setChecked={setDisableWettingLeaks}
            locked={disableWettingLeaksLocked}
            setLocked={setDisableWettingLeaksLocked}
          />
        </SettingPanel>
        <SettingPanel title="Messy Leaks">
          <Checkbox
            checked={disableSoilingLeaks}
            setChecked={setDisableSoilingLeaks}
            locked={disableSoilingLeaksLocked}
            setLocked={setDisableSoilingLeaksLocked}
          />
        </SettingPanel>
        <SettingPanel title="Clothing Stains">
          <Checkbox
            checked={disableClothingStains}
            setChecked={setDisableClothingStains}
            locked={disableClothingStainsLocked}
            setLocked={setDisableClothingStainsLocked}
          />
        </SettingPanel>
        <SettingPanel title="Diaper Stains">
          <Checkbox
            checked={disableDiaperStains}
            setChecked={setDisableDiaperStains}
            locked={disableDiaperStainsLocked}
            setLocked={setDisableDiaperStainsLocked}
          />
        </SettingPanel>
        <SettingPanel title="Accidents by Activities">
          <Checkbox
            checked={accidentsByActivities}
            setChecked={setAccidentsByActivities}
            locked={accidentsByActivitiesLocked}
            setLocked={setAccidentsByActivitiesLocked}
          />
        </SettingPanel>
      </Group>
      <Group>
        <SettingPanel title="Pee Metabolism">
          <MetabolismBar value={peeMetabolism} setValue={setPeeMetabolism} locked={peeMetabolismLocked} setLocked={setPeeMetabolismLocked}></MetabolismBar>
        </SettingPanel>
        <SettingPanel title="Bowel Metabolism">
          <MetabolismBar value={poopMetabolism} setValue={setPoopMetabolism} locked={poopMetabolismLocked} setLocked={setPoopMetabolismLocked}></MetabolismBar>
        </SettingPanel>
        <SettingPanel title="Mental Regression">
          <MetabolismBar
            value={mentalMetabolism}
            setValue={setMentalMetabolism}
            locked={mentalMetabolismLocked}
            setLocked={setMentalMetabolismLocked}
          ></MetabolismBar>
        </SettingPanel>
        <SettingPanel title="On Diaper Change Prompt">
          <ButtonGroup
            locked={diaperChangePromptSettingLocked}
            options={["Deny", "Ask", "Allow"] as DiaperChangePromptSetting[]}
            value={diaperChangePromptSetting}
            setValue={(value: string) => {
              setDiaperChangePromptSetting(value as DiaperChangePromptSetting);
            }}
            setLocked={setDiaperChangePromptSettingLocked}
          />
        </SettingPanel>
      </Group>
      <div style={{ height: "10em" }}></div>
    </div>
  );
}
