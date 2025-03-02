import { abclPlayer } from "../../core/player/player";
import { getCharacter, getCharacterName } from "../../core/player/playerUtils";
import { overlay } from "../../core/player/ui";
import { syncData } from "../../core/settings";
import { ModName } from "../../types/definitions";

const htmlSettingPage = document.createElement("div");
htmlSettingPage.classList.add(`${modIdentifier}SettingPage`, `${modIdentifier}Hidden`);

const updateRemoteList = (list: HTMLElement) => {
  if ((<any>window)?.LITTLISH_CLUB) return;
  const caregivers = window.LITTLISH_CLUB.getCaregiversOf(Player);
  list.innerHTML = ChatRoomCharacter.filter(
    (character) => character.ABCL && character.MemberNumber !== Player.MemberNumber && caregivers.includes(Player.MemberNumber!)
  )
    .map((character) => `<sl-option value="${character.MemberNumber}">${getCharacterName(character.MemberNumber)}</sl-option>`)
    .join("");
};
export const initSettingsScreen = async () => {
  htmlSettingPage.innerHTML = `<sl-tab-group>
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="remote">Remote</sl-tab>
  <sl-tab-panel name="general">

    <sl-radio-group class="${modIdentifier}MetabolismSelect" label="Select Metabolism" name="metabolism" value="${abclPlayer.settings.Metabolism}">
    <sl-radio-button value="Slow">Slow</sl-radio-button>
    <sl-radio-button value="Normal">Normal</sl-radio-button>
    <sl-radio-button value="Fast">Fast</sl-radio-button>
    <sl-radio-button value="Faster">Faster</sl-radio-button>
    <sl-radio-button value="Fastest">Fastest</sl-radio-button>
    </sl-radio-group>
     
    <sl-tooltip content="Disables wetting meaning you won't wet yourself" placement="right-start">
      <sl-checkbox class="${modIdentifier}DisableWetting"> Disable Wetting </sl-checkbox>
    </sl-tooltip>

    <sl-tooltip content="Disables wetting meaning you won't soil yourself" placement="right-start">
      <sl-checkbox class="${modIdentifier}DisableSoiling"> Disable Soiling </sl-checkbox>
    </sl-tooltip>

  </sl-tab-panel>

  <sl-tab-panel name="remote">
    <sl-select class="${modIdentifier}RemotePlayerSelect" label="Select Player" name="player" value="">
    </sl-select>
    <sl-button class="${modIdentifier}RefreshRemotes">Refresh Remotes</sl-button>
    <sl-tab-group>
      <sl-tooltip content="Attempts to update the selected player's settings" placement="right-start">
        <sl-button class="${modIdentifier}RemotePushSettings">Push Settings</sl-button>
      </sl-tooltip>
      <sl-tab slot="nav" panel="general">General</sl-tab>
      
      <sl-tab-panel name="general">
        <sl-radio-group class="${modIdentifier}RemoteMetabolismSelect" label="Select Metabolism" name="metabolism" value="${abclPlayer.settings.Metabolism}">
        <sl-radio-button value="Slow">Slow</sl-radio-button>
        <sl-radio-button value="Normal">Normal</sl-radio-button>
        <sl-radio-button value="Fast">Fast</sl-radio-button>
        <sl-radio-button value="Faster">Faster</sl-radio-button>
        <sl-radio-button value="Fastest">Fastest</sl-radio-button>
        </sl-radio-group>
     
        <sl-tooltip content="Disables wetting meaning you won't wet yourself" placement="right-start">
          <sl-checkbox class="${modIdentifier}RemoteDisableWetting"> Disable Wetting </sl-checkbox>
        </sl-tooltip>

        <sl-tooltip content="Disables wetting meaning you won't soil yourself" placement="right-start">
          <sl-checkbox class="${modIdentifier}RemoteDisableSoiling"> Disable Soiling </sl-checkbox>
        </sl-tooltip>
      </sl-tab-panel>
    </sl-tab-group>
  </sl-tab-panel>
</sl-tab-group>
  `;

  // remote
  const remotePlayerSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemotePlayerSelect`);
  const refreshRemotes: HTMLButtonElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RefreshRemotes`);
  const remotePushSettings: HTMLButtonElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemotePushSettings`);

  // remote general
  const remoteMetabolismSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemoteMetabolismSelect`);
  const remoteDisableWetting: HTMLInputElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemoteDisableWetting`);
  const remoteDisableSoiling: HTMLInputElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemoteDisableSoiling`);

  // general
  const metabolismSelect = htmlSettingPage.querySelector(`.${modIdentifier}MetabolismSelect`);
  const disableWetting: HTMLInputElement | null = htmlSettingPage.querySelector(`.${modIdentifier}DisableWetting`);
  const disableSoiling: HTMLInputElement | null = htmlSettingPage.querySelector(`.${modIdentifier}DisableSoiling`);

  if (
    //general
    !metabolismSelect ||
    !disableWetting ||
    !disableSoiling ||
    // remote
    !remotePlayerSelect ||
    !refreshRemotes ||
    !remotePushSettings ||
    // remote general
    !remoteMetabolismSelect ||
    !remoteDisableWetting ||
    !remoteDisableSoiling
  )
    throw new Error("Could not find elements");

  // general
  metabolismSelect.addEventListener("sl-change", (e: any) => {
    abclPlayer.settings.Metabolism = e.target.value;
  });
  disableWetting.addEventListener("sl-change", (e: any) => {
    abclPlayer.settings.DisableWetting = e.target.checked;
  });
  disableSoiling.addEventListener("sl-change", (e: any) => {
    abclPlayer.settings.DisableSoiling = e.target.checked;
  });

  // remote
  const updateSelectedRemotePlayer = (memberNumber: MemberNumber) => {
    const character: Character | undefined = getCharacter(memberNumber);
    if (!character || !character.ABCL) return;
    remoteMetabolismSelect.value = character.ABCL.Settings.Metabolism;
    remoteDisableWetting.checked = character.ABCL.Settings.DisableWetting;
    remoteDisableSoiling.checked = character.ABCL.Settings.DisableSoiling;
  };
  const pushSettings = (memberNumber: MemberNumber) => {
    // let settings: Partial<ModSettings> = {};
    //settings.Metabolism.value = remoteMetabolismSelect.value;
    // settings.DisableWetting = remoteDisableWetting.checked;
    // settings.DisableSoiling = remoteDisableSoiling.checked;
    // sendNewSettingsPacket(, memberNumber);
  };

  remotePushSettings.addEventListener("click", () => {});
  remotePlayerSelect.addEventListener("sl-change", (e: any) => {});
  refreshRemotes.addEventListener("click", () => {
    updateRemoteList(remotePlayerSelect);
  });

  overlay.appendChild(htmlSettingPage);
  PreferenceRegisterExtensionSetting({
    Identifier: modIdentifier,
    ButtonText: `${ModName} Settings`,
    Image: `${publicURL}/abcl.png`,
    run: () => {
      DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
    },
    click: () => {
      if (MouseIn(1815, 75, 90, 90)) PreferenceSubscreenExtensionsExit();
    },
    exit: () => {
      htmlSettingPage.classList.add(`${modIdentifier}Hidden`);
      syncData();
      return true;
    },
    load: () => {
      htmlSettingPage.classList.remove(`${modIdentifier}Hidden`);

      let selectedCharacter: Character | undefined = getCharacter(remotePlayerSelect.value);
      if (!selectedCharacter || !selectedCharacter?.ABCL) {
        selectedCharacter = Player;
      }

      updateRemoteList(remotePlayerSelect);
      // fill select ChatRoomCharacter

      metabolismSelect.setAttribute("value", abclPlayer.settings.Metabolism);
      if (abclPlayer.settings.DisableWetting) {
        disableWetting.setAttribute("checked", "true");
      } else {
        disableWetting.removeAttribute("checked");
      }

      if (abclPlayer.settings.DisableSoiling) {
        disableSoiling.setAttribute("checked", "true");
      } else {
        disableSoiling.removeAttribute("checked");
      }
    },
  });
};
