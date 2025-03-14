import { CombinedAction } from "../../types/types";
import { sendDataToAction, sendUpdateMyData } from "../hooks";
import { abclPlayer, updatePlayerClothes } from "../player/player";
import { getCharacter, isABCLPlayer } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const WipePuddleFunction = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    sendDataToAction("lick-puddle", undefined, player.MemberNumber);
    return;
  }
  abclPlayer.stats.PuddleSize -= 50;
  sendUpdateMyData();
  updatePlayerClothes();
};
export type wipePuddleListeners = {
  "wipe-puddle": undefined;
};

export const wipePuddle: CombinedAction = {
  activity: {
    ID: "wipe-puddle",
    Name: "Wipe Puddle",
    Image: `./Assets/Female3DCG/ItemHandheld/Preview/Towel.png`,
    OnClick: (player: Character, group: AssetGroupItemName) => {
      WipePuddleFunction(player);
    },
    Target: ["ItemBoots"],
    Criteria: (player: Character) => {
      return isABCLPlayer(player) && player.ABCL!.Stats.PuddleSize.value > 0;
    },
  },
  command: {
    Tag: "wipe-puddle",
    Description: ` [MemberNumber|Name|Nickname]: Wipes a puddle of pee.`,
    Action: (args, msg, parsed) => {
      const character = getCharacter(parsed[1]) ?? Player;
      if (!wipePuddle.activity!.Criteria!(character)) {
        sendChatLocal("Is either not an ABCL player or has no puddle.");
      }
      WipePuddleFunction(character);
    },
  },
  listeners: {
    "wipe-puddle": ({ Sender }) => {
      WipePuddleFunction(Player);
    },
  },
};
