import { CombinedAction, DiaperSettingValues } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper, updateDiaperColor } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, getCharacterName, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";
import { ABCLYesNoPrompt } from "../player/ui";
import { sendChatLocal } from "../utils";

const changeDiaperRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    sendDataToAction("changeDiaper-pending", undefined, player.MemberNumber);
    return;
  }
  changeDiaperFunction(player);
};
export const changeDiaperFunction = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    SendAction(replace_template("%OPP_NAME% changes %NAME%'s diaper.", player));
  } else {
    SendAction(replace_template("%NAME% changes %INTENSIVE% diaper.", player));
  }
  abclPlayer.stats.SoilinessValue = 0;
  abclPlayer.stats.WetnessValue = 0;
  updateDiaperColor();
};

export type changeDiaperListeners = {
  "changeDiaper-accepted": undefined;
  "changeDiaper-rejected": undefined;
  "changeDiaper-pending": undefined;
};

export const changeDiaper: CombinedAction = {
  activity: {
    ID: "diaper-change",
    Name: "Change Diaper",
    Image: `${publicURL}/activity/changeDiaper.svg`,
    OnClick: (player: Character, group: AssetGroupItemName) => {
      changeDiaperRequest(player);
    },
    Target: ["ItemPelvis"],
    Criteria: (player: Character) => {
      return hasDiaper(player) && isABCLPlayer(player);
    },
  },
  command: {
    Tag: "diaper-change",
    Description: ` [MemberNumber|Name|Nickname]: Changes someone's diaper.`,
    Action: (args, msg, parsed) => {
      const character = getCharacter(parsed[1]) ?? Player;
      if (!changeDiaper.activity!.Criteria!(character)) {
        sendChatLocal("Is either not diapered or not an ABCL player.");
      }

      changeDiaperRequest(character);
    },
  },
  listeners: {
    "changeDiaper-accepted": ({ Sender }) => {
      sendChatLocal(`${getCharacterName(Sender)} accepted your change diaper request.`);
    },

    "changeDiaper-rejected": ({ Sender }) => {
      sendChatLocal(`${getCharacterName(Sender)} rejected your change diaper request.`);
    },

    "changeDiaper-pending": ({ Sender }) => {
      switch (abclPlayer.settings.OnDiaperChange) {
        case DiaperSettingValues.Ask:
          new ABCLYesNoPrompt(
            `${getCharacterName(Sender)} wants to change your diaper.`,
            () => {
              changeDiaperRequest(getCharacter(Sender!) ?? Player);
              sendDataToAction("changeDiaper-accepted", undefined, Sender);
            },
            () => {
              sendDataToAction("changeDiaper-rejected", undefined, Sender);
            },
            10 * 1000
          );
          break;
        case DiaperSettingValues.Allow:
          changeDiaperRequest(getCharacter(Sender!) ?? Player);
          sendDataToAction("changeDiaper-accepted", undefined, Sender);
          break;
        case DiaperSettingValues.Deny:
          sendDataToAction("changeDiaper-rejected", undefined, Sender);
          break;
      }
    },
  },
};
