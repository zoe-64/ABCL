import { CombinedAction } from "../../types/types";
import { CriteriaResult, Prerequisiter } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction, targetInputExtractor } from "../player/playerUtils";
import { syncData } from "../settings";
import { sendChatLocal } from "../utils";
const WipePuddleRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("wipe-puddle", undefined, player.MemberNumber);
  WipePuddleFunction(Player);
};
const WipePuddleFunction = (player: Character) => {
  abclPlayer.stats.PuddleSize = 0;
  syncData();
  if (player.MemberNumber !== Player.MemberNumber)
    return sendABCLAction(replace_template("%OPP_NAME% wipes %NAME%'s puddle of pee.", player), undefined, "wipePuddle", player);

  sendABCLAction(replace_template("%NAME% wipes %POSSESSIVE% puddle of pee.", player), undefined, "wipePuddle", player);
};
export type wipePuddleListeners = {
  "wipe-puddle": undefined;
};

function InsertCriteria(player: Character): CriteriaResult {
  let message = null;
  if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
  if (player.ABCL && player.ABCL.Stats.PuddleSize.value <= 0) message ??= "They have no puddle.";
  return CriteriaResult.fromMessage(message);
}

function Criteria(player: Character, silent?: boolean): CriteriaResult {
  const result = InsertCriteria?.(player);
  let message = result?.message ?? null;
  if (Player.IsRestrained()) message ??= "You are restrained.";
  if (!silent && message) sendChatLocal(message);
  return CriteriaResult.fromMessage(message);
}

export const wipePuddle: CombinedAction = {
  activity: {
    activity: {
      Name: "Wipe Puddle",
      Target: ["ItemBoots"],
      MaxProgress: 0,      
      Prerequisite: [ Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true) ],
    },
    // TODO need to figure this out
    // useImage: `./Assets/Female3DCG/ItemHandheld/Preview/Towel.png`,
    run: (player: Character, sender, info) => WipePuddleRequest(player),
  },
  command: {
    Tag: "wipe-puddle",
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!Criteria!(character).isOk()) return;

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
