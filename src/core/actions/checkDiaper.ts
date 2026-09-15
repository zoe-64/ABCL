import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkCanCheckDiaper, checkIsABCL } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable } from "../actionLoader";
import { hasDiaper } from "../player/diaper";
import { getCharacter, replace_template, sendABCLAction, targetInputExtractor } from "../player/playerUtils";
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

const InsertCriteria = checkIsABCL;
const Criteria = Printable(ComposePrerequisites(InsertCriteria, checkCanCheckDiaper));

export const checkDiaper: CombinedAction = {
  activity: {
    Name: "Check Diaper",
    Target: [ABCLTarget.Any("ItemPelvis")],
    MaxProgress: 0,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperCheck.png`,
    run: (player, sender, info) => diaperCheckFunction(getCharacter(info.TargetCharacter)!),
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
