import { h } from "preact";
import { useState } from "preact/hooks";

import { Checkbox } from "src/screens/components/checkbox";
import { Group } from "src/screens/components/positionComponents";
import { SettingPanel } from "src/screens/components/settingPanel";
import { SettingsH2 } from "../settingsPage";
import { isOwned } from "src/core/player/diaper";

export default function MessagesPage({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
  const [wetDiaper, setWetDiaper] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.wetDiaper);
  const [wetClothing, setWetClothing] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.wetClothing);
  const [soilDiaper, setSoilDiaper] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.soilDiaper);
  const [soilClothing, setSoilClothing] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.soilClothing);
  const [changeDiaper, setChangeDiaper] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.changeDiaper);
  const [checkDiaper, setCheckDiaper] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.checkDiaper);
  const [lickPuddle, setLickPuddle] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.lickPuddle);
  const [wipePuddle, setWipePuddle] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.wipePuddle);
  const [usePotty, setUsePotty] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.usePotty);
  const [useToilet, setUseToilet] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.useToilet);
  const [statusMessages, setStatusMessages] = useState<boolean>(Player.ABCL.Settings.VisibleMessages.statusMessages);

  const [wetDiaperLocked, _setWetDiaperLocked] = useState<boolean>(Player.ABCL.SettingPermissions.wetDiaper);
  const [wetClothingLocked, _setWetClothingLocked] = useState<boolean>(Player.ABCL.SettingPermissions.wetClothing);
  const [soilDiaperLocked, _setSoilDiaperLocked] = useState<boolean>(Player.ABCL.SettingPermissions.soilDiaper);
  const [soilClothingLocked, _setSoilClothingLocked] = useState<boolean>(Player.ABCL.SettingPermissions.soilClothing);
  const [changeDiaperLocked, _setChangeDiaperLocked] = useState<boolean>(Player.ABCL.SettingPermissions.changeDiaper);
  const [checkDiaperLocked, _setCheckDiaperLocked] = useState<boolean>(Player.ABCL.SettingPermissions.checkDiaper);
  const [lickPuddleLocked, _setLickPuddleLocked] = useState<boolean>(Player.ABCL.SettingPermissions.lickPuddle);
  const [wipePuddleLocked, _setWipePuddleLocked] = useState<boolean>(Player.ABCL.SettingPermissions.wipePuddle);
  const [usePottyLocked, _setUsePottyLocked] = useState<boolean>(Player.ABCL.SettingPermissions.usePotty);
  const [useToiletLocked, _setUseToiletLocked] = useState<boolean>(Player.ABCL.SettingPermissions.useToilet);
  const [statusMessagesLocked, _setStatusMessagesLocked] = useState<boolean>(Player.ABCL.SettingPermissions.statusMessages);

  const [wetness, setWetness] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Wetness"] ?? false);
  const [soiliness, setSoiliness] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Soiliness"] ?? false);
  const [bladder, setBladder] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Bladder"] ?? false);
  const [bowel, setBowel] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Bowel"] ?? false);
  const [incontinence, setIncontinence] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Incontinence"] ?? false);
  const [mentalRegression, setMentalRegression] = useState<boolean>(Player.ABCL.Settings.StatusMessages["MentalRegression"] ?? false);
  const [puddleSize, setPuddleSize] = useState<boolean>(Player.ABCL.Settings.StatusMessages["PuddleSize"] ?? false);

  return (
    <div>
      <button
        onClick={() => {
          setPage("menu");
          Player.ABCL.Settings.VisibleMessages.wetDiaper = wetDiaper;
          Player.ABCL.Settings.VisibleMessages.wetClothing = wetClothing;
          Player.ABCL.Settings.VisibleMessages.soilDiaper = soilDiaper;
          Player.ABCL.Settings.VisibleMessages.soilClothing = soilClothing;
          Player.ABCL.Settings.VisibleMessages.changeDiaper = changeDiaper;
          Player.ABCL.Settings.VisibleMessages.checkDiaper = checkDiaper;
          Player.ABCL.Settings.VisibleMessages.lickPuddle = lickPuddle;
          Player.ABCL.Settings.VisibleMessages.wipePuddle = wipePuddle;
          Player.ABCL.Settings.VisibleMessages.usePotty = usePotty;
          Player.ABCL.Settings.VisibleMessages.useToilet = useToilet;
          Player.ABCL.Settings.VisibleMessages.statusMessages = statusMessages;

          Player.ABCL.Settings.StatusMessages["Wetness"] = wetness;
          Player.ABCL.Settings.StatusMessages["Soiliness"] = soiliness;
          Player.ABCL.Settings.StatusMessages["Bladder"] = bladder;
          Player.ABCL.Settings.StatusMessages["Bowel"] = bowel;
          Player.ABCL.Settings.StatusMessages["Incontinence"] = incontinence;
          Player.ABCL.Settings.StatusMessages["MentalRegression"] = mentalRegression;
          Player.ABCL.Settings.StatusMessages["PuddleSize"] = puddleSize;

          Player.ABCL.SettingPermissions.wetDiaper = wetDiaperLocked;
          Player.ABCL.SettingPermissions.wetClothing = wetClothingLocked;
          Player.ABCL.SettingPermissions.soilDiaper = soilDiaperLocked;
          Player.ABCL.SettingPermissions.soilClothing = soilClothingLocked;
          Player.ABCL.SettingPermissions.changeDiaper = changeDiaperLocked;
          Player.ABCL.SettingPermissions.checkDiaper = checkDiaperLocked;
          Player.ABCL.SettingPermissions.lickPuddle = lickPuddleLocked;
          Player.ABCL.SettingPermissions.wipePuddle = wipePuddleLocked;
          Player.ABCL.SettingPermissions.usePotty = usePottyLocked;
          Player.ABCL.SettingPermissions.useToilet = useToiletLocked;
          Player.ABCL.SettingPermissions.statusMessages = statusMessagesLocked;
        }}
        className="ABCL-exit-button"
      ></button>
      <div>
        <SettingsH2>Visible Messages to Players</SettingsH2>
        <Group>
          <SettingPanel title="Wetting Diapers">
            <Checkbox checked={wetDiaper} setChecked={setWetDiaper} locked={wetDiaperLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Wetting Clothes">
            <Checkbox checked={wetClothing} setChecked={setWetClothing} locked={wetClothingLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Soiling Diapers">
            <Checkbox checked={soilDiaper} setChecked={setSoilDiaper} locked={soilDiaperLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Soiling Clothes">
            <Checkbox checked={soilClothing} setChecked={setSoilClothing} locked={soilClothingLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Changing Diapers">
            <Checkbox checked={changeDiaper} setChecked={setChangeDiaper} locked={changeDiaperLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Checking Diapers">
            <Checkbox checked={checkDiaper} setChecked={setCheckDiaper} locked={checkDiaperLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Licking Puddles">
            <Checkbox checked={lickPuddle} setChecked={setLickPuddle} locked={lickPuddleLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Wiping Puddle">
            <Checkbox checked={wipePuddle} setChecked={setWipePuddle} locked={wipePuddleLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Using Potty">
            <Checkbox checked={usePotty} setChecked={setUsePotty} locked={usePottyLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Using Toilet">
            <Checkbox checked={useToilet} setChecked={setUseToilet} locked={useToiletLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Show Status Messages">
            <Checkbox checked={statusMessages} setChecked={setStatusMessages} locked={statusMessagesLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
        </Group>
      </div>
      <div>
        <SettingsH2>Visible Status Messages to Yourself</SettingsH2>
        <Group>
          <SettingPanel title="Show wetness status message">
            <Checkbox checked={wetness} setChecked={setWetness} showLock={false} />
          </SettingPanel>
          <SettingPanel title="Show soiliness status message">
            <Checkbox checked={soiliness} setChecked={setSoiliness} showLock={false} />
          </SettingPanel>
          <SettingPanel title="Show bladder status message">
            <Checkbox checked={bladder} setChecked={setBladder} showLock={false} />
          </SettingPanel>
          <SettingPanel title="Show bowel status message">
            <Checkbox checked={bowel} setChecked={setBowel} showLock={false} />
          </SettingPanel>
          <SettingPanel title="Show incontinence status message">
            <Checkbox checked={incontinence} setChecked={setIncontinence} showLock={false} />
          </SettingPanel>
          <SettingPanel title="Show puddle size status message">
            <Checkbox checked={puddleSize} setChecked={setPuddleSize} showLock={false} />
          </SettingPanel>
          <SettingPanel title="Show mental regression status message">
            <Checkbox checked={mentalRegression} setChecked={setMentalRegression} showLock={false} />
          </SettingPanel>
        </Group>
      </div>
    </div>
  );
}
