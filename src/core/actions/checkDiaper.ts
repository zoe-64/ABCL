import { CombinedAction } from "../../types/types";
import { hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";
import { abclStatsWindow } from "../player/ui";
import { sendChatLocal } from "../utils";

const diaperCheckFunction = (player: Character) => {
  if (Math.random() < 0.75) return;

  if (hasDiaper(player)) {
    if (player.MemberNumber !== Player.MemberNumber) return SendAction(replace_template("%OPP_NAME% checks %NAME%'s diaper.", player));

    return SendAction(replace_template("%NAME% checks %INTENSIVE% diaper.", player));
  }
  if (player.MemberNumber !== Player.MemberNumber) {
    SendAction(replace_template("%OPP_NAME% checks %NAME%'s clothes for any accidents.", player));
  }
  return SendAction(replace_template("%NAME% checks %INTENSIVE% clothes for any accidents.", player));
};

export const checkDiaper: CombinedAction = {
  activity: {
    ID: "check-diaper",
    Name: "Check Diaper",
    Image: `${publicURL}/activity/diaperCheck.png`,
    OnClick: (player: Character, group: AssetGroupItemName) => {
      diaperCheckFunction(player);
      abclStatsWindow.open(player.MemberNumber);
    },
    Target: ["ItemPelvis"],
    Criteria: (player: Character) => {
      return isABCLPlayer(player);
    },
  },
  command: {
    Tag: "check-diaper",
    Description: ` [MemberNumber|Name|Nickname]: Checks someone's diaper.`,
    Action: (args, msg, parsed) => {
      const character = getCharacter(parsed[1]) ?? Player;
      if (!checkDiaper.activity!.Criteria!(character)) {
        sendChatLocal("Is either not diapered or not an ABCL player.");
      }
      diaperCheckFunction(character);
      abclStatsWindow.open(character.MemberNumber);
    },
  },
};
