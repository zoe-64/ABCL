import { h } from "preact";

import { ButtonGroup } from "../../components/buttonGroup";
import { Checkbox } from "../../components/checkbox";
import { useState } from "preact/hooks";
import { SettingPanel } from "src/screens/components/settingPanel";
import { MetabolismBar } from "src/screens/components/metabolismDropDown";
import { Group, Stack } from "src/screens/components/positionComponents";
import { SettingsH2 } from "../settingsPage";
import { clearData } from "src/core/settings";
import styled from "@emotion/styled";

const ResetButton = styled.button`
  background-color: #5e1a1a;
  color: var(--abcl-text);
  border: var(--abcl-border);
  padding: 1em;
  cursor: pointer;
  margin-top: 1em;
`;
export default function StatsPage({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
  const [peeMetabolism, setPeeMetabolism] = useState<MetabolismSetting>(Player.ABCL.Settings.PeeMetabolism);
  const [peeMetabolismLocked, _setPeeMetabolismLocked] = useState<boolean>(Player.ABCL.SettingPermissions.PeeMetabolism);
  const [poopMetabolism, setPoopMetabolism] = useState<MetabolismSetting>(Player.ABCL.Settings.PoopMetabolism);
  const [poopMetabolismLocked, _setPoopMetabolismLocked] = useState<boolean>(Player.ABCL.SettingPermissions.PoopMetabolism);
  const [mentalMetabolism, setMentalMetabolism] = useState<MetabolismSetting>(Player.ABCL.Settings.MentalRegressionModifier);
  const [mentalMetabolismLocked, _setMentalMetabolismLocked] = useState<boolean>(Player.ABCL.SettingPermissions.MentalRegressionModifier);
  const [diaperChangePromptSetting, setDiaperChangePromptSetting] = useState<DiaperChangePromptSetting>(Player.ABCL.Settings.OnDiaperChange);
  const [diaperChangePromptSettingLocked, _setDiaperChangePromptSettingLocked] = useState<boolean>(Player.ABCL.SettingPermissions.OnDiaperChange);

  const [pauseStats, setPauseStats] = useState<boolean>(Player.ABCL.Settings.PauseStats);
  const [pauseStatsLocked, _setPauseStatsLocked] = useState<boolean>(Player.ABCL.SettingPermissions.PauseStats);
  const [disableWettingLeaks, setDisableWettingLeaks] = useState<boolean>(Player.ABCL.Settings.DisableWettingLeaks);
  const [disableWettingLeaksLocked, _setDisableWettingLeaksLocked] = useState<boolean>(Player.ABCL.SettingPermissions.DisableWettingLeaks);
  const [disableSoilingLeaks, setDisableSoilingLeaks] = useState<boolean>(Player.ABCL.Settings.DisableSoilingLeaks);
  const [disableSoilingLeaksLocked, _setDisableSoilingLeaksLocked] = useState<boolean>(Player.ABCL.SettingPermissions.DisableSoilingLeaks);
  const [disableClothingStains, setDisableClothingStains] = useState<boolean>(Player.ABCL.Settings.DisableClothingStains);
  const [disableClothingStainsLocked, _setDisableClothingStainsLocked] = useState<boolean>(Player.ABCL.SettingPermissions.DisableClothingStains);
  const [disableDiaperStains, setDisableDiaperStains] = useState<boolean>(Player.ABCL.Settings.DisableDiaperStains);
  const [disableDiaperStainsLocked, _setDisableDiaperStainsLocked] = useState<boolean>(Player.ABCL.SettingPermissions.DisableDiaperStains);
  const [accidentsByActivities, setAccidentsByActivities] = useState<boolean>(Player.ABCL.Settings.AccidentsByActivities);
  const [accidentsByActivitiesLocked, _setAccidentsByActivitiesLocked] = useState<boolean>(Player.ABCL.SettingPermissions.AccidentsByActivities);

  const [expressionsByActivities, setExpressionsByActivities] = useState<boolean>(Player.ABCL.Settings.ExpressionsByActivities);
  const [expressionsByActivitiesLocked, _setExpressionsByActivitiesLocked] = useState<boolean>(Player.ABCL.SettingPermissions.ExpressionsByActivities);
  return (
    <Stack className="ABCL-settings-section">
      <SettingsH2>Wet and Soiling</SettingsH2>
      <button
        onClick={() => {
          setPage("menu");
          Player.ABCL.Settings.PauseStats = pauseStats;
          Player.ABCL.Settings.DisableWettingLeaks = disableWettingLeaks;
          Player.ABCL.Settings.DisableSoilingLeaks = disableSoilingLeaks;
          Player.ABCL.Settings.DisableClothingStains = disableClothingStains;
          Player.ABCL.Settings.DisableDiaperStains = disableDiaperStains;
          Player.ABCL.Settings.AccidentsByActivities = accidentsByActivities;
          Player.ABCL.Settings.ExpressionsByActivities = expressionsByActivities;

          Player.ABCL.Settings.PeeMetabolism = peeMetabolism;
          Player.ABCL.Settings.PoopMetabolism = poopMetabolism;
          Player.ABCL.Settings.MentalRegressionModifier = mentalMetabolism;
          Player.ABCL.Settings.OnDiaperChange = diaperChangePromptSetting;
          Player.ABCL.Settings.ExpressionsByActivities = expressionsByActivities;
        }}
        className="ABCL-exit-button"
      ></button>
      <Group>
        <SettingPanel title="Pause Stats">
          <Checkbox checked={pauseStats} setChecked={setPauseStats} locked={pauseStatsLocked} opaqueLock={true} />
        </SettingPanel>
        <SettingPanel title="Wetting Leaks / Puddles">
          <Checkbox checked={disableWettingLeaks} setChecked={setDisableWettingLeaks} locked={disableWettingLeaksLocked} opaqueLock={true} />
        </SettingPanel>
        <SettingPanel title="Messy Leaks">
          <Checkbox checked={disableSoilingLeaks} setChecked={setDisableSoilingLeaks} locked={disableSoilingLeaksLocked} opaqueLock={true} />
        </SettingPanel>
        <SettingPanel title="Clothing Stains">
          <Checkbox checked={disableClothingStains} setChecked={setDisableClothingStains} locked={disableClothingStainsLocked} opaqueLock={true} />
        </SettingPanel>
        <SettingPanel title="Diaper Stains">
          <Checkbox checked={disableDiaperStains} setChecked={setDisableDiaperStains} locked={disableDiaperStainsLocked} opaqueLock={true} />
        </SettingPanel>
        <SettingPanel title="Accidents by Activities">
          <Checkbox checked={accidentsByActivities} setChecked={setAccidentsByActivities} locked={accidentsByActivitiesLocked} opaqueLock={true} />
        </SettingPanel>
        <SettingPanel title="Expressions by Activities (Experimental)">
          <Checkbox checked={expressionsByActivities} setChecked={setExpressionsByActivities} locked={expressionsByActivitiesLocked} opaqueLock={true} />
        </SettingPanel>
      </Group>
      <Group>
        <SettingPanel title="Pee Metabolism">
          <MetabolismBar value={peeMetabolism} setValue={setPeeMetabolism} locked={peeMetabolismLocked} opaqueLock={true}></MetabolismBar>
        </SettingPanel>
        <SettingPanel title="Bowel Metabolism">
          <MetabolismBar value={poopMetabolism} setValue={setPoopMetabolism} locked={poopMetabolismLocked} opaqueLock={true}></MetabolismBar>
        </SettingPanel>
        <SettingPanel title="Mental Regression">
          <MetabolismBar value={mentalMetabolism} setValue={setMentalMetabolism} locked={mentalMetabolismLocked} opaqueLock={true}></MetabolismBar>
        </SettingPanel>
        <SettingPanel title="On Diaper Change Prompt">
          <ButtonGroup
            locked={diaperChangePromptSettingLocked}
            options={["Deny", "Ask", "Allow"] as DiaperChangePromptSetting[]}
            value={diaperChangePromptSetting}
            setValue={(value: string) => {
              setDiaperChangePromptSetting(value as DiaperChangePromptSetting);
            }}
            opaqueLock={true}
          />
        </SettingPanel>
      </Group>
      <ResetButton
        onClick={() => {
          ToastManager.warning("Warning: This will reset all settings to their default values and reload the page. Are you sure you want to do this?", {
            duration: 10 * 1000,
            buttons: [
              {
                label: "Reset",
                onClick: (ev, toast) => {
                  clearData();
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                  toast?._dismiss?.("click");
                },
              },
              {
                label: "Cancel",
                onClick: (ev, toast) => {
                  toast?._dismiss?.("click");
                },
              },
            ],
          });
        }}
      >
        Reset Settings
      </ResetButton>
      <div style={{ height: "10em" }}></div>
    </Stack>
  );
}
