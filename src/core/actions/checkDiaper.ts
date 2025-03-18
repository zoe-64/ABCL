import { CombinedAction } from "../../types/types";
import { hasDiaper } from "../player/diaper";
import { isABCLPlayer, replace_template, SendAction, targetInputExtractor } from "../player/playerUtils";
import { abclStatsWindow } from "../player/ui";
import { sendChatLocal } from "../utils";

const diaperCheckFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfDiaperMessage = "%NAME% checks %INTENSIVE% diaper.";
  const otherDiaperMessage = "%NAME% checks %OPP_NAME%'s diaper.";
  const selfClothesMessage = "%NAME% checks %INTENSIVE% clothes for any accidents.";
  const otherClothesMessage = "%NAME% checks %OPP_NAME%'s clothes for any accidents.";

  abclStatsWindow.open(player.MemberNumber);
  if (Math.random() < 0.75) return;

  if (hasDiaper(player)) return SendAction(replace_template(isSelf ? selfDiaperMessage : otherDiaperMessage, player), undefined, "checkDiaper", player);
  return SendAction(replace_template(isSelf ? selfClothesMessage : otherClothesMessage, player), undefined, "checkDiaper", player);
};

export const checkDiaper: CombinedAction = {
  activity: {
    ID: "check-diaper",
    Name: "Check Diaper",
    Image: `${publicURL}/activity/diaperCheck.png`,
    OnClick: (player: Character, group: AssetGroupItemName) => diaperCheckFunction(player),
    Target: ["ItemPelvis"],
    Criteria: (player: Character) => isABCLPlayer(player) && !Player.IsRestrained(),
  },
  command: {
    Tag: "check-diaper",
    Description: ` [MemberNumber|Name|Nickname]: Checks someone's diaper.`,
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!checkDiaper.activity!.Criteria!(character)) return sendChatLocal("Is not an ABCL player or you are restrained.");

      diaperCheckFunction(character);
    },
  },
};
