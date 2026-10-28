import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkHasPacifier, checkIsABCL } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable, RunAction } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, sendABCLAction } from "../player/playerUtils";
import { grammar } from "../tracery";

const suckPacifierRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("suck-pacifier", undefined, player.MemberNumber);
  suckPacifierFunction(player);
};

export const suckPacifierFunction = (player: Character) => {
  sendABCLAction(grammar.flatten("#pacifier-suck-self#", false, Player, player), undefined, "suckPacifier");

  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Mouth", "Happy", 8);
  }

  abclPlayer.stats.MentalRegression += 0.01 * abclPlayer.stats.MentalRegressionModifier;
};

export type suckPacifierListeners = {
  "suck-pacifier": void;
};

const InsertCriteria = ComposePrerequisites(checkIsABCL, checkHasPacifier);
const Criteria = Printable(ComposePrerequisites(InsertCriteria));

export const suckPacifier: CombinedAction = {
  activity: {
    Name: "Suck Pacifier",
    Target: [ABCLTarget.Self("ItemMouth")],
    MaxProgress: 0,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    useImage: <ActivityImageSetting>`${publicURL}/activity/suckPacifier.png`,
    run: (player, sender, info) => RunAction(info, suckPacifierRequest),
    Criteria,
  },
  command: {
    Tag: "suck-pacifier",
    Action: (args, msg, parsed) => {
      if (!Criteria(Player).isOk()) return;
      suckPacifierRequest(Player);
    },
    Description: ` Sucks on your pacifier.`,
  },
  listeners: {
    "suck-pacifier": ({ Sender }) => suckPacifierFunction(getCharacter(Sender!) ?? Player),
  },
};
