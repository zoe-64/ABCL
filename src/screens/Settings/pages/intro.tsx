import { h } from "preact";
import { useState } from "preact/hooks";

import { isOwned } from "src/core/player/diaper";
import { getElement } from "src/core/utils";
import { ButtonGroup } from "src/screens/components/buttonGroup";
import { Checkbox } from "src/screens/components/checkbox";
import { Group } from "src/screens/components/positionComponents";
import { SettingPanel } from "src/screens/components/settingPanel";
import { SettingsH2 } from "../settingsPage";

export default function Intro({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
  const [messing, setMessing] = useState<boolean>(Player.ABCL.Settings.PoopMetabolism != "Disabled" || !Player.ABCL.Settings.DisableSoilingLeaks);
  const [messingLocked, _setMessingLocked] = useState<boolean>(
    Player.ABCL.SettingPermissions.PoopMetabolism || Player.ABCL.SettingPermissions.DisableSoilingLeaks,
  );
  const [wetting, setWetting] = useState<boolean>(Player.ABCL.Settings.PeeMetabolism != "Disabled" || !Player.ABCL.Settings.DisableWettingLeaks);
  const [wettingLocked, _setWettingLocked] = useState<boolean>(
    Player.ABCL.SettingPermissions.PeeMetabolism || Player.ABCL.SettingPermissions.DisableWettingLeaks,
  );
  const [canChangeSelf, _setCanChangeSelf] = useState<boolean>(Player.ABCL.Settings.CanChangeSelf);
  const [canChangeSelfLocked, _setCanChangeSelfLocked] = useState<boolean>(Player.ABCL.SettingPermissions.CanChangeSelf);

  const [useNewMiniGame, setUseNewMiniGame] = useState<boolean>(Player.ABCL.Settings.UseNewMiniGame);
  const [_useNewMiniGameLocked, _setUseNewMiniGameLocked] = useState<boolean>(Player.ABCL.SettingPermissions.UseNewMiniGame);

  const [diaperChangePromptSetting, setDiaperChangePromptSetting] = useState<DiaperChangePromptSetting>(Player.ABCL.Settings.OnDiaperChange);
  const [diaperChangePromptSettingLocked, _setDiaperChangePromptSettingLocked] = useState<boolean>(Player.ABCL.SettingPermissions.OnDiaperChange);

  const [accidentsByActivities, setAccidentsByActivities] = useState<boolean>(Player.ABCL.Settings.AccidentsByActivities);
  const [_accidentsByActivitiesLocked, _setAccidentsByActivitiesLocked] = useState<boolean>(Player.ABCL.SettingPermissions.AccidentsByActivities);

  const [miniGameDifficulty, setMiniGameDifficulty] = useState<MiniGameDifficulty>(Player.ABCL.Settings.MiniGameDifficulty);
  const [miniGameDifficultyLocked, _setMiniGameDifficultyLocked] = useState<boolean>(Player.ABCL.SettingPermissions.MiniGameDifficulty);

  return (
    <div>
      <button
        onClick={() => {
          setPage("menu");
          getElement(document.body, "#ABCL-settings-page").classList.add(`ABCL-hidden`);
          InformationSheetLoadCharacter(Player);
          Player.ABCL.Settings.AccidentsByActivities = accidentsByActivities;

          if (!wetting) {
            Player.ABCL.Settings.PeeMetabolism = "Disabled";
            Player.ABCL.Settings.DisableWettingLeaks = !wetting;
          } else if (Player.ABCL.Settings.PeeMetabolism == "Disabled") {
            Player.ABCL.Settings.PeeMetabolism = "Normal";
          }
          if (!messing) {
            Player.ABCL.Settings.PoopMetabolism = "Disabled";
            Player.ABCL.Settings.DisableSoilingLeaks = !messing;
          } else if (Player.ABCL.Settings.PoopMetabolism == "Disabled") {
            Player.ABCL.Settings.PoopMetabolism = "Normal";
          }

          Player.ABCL.Settings.OnDiaperChange = diaperChangePromptSetting;
          Player.ABCL.Settings.MiniGameDifficulty = miniGameDifficulty;
          Player.ABCL.Settings.CanChangeSelf = canChangeSelf;
          Player.ABCL.Settings.UseNewMiniGame = useNewMiniGame;
        }}
        className="ABCL-exit-button"
      ></button>
      <div>
        <SettingsH2>Introduction to ABCL</SettingsH2>
        <div style="margin-bottom: 1em;">
          <div>ABCL is an addon for littles, middles and caregivers.</div>
          <div>It has more DL features than AB as of right now. Such as, incontinence and puddles.</div>
          <div>However there are AB features like regression but it isn't very advanced.</div>
          <br />
          <div>When your bladder reaches a certain point you'll start getting minigames, when you fail a minigame you'll have an accident.</div>
          <div>
            When you do have an accident, it'll become visible on your diaper, if you don't have a diaper, it will color your clothes below the waist. And if it
            is pee, it'll form a puddle.
          </div>
          <div>Most of these features can be disabled.</div>
          <br />
          <div>You can access these settings from the settings menu.</div>
        </div>
        <SettingsH2>ABCL Settings</SettingsH2>
        <Group>
          <SettingPanel title="Messing / Soiling / Scat">
            <Checkbox checked={messing} setChecked={setMessing} locked={messingLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>

          <SettingPanel title="Wetting / Pee">
            <Checkbox checked={wetting} setChecked={setWetting} locked={wettingLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>

          <SettingPanel title="Accidents By Activities" description="Such by spanking, shocks, tickling... etc">
            <Checkbox
              checked={accidentsByActivities}
              setChecked={setAccidentsByActivities}
              locked={_accidentsByActivitiesLocked && isOwned()}
              opaqueLock={true}
            />
          </SettingPanel>

          <SettingPanel title="Change Self">
            <Checkbox checked={canChangeSelf} setChecked={_setCanChangeSelf} locked={canChangeSelfLocked && isOwned()} opaqueLock={true} />
          </SettingPanel>
          <SettingPanel title="Diaper Change Prompt">
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
          <SettingPanel
            title="Use new Minigame (may not stay forever)"
            description="The new minigame (catch droplets falling from above) can be more challanging but it is less boring than the old one (point and click)"
          >
            <Checkbox checked={useNewMiniGame} setChecked={setUseNewMiniGame} showLock={false} />
          </SettingPanel>
          <SettingPanel title="Minigame Difficulty" description="Easy doesn't mean it is easy">
            <ButtonGroup
              locked={miniGameDifficultyLocked}
              options={["Easy", "Normal", "Hard", "Impossible"] satisfies MiniGameDifficulty[]}
              value={miniGameDifficulty}
              setValue={(value: string) => {
                setMiniGameDifficulty(value as MiniGameDifficulty);
              }}
              opaqueLock={true}
            />
          </SettingPanel>
        </Group>
      </div>
    </div>
  );
}
