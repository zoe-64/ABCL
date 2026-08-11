import { CombinedAction } from "../../types/types";
import { sendDataToAction, sendUpdateMyData } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";
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
    Criteria: (player: Character) => {
      if (!isABCLPlayer(player))
        return {
          success: false,
          message: "They are not an ABCL player.",
        };
      if (player.ABCL!.Stats.PuddleSize.value <= 0)
        return {
          success: false,
          message: "They have no puddle.",
        };
      if (Player.IsRestrained())
        return {
          success: false,
          message: "You are restrained.",
        };
      return {
        success: true,
      };
    },
  },
  command: {
    Tag: "wipe-puddle",
    Action: (args, msg, parsed) => {
      const character = getCharacter(parsed[0]) ?? Player;
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
