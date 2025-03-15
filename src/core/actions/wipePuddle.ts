import { CombinedAction } from "../../types/types";
import { sendDataToAction, sendUpdateMyData } from "../hooks";
import { abclPlayer, updatePlayerClothes } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const WipePuddleRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    sendDataToAction("wipe-puddle", undefined, player.MemberNumber);
    return;
  }
  WipePuddleFunction(Player);
};
const WipePuddleFunction = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    SendAction(replace_template("%OPP_NAME% wipes %NAME%'s puddle of pee.", player));
  } else {
    SendAction(replace_template("%NAME% wipes %INTENSIVE% puddle of pee.", player));
  }
  abclPlayer.stats.PuddleSize = 0;
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
      WipePuddleRequest(player);
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
      const character = getCharacter(parsed[0]);
      if (!character) {
        sendChatLocal(`Could not find character: "${parsed[0]}"`);
        return;
      }
      if (!wipePuddle.activity!.Criteria!(character)) {
        sendChatLocal("Is either not an ABCL player or has no puddle.");
      }
      WipePuddleRequest(character);
    },
  },
  listeners: {
    "wipe-puddle": ({ Sender }) => {
      WipePuddleFunction(getCharacter(Sender!) ?? Player);
    },
  },
};
