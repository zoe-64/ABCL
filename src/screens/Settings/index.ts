import { abclPlayer } from "../../core/player/player";
import { getCharacter, getCharacterName } from "../../core/player/playerUtils";
import { overlay } from "../../core/player/ui";
import { syncData } from "../../core/settings";
import { getElement } from "../../core/utils";
import { ModName } from "../../types/definitions";

const htmlSettingPage = document.createElement("div");
htmlSettingPage.classList.add(`${modIdentifier}SettingPage`, `${modIdentifier}Hidden`);

const updateRemoteList = (list: HTMLElement) => {
  if (!(<any>window)?.LITTLISH_CLUB) return;
  const caregivers = window.LITTLISH_CLUB.getCaregiversOf(Player);
  list.innerHTML = ChatRoomCharacter.filter(
    character => character.ABCL && character.MemberNumber !== Player.MemberNumber && caregivers.includes(Player.MemberNumber!),
  )
    .map(character => `<sl-option value="${character.MemberNumber}">${getCharacterName(character.MemberNumber)}</sl-option>`)
    .join("");
};

export const initSettingsScreen = async () => {
  htmlSettingPage.innerHTML = `<sl-tab-group>
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="messages">Messages</sl-tab>
  <sl-tab slot="nav" panel="remote">Remote</sl-tab>
  <sl-tab-panel name="general">
    <sl-radio-group class="${modIdentifier}PeeMetabolismSelect" label="Select Pee Metabolism" name="pee-metabolism" value="${
    abclPlayer.settings.PeeMetabolism
  }">
    <sl-radio-button value="Disabled">Disabled</sl-radio-button>
    <sl-radio-button value="Slow">Slow</sl-radio-button>
    <sl-radio-button value="Normal">Normal</sl-radio-button>
    <sl-radio-button value="Fast">Fast</sl-radio-button>
    <sl-radio-button value="Faster">Faster</sl-radio-button>
    <sl-radio-button value="Fastest">Fastest</sl-radio-button>
    </sl-radio-group>

    <sl-radio-group class="${modIdentifier}PoopMetabolismSelect" label="Select Poop Metabolism" name="poop-metabolism" value="${
    abclPlayer.settings.PoopMetabolism
  }">
    <sl-radio-button value="Disabled">Disabled</sl-radio-button>
    <sl-radio-button value="Slow">Slow</sl-radio-button>
    <sl-radio-button value="Normal">Normal</sl-radio-button>
    <sl-radio-button value="Fast">Fast</sl-radio-button>
    <sl-radio-button value="Faster">Faster</sl-radio-button>
    <sl-radio-button value="Fastest">Fastest</sl-radio-button>
    </sl-radio-group>

    <sl-radio-group class="${modIdentifier}OnDiaperChangeSelect" label="Select On Diaper Change" name="on-diaper-change" value="${
    abclPlayer.settings.OnDiaperChange
  }">
    <sl-radio-button value="Deny">Deny</sl-radio-button>
    <sl-radio-button value="Ask">Ask</sl-radio-button>
    <sl-radio-button value="Allow">Allow</sl-radio-button>
    </sl-radio-group>

    <sl-checkbox class="${modIdentifier}DisableClothingStains" name="disable-clothing-stains" checked="${
    abclPlayer.settings.DisableClothingStains
  }">Disable Clothing Stains</sl-checkbox>
    <sl-checkbox class="${modIdentifier}DisableDiaperStains" name="disable-diaper-stains" checked="${
    abclPlayer.settings.DisableDiaperStains
  }">Disable Diaper Stains</sl-checkbox>
  </sl-tab-panel>
  <sl-tab-panel name="messages">
  <div>
  <h1 class="${modIdentifier}MessageVisibility"> Status messages for self: </h1>
  <div style="margin-left: 1em;">
    <sl-checkbox class="${modIdentifier}BladderStatusMessage" name="bladder-StatusMessage" checked="${abclPlayer.settings.getStatusMessageSetting(
    "Bladder",
  )}">Bladder</sl-checkbox>
    <sl-checkbox class="${modIdentifier}BowelStatusMessage" name="bowel-StatusMessage" checked="${abclPlayer.settings.getStatusMessageSetting(
    "Bowel",
  )}">Bowel</sl-checkbox>
    <sl-checkbox class="${modIdentifier}SoilinessStatusMessage" name="soiliness-StatusMessage" checked="${abclPlayer.settings.getStatusMessageSetting(
    "Soiliness",
  )}">Soiliness</sl-checkbox>
    <sl-checkbox class="${modIdentifier}WetnessStatusMessage" name="wetness-StatusMessage" checked="${abclPlayer.settings.getStatusMessageSetting(
    "Wetness",
  )}">Wetness</sl-checkbox>
    <sl-checkbox class="${modIdentifier}MentalRegressionStatusMessage" name="mental-regression-StatusMessage" checked="${abclPlayer.settings.getStatusMessageSetting(
    "MentalRegression",
  )}">Mental Regression</sl-checkbox>
    <sl-checkbox class="${modIdentifier}IncontinenceStatusMessage" name="incontinence-StatusMessage" checked="${abclPlayer.settings.getStatusMessageSetting(
    "Incontinence",
  )}">Incontinence</sl-checkbox>
    <sl-checkbox class="${modIdentifier}PuddleSizeStatusMessage" name="puddle-size-StatusMessage" checked="${abclPlayer.settings.getStatusMessageSetting(
    "PuddleSize",
  )}">Puddle Size</sl-checkbox>
  </div>
  </div>
  <div>
  <h1 class="${modIdentifier}MessageVisibility"> Message visibility for others: </h1>
  <div style="margin-left: 1em;"> 
    <sl-checkbox class="${modIdentifier}ChangeDiaperVisibility" name="change-diaper-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "changeDiaper",
  )}">Change Diaper</sl-checkbox>
    <sl-checkbox class="${modIdentifier}CheckDiaperVisibility" name="check-diaper-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "checkDiaper",
  )}">Check Diaper</sl-checkbox>
    <sl-checkbox class="${modIdentifier}LickPuddleVisibility" name="lick-puddle-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "lickPuddle",
  )}">Lick Puddle</sl-checkbox>
    <sl-checkbox class="${modIdentifier}WetDiaperVisibility" name="wet-diaper-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "wetDiaper",
  )}">Wet Diaper</sl-checkbox>
    <sl-checkbox class="${modIdentifier}WetClothingVisibility" name="wet-clothing-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "wetClothing",
  )}">Wet Clothing</sl-checkbox>
    <sl-checkbox class="${modIdentifier}SoilDiaperVisibility" name="soil-diaper-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "soilDiaper",
  )}">Soil Diaper</sl-checkbox>
    <sl-checkbox class="${modIdentifier}SoilClothingVisibility" name="soil-clothing-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "soilClothing",
  )}">Soil Clothing</sl-checkbox>
    <sl-checkbox class="${modIdentifier}UsePottyVisibility" name="use-potty-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "usePotty",
  )}">Use Potty</sl-checkbox>
    <sl-checkbox class="${modIdentifier}UseToiletVisibility" name="use-toilet-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "useToilet",
  )}">Use Toilet</sl-checkbox>
    <sl-checkbox class="${modIdentifier}WipePuddleVisibility" name="wipe-puddle-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "wipePuddle",
  )}">Wipe Puddle</sl-checkbox>
  <sl-checkbox class="${modIdentifier}StatusMessagesVisibility" name="status-messages-visibility" checked="${abclPlayer.settings.getPublicMessage(
    "statusMessages",
  )}">Status Messages</sl-checkbox>
  </div>
  </div>
  </sl-tab-panel>

  <sl-tab-panel name="remote">
    ${
      /* <sl-select class="${modIdentifier}RemotePlayerSelect" label="Select Player" name="player" value="">
    </sl-select>
    <sl-button class="${modIdentifier}RefreshRemotes">Refresh Remotes</sl-button>
    <sl-tab-group>
      <sl-tooltip content="Attempts to update the selected player's settings" placement="right-start">
        <sl-button class="${modIdentifier}RemotePushSettings">Push Settings</sl-button>
      </sl-tooltip>
      <sl-tab slot="nav" panel="general">General</sl-tab>
      
      <sl-tab-panel name="general">
        <sl-radio-group class="${modIdentifier}RemotePeeMetabolismSelect" label="Select Pee Metabolism" name="pee-metabolism" value="${abclPlayer.settings.PeeMetabolism}">
        <sl-radio-button value="Disabled">Disabled</sl-radio-button>
        <sl-radio-button value="Slow">Slow</sl-radio-button>
        <sl-radio-button value="Normal">Normal</sl-radio-button>
        <sl-radio-button value="Fast">Fast</sl-radio-button>
        <sl-radio-button value="Faster">Faster</sl-radio-button>
        <sl-radio-button value="Fastest">Fastest</sl-radio-button>
        </sl-radio-group>

        <sl-radio-group class="${modIdentifier}RemotePoopMetabolismSelect" label="Select Poop Metabolism" name="poop-metabolism" value="${abclPlayer.settings.PoopMetabolism}">
        <sl-radio-button value="Disabled">Disabled</sl-radio-button>
        <sl-radio-button value="Slow">Slow</sl-radio-button>
        <sl-radio-button value="Normal">Normal</sl-radio-button>
        <sl-radio-button value="Fast">Fast</sl-radio-button>
        <sl-radio-button value="Faster">Faster</sl-radio-button>
        <sl-radio-button value="Fastest">Fastest</sl-radio-button>
        </sl-radio-group>
        <sl-radio-group class="${modIdentifier}RemoteOnDiaperChangeSelect" label="Select On Diaper Change" name="on-diaper-change" value="${abclPlayer.settings.OnDiaperChange}">
        <sl-radio-button value="Deny">Deny</sl-radio-button>
        <sl-radio-button value="Ask">Ask</sl-radio-button>
        <sl-radio-button value="Allow">Allow</sl-radio-button>
        </sl-radio-group> */ "In development"
    }
      </sl-tab-panel>
    </sl-tab-group>
  </sl-tab-panel>
</sl-tab-group>
  `;

  // remote
  /*  const remotePlayerSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemotePlayerSelect`);
  const refreshRemotes: HTMLButtonElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RefreshRemotes`);
  const remotePushSettings: HTMLButtonElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemotePushSettings`);
 */
  // remote general
  /*   const remotePeeMetabolismSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemotePeeMetabolismSelect`);
  const remotePoopMetabolismSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemotePoopMetabolismSelect`);
  const remoteOnDiaperChangeSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${modIdentifier}RemoteOnDiaperChangeSelect`);
 */
  // general
  const peeMetabolismSelect = getElement(htmlSettingPage, `.${modIdentifier}PeeMetabolismSelect`);
  const poopMetabolismSelect = getElement(htmlSettingPage, `.${modIdentifier}PoopMetabolismSelect`);
  const onDiaperChangeSelect = getElement(htmlSettingPage, `.${modIdentifier}OnDiaperChangeSelect`);
  const disableDiaperStainsCheckbox = getElement(htmlSettingPage, `.${modIdentifier}DisableDiaperStains`);
  const disableClothingStainsCheckbox = getElement(htmlSettingPage, `.${modIdentifier}DisableClothingStains`);

  // messages
  const visibilityElements: Record<keyof ModSettings["VisibleMessages"], Element> = {
    useToilet: getElement(htmlSettingPage, `.${modIdentifier}UseToiletVisibility`),
    wipePuddle: getElement(htmlSettingPage, `.${modIdentifier}WipePuddleVisibility`),
    changeDiaper: getElement(htmlSettingPage, `.${modIdentifier}ChangeDiaperVisibility`),
    checkDiaper: getElement(htmlSettingPage, `.${modIdentifier}CheckDiaperVisibility`),
    lickPuddle: getElement(htmlSettingPage, `.${modIdentifier}LickPuddleVisibility`),
    wetDiaper: getElement(htmlSettingPage, `.${modIdentifier}WetDiaperVisibility`),
    wetClothing: getElement(htmlSettingPage, `.${modIdentifier}WetClothingVisibility`),
    soilDiaper: getElement(htmlSettingPage, `.${modIdentifier}SoilDiaperVisibility`),
    soilClothing: getElement(htmlSettingPage, `.${modIdentifier}SoilClothingVisibility`),
    usePotty: getElement(htmlSettingPage, `.${modIdentifier}UsePottyVisibility`),
    statusMessages: getElement(htmlSettingPage, `.${modIdentifier}StatusMessagesVisibility`),
  };
  const StatusMessageElements: Partial<Record<keyof ModSettings["StatusMessages"], Element>> = {
    Bladder: getElement(htmlSettingPage, `.${modIdentifier}BladderStatusMessage`),
    Bowel: getElement(htmlSettingPage, `.${modIdentifier}BowelStatusMessage`),
    Incontinence: getElement(htmlSettingPage, `.${modIdentifier}IncontinenceStatusMessage`),
    MentalRegression: getElement(htmlSettingPage, `.${modIdentifier}MentalRegressionStatusMessage`),
    PuddleSize: getElement(htmlSettingPage, `.${modIdentifier}PuddleSizeStatusMessage`),
    Soiliness: getElement(htmlSettingPage, `.${modIdentifier}SoilinessStatusMessage`),
    Wetness: getElement(htmlSettingPage, `.${modIdentifier}WetnessStatusMessage`),
  };

  // general
  peeMetabolismSelect.addEventListener("sl-change", (e: any) => {
    abclPlayer.settings.PeeMetabolism = e.target.value;
  });
  poopMetabolismSelect.addEventListener("sl-change", (e: any) => {
    abclPlayer.settings.PoopMetabolism = e.target.value;
  });
  onDiaperChangeSelect.addEventListener("sl-change", (e: any) => {
    abclPlayer.settings.OnDiaperChange = e.target.value;
  });
  disableDiaperStainsCheckbox.addEventListener("sl-change", (e: any) => {
    abclPlayer.settings.DisableDiaperStains = e.target.checked;
  });
  disableClothingStainsCheckbox.addEventListener("sl-change", (e: any) => {
    abclPlayer.settings.DisableClothingStains = e.target.checked;
  });
  for (const key of Object.keys(StatusMessageElements) as (keyof ModSettings["StatusMessages"])[]) {
    if (StatusMessageElements.hasOwnProperty(key)) {
      StatusMessageElements[key]?.addEventListener("sl-change", (e: any) => {
        abclPlayer.settings.setStatusMessageSetting(key, e.target.value);
      });
    }
  }
  for (const key of Object.keys(visibilityElements) as (keyof ModSettings["VisibleMessages"])[]) {
    if (visibilityElements.hasOwnProperty(key)) {
      visibilityElements[key].addEventListener("sl-change", (e: any) => {
        abclPlayer.settings.setPublicMessage(key, e.target.checked);
      });
    }
  }

  // remote
  const updateSelectedRemotePlayer = (memberNumber: MemberNumber) => {
    const character: Character | undefined = getCharacter(memberNumber);
    if (!character || !character.ABCL) return;

    // remotePeeMetabolismSelect.value = character.ABCL.Settings.PeeMetabolism;
    //remotePoopMetabolismSelect.value = character.ABCL.Settings.PoopMetabolism;
    //remoteOnDiaperChangeSelect.value = character.ABCL.Settings.OnDiaperChange;
  };
  const pushSettings = (memberNumber: MemberNumber) => {};

  /*   remotePushSettings.addEventListener("click", () => {
    const memberNumber = parseInt(remotePlayerSelect.value, 10);
    if (!isNaN(memberNumber)) {
      //pushSettings(memberNumber);
    }
  }); */
  /*  remotePlayerSelect.addEventListener("sl-change", (e: any) => {
    updateSelectedRemotePlayer(parseInt(e.target.value, 10));
  });
  refreshRemotes.addEventListener("click", () => {
    updateRemoteList(remotePlayerSelect);
  }); */

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
      function setCheckbox(element: Element, value: boolean) {
        value ? element.setAttribute("checked", "true") : element.removeAttribute("checked");
      }
      /*    let selectedCharacter: Character | undefined = getCharacter(remotePlayerSelect.value);
      if (!selectedCharacter || !selectedCharacter?.ABCL) {
        selectedCharacter = Player;
      }

      updateRemoteList(remotePlayerSelect);
      // fill select ChatRoomCharacter */

      peeMetabolismSelect.setAttribute("value", abclPlayer.settings.PeeMetabolism);
      poopMetabolismSelect.setAttribute("value", abclPlayer.settings.PoopMetabolism);
      onDiaperChangeSelect.setAttribute("value", abclPlayer.settings.OnDiaperChange);
      setCheckbox(disableClothingStainsCheckbox, abclPlayer.settings.DisableClothingStains);
      setCheckbox(disableDiaperStainsCheckbox, abclPlayer.settings.DisableDiaperStains);

      for (const key of Object.keys(StatusMessageElements) as (keyof ModSettings["StatusMessages"])[]) {
        if (StatusMessageElements.hasOwnProperty(key)) {
          const value = abclPlayer.settings.getStatusMessageSetting(key);
          StatusMessageElements[key] && setCheckbox(StatusMessageElements[key], value ?? false);
        }
      }
      for (const key of Object.keys(visibilityElements) as (keyof ModSettings["VisibleMessages"])[]) {
        if (visibilityElements.hasOwnProperty(key)) {
          const value = abclPlayer.settings.getPublicMessage(key);
          setCheckbox(visibilityElements[key], value);
        }
      }
    },
  });
};
