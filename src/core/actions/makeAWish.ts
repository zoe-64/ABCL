import { CombinedAction } from "src/types/types";
import { sendChatLocal, sendWebhookReport } from "../utils";

export const makeAWish: CombinedAction = {
  command: {
    Tag: "abcl-wish",
    Action: (args, msg, parsed) => {
      if (parsed.length < 1) {
        const noWishResponses = [
          "The diaper goddess doesn't read minds of little babies~",
          "The diaper goddess needs to hear your wish, little one~",
          "What does the little one wish for? The diaper goddess is listening~",
          "The diaper goddess can't grant a wish you haven't spoken~",
          "Use your words, baby! The diaper goddess wants to hear your wish~",
        ];
        sendChatLocal(noWishResponses[Math.floor(Math.random() * noWishResponses.length)]);
        return;
      }

      const wish = parsed.join(" ");

      const responses = [
        "The diaper goddess will grant your wish in due time~",
        "The diaper goddess will hear you out in due time, patient babies get the best rewards~",
        "The diaper goddess needs to think about this wish~",
        "The diaper goddess has heard your plea and shall consider it~",
        "Your wish has been noted by the diaper goddess~",
        "The diaper goddess smiles upon your wish and will see what she can do~",
        "The diaper goddess is pleased with your request~",
        "The diaper goddess will make it so~",
        "The diaper goddess acknowledges your wish, little one~",
        "Your wish has been added to the diaper goddess's list~",
        "The diaper goddess will get to your wish when she's done with the others~",
        "Patience, little one. The diaper goddess works in mysterious ways~",
        "The diaper goddess has heard your plea and will answer in time~",
        "Such a sweet wish! The diaper goddess will consider it~",
        "The diaper goddess is busy tending to other little ones, but she hasn't forgotten you~",
        "Your wish has been whispered to the diaper goddess~",
        "The diaper goddess will grant your wish if you've been a good little one~",
        "The diaper goddess has taken your wish under her wing~",
        "Your wish echoes through the nursery, and the diaper goddess has heard it~",
        "The diaper goddess will make your wish come true if you're patient enough~",
      ];

      if (wish.length > 4000) {
        sendChatLocal("Your wish must be 4,000 characters or fewer.");
        return;
      }

      const response = responses[Math.floor(Math.random() * responses.length)];
      (async () => {
        sendWebhookReport(wish)
          .then(() => {
            sendChatLocal(`Wish received. ${response}`);
          })
          .catch(() => {
            sendChatLocal(`The diaper goddess is having technical issues right now~`);
            return;
          });
      })();
    },
    Description: ` [wish]: Make a wish to the diaper goddess.`,
  },
};
