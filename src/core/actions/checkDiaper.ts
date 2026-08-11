import { CombinedAction } from "../../types/types";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { isABCLPlayer, replace_template, sendABCLAction, targetInputExtractor } from "../player/playerUtils";
import { abclStatsWindow, resizeElements } from "../player/ui";
import { getElement } from "../utils";

export const diaperCheckFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfDiaperMessage = "%NAME% checks %POSSESSIVE% diaper.";
  const otherDiaperMessage = "%NAME% checks %OPP_NAME%'s diaper.";
  const selfClothesMessage = "%NAME% checks %POSSESSIVE% clothes for any accidents.";
  const otherClothesMessage = "%NAME% checks %OPP_NAME%'s clothes for any accidents.";
  abclStatsWindow.setMemberNumber(player.MemberNumber!);
  getElement(document.body, `#ABCL-stats`).classList.remove("ABCL-hidden");
  setTimeout(() => {
    resizeElements();
  }, 250);
  if (Math.random() < 0.75) return;
  if (hasDiaper(player)) return sendABCLAction(replace_template(isSelf ? selfDiaperMessage : otherDiaperMessage, player), undefined, "checkDiaper", player);
  return sendABCLAction(replace_template(isSelf ? selfClothesMessage : otherClothesMessage, player), undefined, "checkDiaper", player);
};

export const checkDiaper: CombinedAction = {
  activity: {
    ID: "check-diaper",
    Name: "Check Diaper",
    Image: `${publicURL}/activity/diaperCheck.png`,
    OnClick: (player: Character, group: AssetGroupItemName) => diaperCheckFunction(player),
    Target: ["ItemPelvis"],
    Criteria: (player: Character) => {
      if (!isABCLPlayer(player))
        return {
          success: false,
          message: "They are not an ABCL player.",
        };
      if (Player.IsRestrained() && !abclPlayer.settings.CanCheckDiaperWithRestraints)
        return {
          success: false,
          message: "You are restrained.",
        };
      return {
        success: true,
      };
    },
  },
  command: {
    Tag: "check-diaper",
    Description: ` [MemberNumber|Name|Nickname]: Checks someone's diaper.`,
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!checkDiaper.activity!.Criteria!(character)) return;
      diaperCheckFunction(character);
    },
  },
};
