import { CombinedAction } from "../../types/types";
import { sendDataToAction, sendUpdateMyData } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction, targetInputExtractor } from "../player/playerUtils";
import { sendChatLocal } from "../utils";
const WipePuddleRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("wipe-puddle", undefined, player.MemberNumber);
  WipePuddleFunction(Player);
};
const WipePuddleFunction = (player: Character) => {
  abclPlayer.stats.PuddleSize = 0;
  sendUpdateMyData();
  if (player.MemberNumber !== Player.MemberNumber)
    return sendABCLAction(replace_template("%OPP_NAME% wipes %NAME%'s puddle of pee.", player), undefined, "wipePuddle", player);

  sendABCLAction(replace_template("%NAME% wipes %POSSESSIVE% puddle of pee.", player), undefined, "wipePuddle", player);
};
export type wipePuddleListeners = {
  "wipe-puddle": undefined;
};

export const wipePuddle: CombinedAction = {
  activity: {
    ID: "wipe-puddle",
    Name: "Wipe Puddle",
    Image: `./Assets/Female3DCG/ItemHandheld/Preview/Towel.png`,
    Target: ["ItemBoots"],
    OnClick: (player: Character, group: AssetGroupItemName) => WipePuddleRequest(player),
    InsertCriteria: function (player: Character) {
      let message = null;
      if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
      if (player.ABCL && player.ABCL.Stats.PuddleSize.value <= 0) message ??= "They have no puddle.";
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
    Criteria: function (player: Character, silent?: boolean) {
      const result = this.InsertCriteria?.(player) ?? null;
      let message = result?.message ?? null;
      if (Player.IsRestrained()) message ??= "You are restrained.";
      if (!silent && message) sendChatLocal(message);
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
  },
  command: {
    Tag: "wipe-puddle",
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!wipePuddle.activity!.Criteria!(character).success) return;

      WipePuddleRequest(character);
    },
    Description: ` [MemberNumber|Name|Nickname]: Wipes a puddle of pee.`,
  },
  listeners: {
    "wipe-puddle": ({ Sender }) => {
      WipePuddleFunction(getCharacter(Sender!) ?? Player);
    },
  },
};
