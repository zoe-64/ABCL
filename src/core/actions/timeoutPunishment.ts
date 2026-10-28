import { CombinedAction } from "src/types/types";
import { openTimeoutPunishmentMenu } from "../minigames/timeoutLines";
import { getCharacter } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

export const timeoutPunishmentCommand: CombinedAction = {
  command: {
    Tag: "timeout",
    Description: " [Name|MemberNumber] [durationSeconds] [sentence]: Opens the timeout punishment menu or pre-fills a command.",
    Action: (args, msg, parsed) => {
      const identifier = parsed[0];
      const durationText = parsed[1];
      const sentenceParts = parsed.slice(2);

      if (!identifier && !durationText && sentenceParts.length === 0) {
        openTimeoutPunishmentMenu();
        return;
      }

      if (!identifier || !durationText) {
        sendChatLocal("Usage: /timeout <name> <duration> <sentence>  or just /timeout to open the menu");
        return;
      }

      const target = getCharacter(identifier);
      if (!target) {
        sendChatLocal(`No character found matching "${identifier}".`);
        return;
      }

      const duration = Number(durationText);
      if (!Number.isFinite(duration) || duration <= 0) {
        sendChatLocal("Timeout duration must be a positive number of seconds.");
        return;
      }

      const sentence = sentenceParts.join(" ").trim();
      if (!sentence) {
        sendChatLocal("Timeout sentences cannot be empty.");
        return;
      }

      openTimeoutPunishmentMenu({ target, duration, sentence, successReduction: 15, failureAddition: 5 });
    },
  },
};
