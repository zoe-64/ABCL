import { CombinedAction, DiaperSettingValues } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper, isDiaperLocked, updateDiaperColor } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, getCharacterName, isABCLPlayer, replace_template, SendAction, targetInputExtractor } from "../player/playerUtils";
import { ABCLYesNoPrompt } from "../player/ui";
import { sendChatLocal } from "../utils";

const changeDiaperRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("changeDiaper-pending", undefined, player.MemberNumber);

  changeDiaperFunction(player);
};
export const changeDiaperFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% changes %INTENSIVE% diaper.";
  const otherMessage = "%OPP_NAME% changes %NAME%'s diaper.";
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "changeDiaper", player);

  abclPlayer.stats.WetnessValue = 0;
  abclPlayer.stats.SoilinessValue = 0;
  updateDiaperColor();
};

export type changeDiaperListeners = {
  "changeDiaper-accepted": undefined;
  "changeDiaper-rejected": undefined;
  "changeDiaper-pending": undefined;
};

export const changeDiaper: CombinedAction = {
  activity: {
    ID: "change-diaper",
    Name: "Change Diaper",
    Image: `${publicURL}/activity/changeDiaper.svg`,
    Target: ["ItemPelvis"],
    OnClick: (player: Character, group: AssetGroupItemName) => changeDiaperRequest(player),
    Criteria: (player: Character) => hasDiaper(player) && isABCLPlayer(player) && !Player.IsRestrained() && !isDiaperLocked(),
  },
  command: {
    Tag: "change-diaper",
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!changeDiaper.activity!.Criteria!(character))
        return sendChatLocal("Is either not diapered or not an ABCL player or you are restrained or diaper is locked.");

      changeDiaperRequest(character);
    },
    Description: ` [MemberNumber|Name|Nickname]: Changes someone's diaper.`,
  },
  listeners: {
    "changeDiaper-accepted": ({ Sender }) => sendChatLocal(`${getCharacterName(Sender)} accepted your change diaper request.`),
    "changeDiaper-rejected": ({ Sender }) => sendChatLocal(`${getCharacterName(Sender)} rejected your change diaper request.`),
    "changeDiaper-pending": ({ Sender }) => {
      switch (abclPlayer.settings.OnDiaperChange) {
        case DiaperSettingValues.Ask:
          new ABCLYesNoPrompt(
            `${getCharacterName(Sender)} wants to change your diaper.`,
            () => {
              changeDiaperFunction(getCharacter(Sender!) ?? Player);
              sendDataToAction("changeDiaper-accepted", undefined, Sender);
            },
            () => sendDataToAction("changeDiaper-rejected", undefined, Sender),
            10 * 1000,
          );
          break;
        case DiaperSettingValues.Allow:
          changeDiaperFunction(getCharacter(Sender!) ?? Player);
          sendDataToAction("changeDiaper-accepted", undefined, Sender);
          break;
        case DiaperSettingValues.Deny:
          sendDataToAction("changeDiaper-rejected", undefined, Sender);
          break;
      }
    },
  },
};
