import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { CombinedAction } from "../../types/types";
import { CriteriaResult, Prerequisiter } from "../actionLoader";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { isABCLPlayer, replace_template, sendABCLAction, targetInputExtractor } from "../player/playerUtils";
import { abclStatsWindow, resizeElements } from "../player/ui";
import { getElement, sendChatLocal } from "../utils";

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

function InsertCriteria(player: Character): CriteriaResult {
  let message = null;
  if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
  return CriteriaResult.fromMessage(message);
}
function Criteria(player: Character, silent?: boolean) {
  const result = InsertCriteria?.(player);
  let message = result?.toMessage();

  if (Player.IsRestrained() && !abclPlayer.settings.CanCheckDiaperWithRestraints) message ??= "You are restrained.";
  if (!silent && message) sendChatLocal(message);
  return CriteriaResult.fromMessage(message);
}

export const checkDiaper: CombinedAction = {
  activity: {
    activity: {
      Name: "Check Diaper",
      Target: ["ItemPelvis"],
      MaxProgress: 0,
      Prerequisite: [ Prerequisiter(InsertCriteria), Prerequisiter(Criteria), ]
    },
    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperCheck.png`,
    run: (player, sender, info) => diaperCheckFunction(player),
  },
  command: {
    Tag: "check-diaper",
    Description: ` [MemberNumber|Name|Nickname]: Checks someone's diaper.`,
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!Criteria!(character).isOk()) return;
      diaperCheckFunction(character);
    },
  },
};
