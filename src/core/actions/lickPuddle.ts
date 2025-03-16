import { CombinedAction } from "../../types/types";
import { sendDataToAction, sendUpdateMyData } from "../hooks";
import { abclPlayer, updatePlayerClothes } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction, targetInputExtractor } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const lickPuddleRequest = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  if (!isSelf) return sendDataToAction("lick-puddle", undefined, player.MemberNumber);
  LickPuddleFunction(Player);
};
const LickPuddleFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% licks %INTENSIVE% puddle of pee.";
  const otherMessage = "%OPP_NAME% licks %NAME%'s puddle of pee.";
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "lickPuddle", player);

  sendUpdateMyData();
  updatePlayerClothes();
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
    Criteria: (player: Character) => isABCLPlayer(player) && player.ABCL!.Stats.PuddleSize.value > 0,
  },
  command: {
    Tag: "lick-puddle",
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!lickPuddle.activity!.Criteria!(character)) return sendChatLocal("Is either not an ABCL player or has no puddle.");
      lickPuddleRequest(character);
    },
    Description: ` [MemberNumber|Name|Nickname]: Licks a puddle of pee.`,
  },
  listeners: {
    "lick-puddle": ({ Sender }) => LickPuddleFunction(getCharacter(Sender!) ?? Player),
  },
};
