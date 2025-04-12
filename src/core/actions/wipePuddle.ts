import { CombinedAction } from "../../types/types";
import { sendDataToAction, sendUpdateMyData } from "../hooks";
import { abclPlayer, updatePlayerClothes } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";
const WipePuddleRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("wipe-puddle", undefined, player.MemberNumber);
  WipePuddleFunction(Player);
};
const WipePuddleFunction = (player: Character) => {
  abclPlayer.stats.PuddleSize = 0;
  sendUpdateMyData();
  updatePlayerClothes();
  if (player.MemberNumber !== Player.MemberNumber)
    return SendABCLAction(replace_template("%OPP_NAME% wipes %NAME%'s puddle of pee.", player), undefined, "wipePuddle", player);

  SendABCLAction(replace_template("%NAME% wipes %POSSESSIVE% puddle of pee.", player), undefined, "wipePuddle", player);
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
    Criteria: (player: Character) => isABCLPlayer(player) && player.ABCL!.Stats.PuddleSize.value > 0 && !Player.IsRestrained(),
  },
  command: {
    Tag: "wipe-puddle",
    Action: (args, msg, parsed) => {
      const character = getCharacter(parsed[0]) ?? Player;
      if (!wipePuddle.activity!.Criteria!(character)) return sendChatLocal("Is either not an ABCL player or has no puddle. Or you are restrained.");

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
