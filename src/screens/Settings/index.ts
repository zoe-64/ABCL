import { abclPlayer } from "../../core/player/player";
import { getCharacter, getCharacterName } from "../../core/player/playerUtils";
import { overlay } from "../../core/player/ui";
import { saveData } from "../../core/settings";
import { ModName } from "../../types/definitions";
import { hasPermissionToRemote } from "../../core/player/permissions";
import { sendNewSettingsPacket } from "../../core/hooks";

const htmlSettingPage = document.createElement("div");
htmlSettingPage.classList.add(`${modIdentifier}SettingPage`);
htmlSettingPage.classList.add(`${modIdentifier}Hidden`);

const updateRemoteList = (list: HTMLElement) => {
  list.innerHTML = "";
  for (let character of ChatRoomCharacter) {
    if (!character.ABCL || character.MemberNumber === Player.MemberNumber) continue;
    if (!hasPermissionToRemote(character)) continue;
    list.innerHTML += `<sl-option value="${character.MemberNumber}">${getCharacterName(character.MemberNumber)}</sl-option>`;
  }
};
const updateCaregiverList = (list: HTMLElement) => {
  list.innerHTML = "";
  for (let { memberNumber, name } of Player.ABCL.Settings.CaregiverIDs.value) {
    if (!memberNumber && !name) continue;
    const listElement = document.createElement("li");
    listElement.classList.add(`${modIdentifier}Caregiver`);
    listElement.setAttribute("value", memberNumber?.toString() ?? name);
    listElement.innerHTML = `<span class="${modIdentifier}CaregiverName">${name} (${memberNumber})</span>
    <sl-button class="${modIdentifier}RemoveCaregiver" style="display: inline">X</sl-button>`;
    listElement.querySelector(`.${modIdentifier}RemoveCaregiver`)!.addEventListener("click", () => {
      console.log("Removing caregiver", memberNumber, name);
      abclPlayer.settings.removeCaregiver(memberNumber ?? name!);
      updateCaregiverList(list);
    });
    list.appendChild(listElement);
  }
};
export const initSettingsScreen = async () => {
  htmlSettingPage.innerHTML = `<sl-tab-group>
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="caregivers">Caregivers</sl-tab>
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

  <sl-tab-panel name="caregivers">

    <div class="${modIdentifier}AddCaregiver">
      <sl-input placeholder="Name | MemberNumber" class="${modIdentifier}AddCaregiverInput">
      </sl-input>
      <sl-button class="${modIdentifier}AddCaregiverButton" style="display: inline">Add Caregiver</sl-button>
    </div>
    <label class="${modIdentifier}CaregiverLabel">Caregivers</label>
    <ol class="${modIdentifier}CaregiverList">
    </ol>

    <sl-tooltip content="Attempts to update your caregivers with names and ids from the chatroom" placement="right-start">
      <sl-button class="${modIdentifier}UpdateCaregiverData">Update Caregiver Data</sl-button>
    </sl-tooltip>

    <sl-tooltip content="Makes anyone able to access your settings and change them" placement="right-start">
      <sl-checkbox class="${modIdentifier}OpenRemoteSettings"> Open Remote Settings </sl-checkbox>
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

  // caregivers
  const caregiverListElement: HTMLDivElement | null = htmlSettingPage.querySelector(`.${modIdentifier}CaregiverList`);
  const caregiverInput: HTMLInputElement | null = htmlSettingPage.querySelector(`.${modIdentifier}AddCaregiverInput`);
  const caregiverButton: HTMLButtonElement | null = htmlSettingPage.querySelector(`.${modIdentifier}AddCaregiverButton`);
  const openRemoteSettings: HTMLInputElement | null = htmlSettingPage.querySelector(`.${modIdentifier}OpenRemoteSettings`);
  const updateCaregiverData: HTMLButtonElement | null = htmlSettingPage.querySelector(`.${modIdentifier}UpdateCaregiverData`);

  if (
    //general
    !metabolismSelect ||
    !disableWetting ||
    !disableSoiling ||
    // caregivers
    !caregiverListElement ||
    !caregiverInput ||
    !caregiverButton ||
    !openRemoteSettings ||
    !updateCaregiverData ||
    // remote
    !remotePlayerSelect ||
    !refreshRemotes ||
    !remotePushSettings ||
    // remote general
    !remoteMetabolismSelect ||
    !remoteDisableWetting ||
    !remoteDisableSoiling
  )
    return;

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
    remoteMetabolismSelect.value = character.ABCL.Settings.Metabolism.value;
    remoteDisableWetting.checked = character.ABCL.Settings.DisableWetting.value;
    remoteDisableSoiling.checked = character.ABCL.Settings.DisableSoiling.value;
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

  // caregivers
  openRemoteSettings.addEventListener("sl-change", (e: any) => {
    abclPlayer.settings.OpenRemoteSettings = e.target.checked;
  });
  updateCaregiverData.addEventListener("click", () => {
    abclPlayer.settings.updateCaregiverData();
    updateCaregiverList(caregiverListElement);
  });
  caregiverButton.addEventListener("click", () => {
    if (caregiverInput.value) {
      abclPlayer.settings.addCaregiver(caregiverInput.value);
      caregiverInput.value = "";
      updateCaregiverList(caregiverListElement);
    }
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
      saveData();
      return true;
    },
    load: () => {
      htmlSettingPage.classList.remove(`${modIdentifier}Hidden`);

      let selectedCharacter: Character | undefined = getCharacter(remotePlayerSelect.value);
      if (!selectedCharacter || !selectedCharacter?.ABCL) {
        selectedCharacter = Player;
      }

      updateCaregiverList(caregiverListElement);
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
