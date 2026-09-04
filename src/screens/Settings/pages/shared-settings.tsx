import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { settingsRemote } from "src/core/actions/sync";
import { LittlishAPIWrapper } from "src/core/api";
import { getElement, sendChatLocal } from "src/core/utils";
import { ButtonGroup } from "src/screens/components/buttonGroup";
import { Checkbox } from "src/screens/components/checkbox";
import { MetabolismBar } from "src/screens/components/metabolismDropDown";
import { Group } from "src/screens/components/positionComponents";
import { SettingPanel } from "src/screens/components/settingPanel";

export default function SharedSettingsPage({ setPage, selectedCharacter }: { setPage: (page: string) => void; selectedCharacter?: Character }): JSX.Element {
  if (!selectedCharacter) return <div> No Character Selected </div>;
  if (!selectedCharacter.ABCL) return <div> No ABCL Data </div>;
  if (!window.LITTLISH_CLUB) {
    return <div> Littlish Club not installed. Cannot edit settings for {selectedCharacter.Name}</div>;
  }
  if (!LittlishAPIWrapper.isMommyOf(Player, selectedCharacter) && !LittlishAPIWrapper.isCaregiverOf(Player, selectedCharacter))
    return <div> Not a Mommy or Caregiver to {selectedCharacter.Name}</div>;
  const [peeMetabolism, setPeeMetabolism] = useState<MetabolismSetting>(selectedCharacter.ABCL.Settings.PeeMetabolism);
  const [poopMetabolism, setPoopMetabolism] = useState<MetabolismSetting>(selectedCharacter.ABCL.Settings.PoopMetabolism);
  const [mentalMetabolism, setMentalMetabolism] = useState<MetabolismSetting>(selectedCharacter.ABCL.Settings.MentalRegressionModifier);
  const [diaperChangePromptSetting, setDiaperChangePromptSetting] = useState<DiaperChangePromptSetting>(selectedCharacter.ABCL.Settings.OnDiaperChange);
  const [pauseStats, setPauseStats] = useState<boolean>(selectedCharacter.ABCL.Settings.PauseStats);
  const [unPauseStatsWhenDiapered, setUnPauseStatsWhenDiapered] = useState<boolean>(selectedCharacter.ABCL.Settings.UnPauseStatsWhenDiapered);
  const [disableWettingLeaks, setDisableWettingLeaks] = useState<boolean>(selectedCharacter.ABCL.Settings.DisableWettingLeaks);
  const [disableSoilingLeaks, setDisableSoilingLeaks] = useState<boolean>(selectedCharacter.ABCL.Settings.DisableSoilingLeaks);
  const [disableClothingStains, setDisableClothingStains] = useState<boolean>(selectedCharacter.ABCL.Settings.DisableClothingStains);
  const [disableDiaperStains, setDisableDiaperStains] = useState<boolean>(selectedCharacter.ABCL.Settings.DisableDiaperStains);
  const [accidentsByActivities, setAccidentsByActivities] = useState<boolean>(selectedCharacter.ABCL.Settings.AccidentsByActivities);

  const [canChangeDiapers, setCanChangeDiapers] = useState<boolean>(selectedCharacter.ABCL.Settings.CanChangeDiapers);
  const [canChangeSelf, setCanChangeSelf] = useState<boolean>(selectedCharacter.ABCL.Settings.CanChangeSelf);
  const [canUseBathroomWithDiaper, setCanUseBathroomWithDiaper] = useState<boolean>(selectedCharacter.ABCL.Settings.CanUseBathroomWithDiaper);
  const [canCheckDiaperWithRestraints, setCanCheckDiaperWithRestraints] = useState<boolean>(selectedCharacter.ABCL.Settings.CanCheckDiaperWithRestraints);
  const [canUseToilet, setCanUseToilet] = useState<boolean>(selectedCharacter.ABCL.Settings.CanUseToilet);
  const [canUsePotty, setCanUsePotty] = useState<boolean>(selectedCharacter.ABCL.Settings.CanUsePotty);

  const [peeMetabolismLocked, setPeeMetabolismLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.PeeMetabolism);
  const [poopMetabolismLocked, setPoopMetabolismLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.PoopMetabolism);
  const [mentalMetabolismLocked, setMentalMetabolismLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.MentalRegressionModifier);
  const [diaperChangePromptSettingLocked, setDiaperChangePromptSettingLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.OnDiaperChange);
  const [unPauseStatsWhenDiaperedLocked, setUnPauseStatsWhenDiaperedLocked] = useState<boolean>(
    selectedCharacter.ABCL.SettingPermissions.UnPauseStatsWhenDiapered,
  );
  const [pauseStatsLocked, setPauseStatsLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.PauseStats);
  const [disableWettingLeaksLocked, setDisableWettingLeaksLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.DisableWettingLeaks);
  const [disableSoilingLeaksLocked, setDisableSoilingLeaksLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.DisableSoilingLeaks);
  const [disableClothingStainsLocked, setDisableClothingStainsLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.DisableClothingStains);
  const [disableDiaperStainsLocked, setDisableDiaperStainsLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.DisableDiaperStains);
  const [accidentsByActivitiesLocked, setAccidentsByActivitiesLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.AccidentsByActivities);

  const [canChangeDiapersLocked, setCanChangeDiapersLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.CanChangeDiapers);
  const [canChangeSelfLocked, setCanChangeSelfLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.CanChangeSelf);
  const [canUseBathroomWithDiaperLocked, setCanUseBathroomWithDiaperLocked] = useState<boolean>(
    selectedCharacter.ABCL.SettingPermissions.CanUseBathroomWithDiaper,
  );
  const [canCheckDiaperWithRestraintsLocked, setCanCheckDiaperWithRestraintsLocked] = useState<boolean>(
    selectedCharacter.ABCL.SettingPermissions.CanCheckDiaperWithRestraints,
  );

  const [miniGameDifficulty, setMinigameDifficulty] = useState<MiniGameDifficulty>(selectedCharacter.ABCL.Settings.MiniGameDifficulty);
  const [miniGameDifficultyLocked, setMinigameDifficultyLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.MiniGameDifficulty);

  const [canUseToiletLocked, setCanUseToiletLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.CanUseToilet);
  const [canUsePottyLocked, setCanUsePottyLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.CanUsePotty);

  const [incontinenceOnlyIncrease, setIncontinenceOnlyIncrease] = useState<boolean>(selectedCharacter.ABCL.Settings.IncontinenceOnlyIncrease);
  const [incontinenceOnlyIncreaseLocked, setIncontinenceOnlyIncreaseLocked] = useState<boolean>(
    selectedCharacter.ABCL.SettingPermissions.IncontinenceOnlyIncrease,
  );

  const [regressionOnlyIncrease, setRegressionOnlyIncrease] = useState<boolean>(selectedCharacter.ABCL.Settings.MentalRegressionOnlyIncrease);
  const [regressionOnlyIncreaseLocked, setRegressionOnlyIncreaseLocked] = useState<boolean>(
    selectedCharacter.ABCL.SettingPermissions.MentalRegressionOnlyIncrease,
  );

  const [forcePacifiers, setForcePacifiers] = useState<boolean>(selectedCharacter.ABCL.Settings.ForcePacifiers);
  const [forcePacifiersLocked, setForcePacifiersLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.ForcePacifiers);
  const [forceDiapers, setForceDiapers] = useState<boolean>(selectedCharacter.ABCL.Settings.ForceDiapers);
  const [forceDiapersLocked, setForceDiapersLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.ForceDiapers);

  const [prefixNamesWithCaregiverTitles, setPrefixNamesWithCaregiverTitles] = useState<boolean>(selectedCharacter.ABCL.Settings.PrefixNamesWithCaregiverTitles);
  const [prefixNamesWithCaregiverTitlesLocked, setPrefixNamesWithCaregiverTitlesLocked] = useState<boolean>(
    selectedCharacter.ABCL.SettingPermissions.PrefixNamesWithCaregiverTitles,
  );

  const [hideStats, setHideStats] = useState<boolean>(selectedCharacter.ABCL.Settings.HideStats);
  const [hideStatsLocked, setHideStatsLocked] = useState<boolean>(selectedCharacter.ABCL.SettingPermissions.HideStats);

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
              UnPauseStatsWhenDiapered: unPauseStatsWhenDiapered,
              PeeMetabolism: peeMetabolism,
              PoopMetabolism: poopMetabolism,
              MentalRegressionModifier: mentalMetabolism,
              OnDiaperChange: diaperChangePromptSetting,
              DisableClothingStains: disableClothingStains,
              DisableDiaperStains: disableDiaperStains,
              AccidentsByActivities: accidentsByActivities,
              DisableWettingLeaks: disableWettingLeaks,
              DisableSoilingLeaks: disableSoilingLeaks,
              CanChangeSelf: canChangeSelf,
              CanChangeDiapers: canChangeDiapers,
              CanUseBathroomWithDiaper: canUseBathroomWithDiaper,
              CanCheckDiaperWithRestraints: canCheckDiaperWithRestraints,
              CanUseToilet: canUseToilet,
              CanUsePotty: canUsePotty,
              MiniGameDifficulty: miniGameDifficulty,
              IncontinenceOnlyIncrease: incontinenceOnlyIncrease,
              MentalRegressionOnlyIncrease: regressionOnlyIncrease,
              ForceDiapers: forceDiapers,
              ForcePacifiers: forcePacifiers,
              PrefixNamesWithCaregiverTitles: prefixNamesWithCaregiverTitles,
              HideStats: hideStats,
            },
            settingPermissions: {
              PauseStats: pauseStatsLocked,
              UnPauseStatsWhenDiapered: unPauseStatsWhenDiaperedLocked,
              PeeMetabolism: peeMetabolismLocked,
              PoopMetabolism: poopMetabolismLocked,
              MentalRegressionModifier: mentalMetabolismLocked,
              OnDiaperChange: diaperChangePromptSettingLocked,
              DisableClothingStains: disableClothingStainsLocked,
              DisableDiaperStains: disableDiaperStainsLocked,
              AccidentsByActivities: accidentsByActivitiesLocked,
              DisableWettingLeaks: disableWettingLeaksLocked,
              DisableSoilingLeaks: disableSoilingLeaksLocked,
              CanChangeSelf: canChangeSelfLocked,
              CanChangeDiapers: canChangeDiapersLocked,
              CanUseBathroomWithDiaper: canUseBathroomWithDiaperLocked,
              CanCheckDiaperWithRestraints: canCheckDiaperWithRestraintsLocked,
              CanUseToilet: canUseToiletLocked,
              CanUsePotty: canUsePottyLocked,
              MiniGameDifficulty: miniGameDifficultyLocked,
              IncontinenceOnlyIncrease: incontinenceOnlyIncreaseLocked,
              MentalRegressionOnlyIncrease: regressionOnlyIncreaseLocked,
              ForceDiapers: forceDiapersLocked,
              ForcePacifiers: forcePacifiersLocked,
              PrefixNamesWithCaregiverTitles: prefixNamesWithCaregiverTitlesLocked,
              HideStats: hideStatsLocked,
            },
          });
        }}
        className="ABCL-exit-button"
      />
      <Group>
        <SettingPanel title="Pause Stats">
          <Checkbox checked={pauseStats} setChecked={setPauseStats} locked={pauseStatsLocked} setLocked={setPauseStatsLocked} />
        </SettingPanel>
        <SettingPanel title="Resume Stats When Diapered">
          <Checkbox
            checked={unPauseStatsWhenDiapered}
            setChecked={setUnPauseStatsWhenDiapered}
            locked={unPauseStatsWhenDiaperedLocked}
            setLocked={setUnPauseStatsWhenDiaperedLocked}
          />
        </SettingPanel>
        <SettingPanel title="Wetting Leaks / Puddles">
          <Checkbox
            checked={disableWettingLeaks}
            setChecked={setDisableWettingLeaks}
            locked={disableWettingLeaksLocked}
            setLocked={setDisableWettingLeaksLocked}
            inverted
          />
        </SettingPanel>
        <SettingPanel title="Messy Leaks">
          <Checkbox
            checked={disableSoilingLeaks}
            setChecked={setDisableSoilingLeaks}
            locked={disableSoilingLeaksLocked}
            setLocked={setDisableSoilingLeaksLocked}
            inverted
          />
        </SettingPanel>
        <SettingPanel title="Clothing Stains">
          <Checkbox
            checked={disableClothingStains}
            setChecked={setDisableClothingStains}
            locked={disableClothingStainsLocked}
            setLocked={setDisableClothingStainsLocked}
            inverted
          />
        </SettingPanel>
        <SettingPanel title="Diaper Stains">
          <Checkbox
            checked={disableDiaperStains}
            setChecked={setDisableDiaperStains}
            locked={disableDiaperStainsLocked}
            setLocked={setDisableDiaperStainsLocked}
            inverted
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
        <SettingPanel title="Can Change Self">
          <Checkbox checked={canChangeSelf} setChecked={setCanChangeSelf} locked={canChangeSelfLocked} setLocked={setCanChangeSelfLocked} />
        </SettingPanel>
        <SettingPanel title="Can Change Diapers">
          <Checkbox checked={canChangeDiapers} setChecked={setCanChangeDiapers} locked={canChangeDiapersLocked} setLocked={setCanChangeDiapersLocked} />
        </SettingPanel>
        <SettingPanel title="Can Use Potty/Toilet With Diaper">
          <Checkbox
            checked={canUseBathroomWithDiaper}
            setChecked={setCanUseBathroomWithDiaper}
            locked={canUseBathroomWithDiaperLocked}
            setLocked={setCanUseBathroomWithDiaperLocked}
          />
        </SettingPanel>
        <SettingPanel title="Can Check Diaper With Restraints">
          <Checkbox
            checked={canCheckDiaperWithRestraints}
            setChecked={setCanCheckDiaperWithRestraints}
            locked={canCheckDiaperWithRestraintsLocked}
            setLocked={setCanCheckDiaperWithRestraintsLocked}
          />
        </SettingPanel>
        <SettingPanel title="Can Use Toilet">
          <Checkbox checked={canUseToilet} setChecked={setCanUseToilet} locked={canUseToiletLocked} setLocked={setCanUseToiletLocked} />
        </SettingPanel>
        <SettingPanel title="Can Use Potty">
          <Checkbox checked={canUsePotty} setChecked={setCanUsePotty} locked={canUsePottyLocked} setLocked={setCanUsePottyLocked} />
        </SettingPanel>
      </Group>
      <div style={{ height: "0.5em" }}></div>
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
        <SettingPanel title="Minigame Difficulty">
          <ButtonGroup
            locked={miniGameDifficultyLocked}
            options={["Easy", "Normal", "Hard", "Impossible"] satisfies MiniGameDifficulty[]}
            value={miniGameDifficulty}
            setValue={(value: string) => {
              setMinigameDifficulty(value as MiniGameDifficulty);
            }}
            setLocked={setMinigameDifficultyLocked}
          ></ButtonGroup>
        </SettingPanel>
      </Group>
      <div style={{ height: "0.5em" }}></div>
      <Group>
        <SettingPanel title="Incontinence Only Increase">
          <Checkbox
            checked={incontinenceOnlyIncrease}
            setChecked={setIncontinenceOnlyIncrease}
            locked={incontinenceOnlyIncreaseLocked}
            setLocked={setIncontinenceOnlyIncreaseLocked}
          />
        </SettingPanel>
        <SettingPanel title="Mental Regression Only Increase">
          <Checkbox
            checked={regressionOnlyIncrease}
            setChecked={setRegressionOnlyIncrease}
            locked={regressionOnlyIncreaseLocked}
            setLocked={setRegressionOnlyIncreaseLocked}
          />
        </SettingPanel>
        <SettingPanel title="Force Diapers">
          <Checkbox checked={forceDiapers} setChecked={setForceDiapers} locked={forceDiapersLocked} setLocked={setForceDiapersLocked} />
        </SettingPanel>
        <SettingPanel title="Force Pacifiers">
          <Checkbox checked={forcePacifiers} setChecked={setForcePacifiers} locked={forcePacifiersLocked} setLocked={setForcePacifiersLocked} />
        </SettingPanel>
        <SettingPanel title="Prefix Names with Caregiver Titles">
          <Checkbox
            checked={prefixNamesWithCaregiverTitles}
            setChecked={setPrefixNamesWithCaregiverTitles}
            locked={prefixNamesWithCaregiverTitlesLocked}
            setLocked={setPrefixNamesWithCaregiverTitlesLocked}
          />
        </SettingPanel>
        <SettingPanel title="Hide Stats">
          <Checkbox checked={hideStats} setChecked={setHideStats} locked={hideStatsLocked} setLocked={setHideStatsLocked} />
        </SettingPanel>
      </Group>
      <div style={{ height: "10em" }}></div>
    </div>
  );
}
