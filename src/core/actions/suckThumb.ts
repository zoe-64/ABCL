import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkIsABCL, checkIsMouthNotBlocked, checkIsRestrained } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable, RunAction } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, sendABCLAction } from "../player/playerUtils";
import { grammar } from "../tracery";

const suckThumbRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("suck-thumb", undefined, player.MemberNumber);
  suckThumbFunction(player);
};

export const suckThumbFunction = (player: Character) => {
  sendABCLAction(grammar.flatten("#thumb-suck-self#", false, Player, player), undefined, "suckThumb");

  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Mouth", "Happy", 8);
  }

  abclPlayer.stats.MentalRegression += 0.01 * abclPlayer.stats.MentalRegressionModifier;
};

export type suckThumbListeners = {
  "suck-thumb": void;
};

const InsertCriteria = ComposePrerequisites(checkIsABCL);
const Criteria = Printable(ComposePrerequisites(InsertCriteria, checkIsRestrained, checkIsMouthNotBlocked));

export const suckThumb: CombinedAction = {
  activity: {
    Name: "Suck Thumb",
    Target: [ABCLTarget.Self("ItemMouth")],
    MaxProgress: 0,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    useImage: <ActivityImageSetting>`${publicURL}/activity/suckThumb.png`,
    run: (player, sender, info) => RunAction(info, suckThumbRequest),
    Criteria,
  },
  command: {
    Tag: "suck-thumb",
    Action: (args, msg, parsed) => {
      if (!Criteria(Player).isOk()) return;
      suckThumbRequest(Player);
    },
    Description: ` Sucks on your thumb.`,
  },
  listeners: {
    "suck-thumb": ({ Sender }) => suckThumbFunction(getCharacter(Sender!) ?? Player),
  },
};
