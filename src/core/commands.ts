import { changeDiaper } from "./player/diaper";
import { abclPlayer } from "./player/player";
import { getCharacter, isABCLPlayer } from "./player/playerUtils";
import { abclStatsWindow } from "./player/ui";
import { sendChatLocal } from "./utils";

export const initCommands = (): void => {
  CommandCombine([
    {
      Tag: "diaper",
      Description: `<b>check</b> [MemberNumber|Name|Nickname]: View ${modIdentifier} stats. <br><b>/diaper change</b> [MemberNumber|Name|Nickname]: Changes someone's diaper.`,
      Action: (args, msg, parsed) => {
        if (!parsed) return;
        const character = getCharacter(parsed[1]) ?? Player;
        if (!isABCLPlayer(character)) {
          sendChatLocal("Player is not an ABCL player.");
        }
        switch (parsed[0]) {
          case "check": {
            abclStatsWindow.open(character.MemberNumber);
            break;
          }
          case "change": {
            changeDiaper(character.MemberNumber);
            break;
          }
          default: {
            sendChatLocal("Invalid command: " + parsed[0]);
            break;
          }
        }
      },
    },
    {
      Tag: "pee",
      Description: ` - Starts a stream of pee.`,
      Action: () => {
        abclPlayer.releaseBladder();
      },
    },
    {
      Tag: "poop",
      Description: ` - Lets out a stinker.`,
      Action: () => {
        abclPlayer.releaseBowel();
      },
    },
  ]);
};
