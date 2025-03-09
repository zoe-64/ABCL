import { CombinedAction } from "../../types/types";
import { hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer } from "../player/playerUtils";
import { abclStatsWindow } from "../player/ui";
import { sendChatLocal } from "../utils";

export const checkDiaper: CombinedAction = {
  activity: {
    ID: "check-diaper",
    Name: "Check Diaper",
    Image: `${publicURL}/activity/diaperCheck.png`,
    OnClick: (player: Character, group: AssetGroupItemName) => {
      abclStatsWindow.open(player.MemberNumber);
    },
    Target: ["ItemPelvis"],
    Criteria: (player: Character) => {
      return hasDiaper(player) && isABCLPlayer(player);
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
      abclStatsWindow.open(character.MemberNumber);
    },
  },
};
