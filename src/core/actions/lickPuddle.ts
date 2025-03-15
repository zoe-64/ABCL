import { CombinedAction } from "../../types/types";
import { sendDataToAction, sendUpdateMyData } from "../hooks";
import { abclPlayer, updatePlayerClothes } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const lickPuddleRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    sendDataToAction("lick-puddle", undefined, player.MemberNumber);
    return;
  }
  LickPuddleFunction(Player);
};
const LickPuddleFunction = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    SendAction(replace_template("%OPP_NAME% licks %NAME%'s puddle of pee.", player));
  } else {
    SendAction(replace_template("%NAME% licks %INTENSIVE% puddle of pee.", player));
  }
  abclPlayer.stats.PuddleSize -= 50;
  sendUpdateMyData();
  updatePlayerClothes();
};
export type lickPuddleListeners = {
  "lick-puddle": undefined;
};

export const lickPuddle: CombinedAction = {
  activity: {
    ID: "lick-puddle",
    Name: "Lick Puddle",
    Image: `${publicURL}/activity/lickPuddle.png`,
    OnClick: (player: Character, group: AssetGroupItemName) => lickPuddleRequest(player),
    Target: ["ItemBoots"],
    Criteria: (player: Character) => {
      return isABCLPlayer(player) && player.ABCL!.Stats.PuddleSize.value > 0;
    },
  },
  command: {
    Tag: "lick-puddle",
    Description: ` [MemberNumber|Name|Nickname]: Licks a puddle of pee.`,
    Action: (args, msg, parsed) => {
      const character = getCharacter(parsed[1]) ?? Player;
      if (!lickPuddle.activity!.Criteria!(character)) {
        sendChatLocal("Is either not an ABCL player or has no puddle.");
      }
      lickPuddleRequest(character);
    },
  },
  listeners: {
    "lick-puddle": ({ Sender }) => {
      lickPuddleRequest(getCharacter(Sender!) ?? Player);
    },
  },
};
