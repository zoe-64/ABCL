import { h } from "preact";

import { useState } from "preact/hooks";
import { isOwned } from "src/core/player/diaper";
import { Group, Stack } from "src/screens/components/positionComponents";
import { SettingPanel } from "src/screens/components/settingPanel";
import { Checkbox } from "../../components/checkbox";
import { SettingsH2 } from "../settingsPage";

export default function CruelPage({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
  const [incontinenceOnlyIncrease, setIncontinenceOnlyIncrease] = useState<boolean>(Player.ABCL.Settings.IncontinenceOnlyIncrease);
  const [incontinenceOnlyIncreaseLocked, _setIncontinenceOnlyIncreaseLocked] = useState<boolean>(Player.ABCL.SettingPermissions.IncontinenceOnlyIncrease);

  const [regressionOnlyIncrease, setRegressionOnlyIncrease] = useState<boolean>(Player.ABCL.Settings.MentalRegressionOnlyIncrease);
  const [regressionOnlyIncreaseLocked, _setRegressionOnlyIncreaseLocked] = useState<boolean>(Player.ABCL.SettingPermissions.MentalRegressionOnlyIncrease);

  const [forceDiapers, setForceDiapers] = useState<boolean>(Player.ABCL.Settings.ForceDiapers);
  const [forceDiapersLocked, _setForceDiapersLocked] = useState<boolean>(Player.ABCL.SettingPermissions.ForceDiapers);

  const [forcePacifiers, setForcePacifiers] = useState<boolean>(Player.ABCL.Settings.ForcePacifiers);
  const [forcePacifiersLocked, _setForcePacifiersLocked] = useState<boolean>(Player.ABCL.SettingPermissions.ForcePacifiers);

  const [prefixNamesWithCaregiverTitles, setPrefixNamesWithCaregiverTitles] = useState<boolean>(Player.ABCL.Settings.PrefixNamesWithCaregiverTitles);
  const [prefixNamesWithCaregiverTitlesLocked, _setPrefixNamesWithCaregiverTitlesLocked] = useState<boolean>(
    Player.ABCL.SettingPermissions.PrefixNamesWithCaregiverTitles,
  );

  const [hideStats, setHideStats] = useState<boolean>(Player.ABCL.Settings.HideStats);
  const [hideStatsLocked, _setHideStatsLocked] = useState<boolean>(Player.ABCL.SettingPermissions.HideStats);

  return (
    <Stack className="ABCL-settings-section">
      <SettingsH2>Cruel section of ABCL</SettingsH2>
      <button
        onClick={() => {
          setPage("menu");

          Player.ABCL.Settings.IncontinenceOnlyIncrease = incontinenceOnlyIncrease;
          Player.ABCL.Settings.MentalRegressionOnlyIncrease = regressionOnlyIncrease;
          Player.ABCL.Settings.ForceDiapers = forceDiapers;
          Player.ABCL.Settings.ForcePacifiers = forcePacifiers;
          Player.ABCL.Settings.PrefixNamesWithCaregiverTitles = prefixNamesWithCaregiverTitles;
          Player.ABCL.Settings.HideStats = hideStats;
        }}
        className="ABCL-exit-button"
      ></button>
      <Group>
        <SettingPanel title="Incontinence Only Increase">
          <Checkbox
            checked={incontinenceOnlyIncrease}
            setChecked={setIncontinenceOnlyIncrease}
            locked={incontinenceOnlyIncreaseLocked && isOwned()}
            opaqueLock={true}
          />
        </SettingPanel>
        <SettingPanel title="Mental Regression Only Increase">
          <Checkbox
            checked={regressionOnlyIncrease}
            setChecked={setRegressionOnlyIncrease}
            locked={regressionOnlyIncreaseLocked && isOwned()}
            opaqueLock={true}
          />
        </SettingPanel>
        <SettingPanel title="Force Diapers">
          <Checkbox checked={forceDiapers} setChecked={setForceDiapers} locked={forceDiapersLocked && isOwned()} opaqueLock={true} />
        </SettingPanel>
        <SettingPanel title="Force Pacifiers">
          <Checkbox checked={forcePacifiers} setChecked={setForcePacifiers} locked={forcePacifiersLocked && isOwned()} opaqueLock={true} />
        </SettingPanel>
        <SettingPanel title="Prefix Names with Caregiver Titles">
          <Checkbox
            checked={prefixNamesWithCaregiverTitles}
            setChecked={setPrefixNamesWithCaregiverTitles}
            locked={prefixNamesWithCaregiverTitlesLocked && isOwned()}
            opaqueLock={true}
          />
        </SettingPanel>
        <SettingPanel title="Hide Stats">
          <Checkbox checked={hideStats} setChecked={setHideStats} locked={hideStatsLocked && isOwned()} opaqueLock={true} />
        </SettingPanel>
      </Group>
      <div style={{ height: "10em" }}></div>
    </Stack>
  );
}
