import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction, targetInputExtractor } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const lickPuddleRequest = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  if (!isSelf) return sendDataToAction("lick-puddle", undefined, player.MemberNumber);
  LickPuddleFunction(Player);
};
const LickPuddleFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% licks %POSSESSIVE% puddle of pee.";
  const otherMessage = "%OPP_NAME% licks %NAME%'s puddle of pee.";
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "lickPuddle", player);
  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Fluids", "DroolLow", 20);
  }
  abclPlayer.stats.PuddleSize -= 50;
};
export type lickPuddleListeners = {
  "lick-puddle": undefined;
};

export const lickPuddle: CombinedAction = {
  activity: {
    ID: "lick-puddle",
    Name: "Lick Puddle",
    Image: `${publicURL}/activity/lickPuddle.png`,
    Target: ["ItemBoots"],
    OnClick: (player: Character, group: AssetGroupItemName) => lickPuddleRequest(player),
    InsertCriteria: function (player: Character) {
      let message = null;
      if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
      if (player?.ABCL && player.ABCL!.Stats.PuddleSize.value <= 0) message ??= "They have no puddle of pee.";
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
    Criteria: function (player: Character, silent?: boolean) {
      const result = this.InsertCriteria?.(player) ?? null;
      let message = result?.message ?? null;
      if (!silent && message) sendChatLocal(message);
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
  },
  command: {
    Tag: "lick-puddle",
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!lickPuddle.activity!.Criteria!(character).success) return;
      lickPuddleRequest(character);
    },
    Description: ` [MemberNumber|Name|Nickname]: Licks a puddle of pee.`,
  },
  listeners: {
    "lick-puddle": ({ Sender }) => LickPuddleFunction(getCharacter(Sender!) ?? Player),
  },
};
