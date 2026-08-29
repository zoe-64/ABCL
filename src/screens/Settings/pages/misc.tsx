import { h } from "preact";
import { useState } from "preact/hooks";

import { isOwned } from "src/core/player/diaper";
import { Checkbox } from "src/screens/components/checkbox";
import { Group } from "src/screens/components/positionComponents";
import { SettingPanel } from "src/screens/components/settingPanel";
import { SettingsH2 } from "../settingsPage";

export default function MiscPage({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
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

  const [canChangeDiapers, setCanChangeDiapers] = useState<boolean>(Player.ABCL.Settings.CanChangeDiapers);
  const [canChangeSelf, _setCanChangeSelf] = useState<boolean>(Player.ABCL.Settings.CanChangeSelf);
  const [canUseBathroomWithDiaper, _setCanUseBathroomWithDiaper] = useState<boolean>(Player.ABCL.Settings.CanUseBathroomWithDiaper);
  const [canCheckDiaperWithRestraints, _setCanCheckDiaperWithRestraints] = useState<boolean>(Player.ABCL.Settings.CanCheckDiaperWithRestraints);
  const [canUseToilet, _setCanUseToilet] = useState<boolean>(Player.ABCL.Settings.CanUseToilet);
  const [canUsePotty, _setCanUsePotty] = useState<boolean>(Player.ABCL.Settings.CanUsePotty);

  const [disableParticles, setDisableParticles] = useState<boolean>(Player.ABCL.Settings.DisableParticles);

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

  const [canChangeDiapersLocked, _setCanChangeDiapersLocked] = useState<boolean>(Player.ABCL.SettingPermissions.CanChangeDiapers);
  const [canChangeSelfLocked, _setCanChangeSelfLocked] = useState<boolean>(Player.ABCL.SettingPermissions.CanChangeSelf);
  const [canUseBathroomWithDiaperLocked, _setCanUseBathroomWithDiaperLocked] = useState<boolean>(Player.ABCL.SettingPermissions.CanUseBathroomWithDiaper);
  const [canCheckDiaperWithRestraintsLocked, _setCanCheckDiaperWithRestraintsLocked] = useState<boolean>(
    Player.ABCL.SettingPermissions.CanCheckDiaperWithRestraints,
  );
  const [canUseToiletLocked, _setCanUseToiletLocked] = useState<boolean>(Player.ABCL.SettingPermissions.CanUseToilet);
  const [canUsePottyLocked, _setCanUsePottyLocked] = useState<boolean>(Player.ABCL.SettingPermissions.CanUsePotty);

  const [wetness, setWetness] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Wetness"] ?? false);
  const [soiliness, setSoiliness] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Soiliness"] ?? false);
  const [bladder, setBladder] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Bladder"] ?? false);
  const [bowel, setBowel] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Bowel"] ?? false);
  const [incontinence, setIncontinence] = useState<boolean>(Player.ABCL.Settings.StatusMessages["Incontinence"] ?? false);
  const [mentalRegression, setMentalRegression] = useState<boolean>(Player.ABCL.Settings.StatusMessages["MentalRegression"] ?? false);
  const [puddleSize, setPuddleSize] = useState<boolean>(Player.ABCL.Settings.StatusMessages["PuddleSize"] ?? false);

  const [showOwnBadges, setShowOwnBadges] = useState<boolean>(Player.ABCL.Settings.ShowOwnBadges);
  const [useNewMiniGame, setUseNewMiniGame] = useState<boolean>(Player.ABCL.Settings.UseNewMiniGame);

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

          Player.ABCL.Settings.CanChangeDiapers = canChangeDiapers;
          Player.ABCL.Settings.CanChangeSelf = canChangeSelf;
          Player.ABCL.Settings.CanUseBathroomWithDiaper = canUseBathroomWithDiaper;
          Player.ABCL.Settings.CanCheckDiaperWithRestraints = canCheckDiaperWithRestraints;
          Player.ABCL.Settings.CanUseToilet = canUseToilet;
          Player.ABCL.Settings.CanUsePotty = canUsePotty;

          Player.ABCL.Settings.StatusMessages["Wetness"] = wetness;
          Player.ABCL.Settings.StatusMessages["Soiliness"] = soiliness;
          Player.ABCL.Settings.StatusMessages["Bladder"] = bladder;
          Player.ABCL.Settings.StatusMessages["Bowel"] = bowel;
          Player.ABCL.Settings.StatusMessages["Incontinence"] = incontinence;
          Player.ABCL.Settings.StatusMessages["MentalRegression"] = mentalRegression;
          Player.ABCL.Settings.StatusMessages["PuddleSize"] = puddleSize;

          Player.ABCL.Settings.ShowOwnBadges = showOwnBadges;

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

          Player.ABCL.SettingPermissions.CanChangeDiapers = canChangeDiapersLocked;
          Player.ABCL.SettingPermissions.CanChangeSelf = canChangeSelfLocked;
          Player.ABCL.SettingPermissions.CanUseBathroomWithDiaper = canUseBathroomWithDiaperLocked;
          Player.ABCL.SettingPermissions.CanCheckDiaperWithRestraints = canCheckDiaperWithRestraintsLocked;
          Player.ABCL.SettingPermissions.CanUseToilet = canUseToiletLocked;
          Player.ABCL.SettingPermissions.CanUsePotty = canUsePottyLocked;

          Player.ABCL.Settings.DisableParticles = disableParticles;
          Player.ABCL.Settings.UseNewMiniGame = useNewMiniGame;
        }}
        className="ABCL-exit-button"
      ></button>
      <div>
        <SettingsH2>Miscellaneous</SettingsH2>
        <Group>
          <SettingPanel title="Show own badges / bottle icon">
            <Checkbox checked={showOwnBadges} setChecked={setShowOwnBadges} showLock={false} />
          </SettingPanel>
          <SettingPanel title="Disable particles">
            <Checkbox checked={disableParticles} setChecked={setDisableParticles} showLock={false} />
          </SettingPanel>
          <SettingPanel title="Use new Minigame (may not stay forever)">
            <Checkbox checked={useNewMiniGame} setChecked={setUseNewMiniGame} showLock={false} />
          </SettingPanel>
        </Group>
      </div>
      <div>
        <SettingsH2>Permissions</SettingsH2>
        <Group>
          <SettingPanel title="Change Self">
            <Checkbox checked={canChangeSelf} setChecked={_setCanChangeSelf} locked={canChangeSelfLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Change Diapers">
            <Checkbox checked={canChangeDiapers} setChecked={setCanChangeDiapers} locked={canChangeDiapersLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Using Toilet/Potty with Diaper">
            <Checkbox
              checked={canUseBathroomWithDiaper}
              setChecked={_setCanUseBathroomWithDiaper}
              locked={canUseBathroomWithDiaperLocked && isOwned()}
              opaqueLock={true}
            />
          </SettingPanel>
          <SettingPanel title="Checking Diaper with Restraints">
            <Checkbox
              checked={canCheckDiaperWithRestraints}
              setChecked={_setCanCheckDiaperWithRestraints}
              locked={canCheckDiaperWithRestraintsLocked && isOwned()}
              opaqueLock={true}
            />
          </SettingPanel>
          <SettingPanel title="Using Toilet">
            <Checkbox checked={canUseToilet} setChecked={_setCanUseToilet} locked={canUseToiletLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Using Potty">
            <Checkbox checked={canUsePotty} setChecked={_setCanUsePotty} locked={canUsePottyLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
        </Group>
      </div>
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
          <SettingPanel title="Wiping Puddles">
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
