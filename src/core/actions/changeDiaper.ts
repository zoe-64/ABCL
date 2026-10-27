import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction, CriteriaResult, DiaperSettingValues } from "../../types/types";
import { checkIsABCL, checkIsDiapered, checkIsDiaperLocked, checkIsOnFlatSurface } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable, RunAction } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, getCharacterName, sendABCLAction, targetInputExtractor } from "../player/playerUtils";
import { grammar } from "../tracery";

export const changeDiaperRequest = (player: Character, force?: boolean) => {
  if (!abclPlayer.settings.CanChangeSelf && player.MemberNumber === Player.MemberNumber) {
    sendABCLAction(grammar.flatten("#changeDiaper-default-self-denied#"), undefined, "changeDiaper", player);
    return;
  }
  if (!abclPlayer.settings.CanChangeDiapers && player.MemberNumber !== Player.MemberNumber) {
    sendABCLAction(grammar.flatten("#changeDiaper-default-other-denied#", false, Player, player), undefined, "changeDiaper", player);
    return;
  }

  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("changeDiaper-pending", { force }, player.MemberNumber);

  changeDiaperFunction(player);
};
export const changeDiaperFunction = (player: Character) => {
  abclPlayer.changeDiaper(player);
};

export type changeDiaperListeners = {
  "changeDiaper-accepted": undefined;
  "changeDiaper-rejected": undefined;
  "changeDiaper-pending": { force?: boolean };
};

const InsertCriteria = ComposePrerequisites(checkIsABCL, checkIsDiaperLocked, checkIsDiapered);
const Criteria = Printable(
  ComposePrerequisites(
    InsertCriteria,
    player => CriteriaResult.OkIf(!(InventoryGet(player, "ItemDevices")?.Asset.Name != "ChangingTable" && Player.IsRestrained()), "You are restrained"),
    checkIsOnFlatSurface,
  ),
);

export const changeDiaper: CombinedAction = {
  activity: {
    Name: "Change Diaper",
    MaxProgress: 0,
    Target: [ABCLTarget.Any("ItemPelvis")],
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    useImage: <ActivityImageSetting>`${publicURL}/activity/changeDiaper.svg`,
    run: (acted, acting, info) => RunAction(info, changeDiaperRequest),
  },
  command: {
    Tag: "change-diaper",
    Action: function (args, msg, parsed) {
      const character = targetInputExtractor(parsed) ?? Player;
      if (Criteria(character).isErr()) return;

      changeDiaperRequest(character);
    },
    Description: ` [MemberNumber|Name|Nickname]: Changes someone's diaper.`,
  },
  listeners: {
    "changeDiaper-accepted": ({ Sender }) => ToastManager.info(`${getCharacterName(Sender)} accepted your change diaper request.`),
    "changeDiaper-rejected": ({ Sender }) => ToastManager.info(`${getCharacterName(Sender)} rejected your change diaper request.`),
    "changeDiaper-pending": ({ Sender }, { force }) => {
      if (force) return changeDiaperFunction(getCharacter(Sender!) ?? Player);
      switch (Player.ABCL.Settings.OnDiaperChange) {
        case DiaperSettingValues.Ask:
          ToastManager.custom(`${getCharacterName(Sender)} wants to change your diaper.`, "info", {
            duration: 10 * 1000,
            onClick: (_, toast) => {},
            onClose: (toast, reason) => {
              if (reason === "click") toast.setAttribute("aria-checked", "true");
              if (toast.getAttribute("aria-checked") !== "true") sendDataToAction("changeDiaper-rejected", undefined, Sender);
            },
            buttons: [
              {
                label: "Yes",
                onClick: (_, toast) => {
                  changeDiaperFunction(getCharacter(Sender!) ?? Player);
                  sendDataToAction("changeDiaper-accepted", undefined, Sender);
                  toast?._dismiss?.("click");
                },
              },
              {
                label: "No",
                onClick: (_, toast) => {
                  sendDataToAction("changeDiaper-rejected", undefined, Sender);
                  toast?._dismiss?.("click");
                },
              },
            ],
          });
          break;
        case DiaperSettingValues.Allow:
          changeDiaperFunction(getCharacter(Sender!) ?? Player);
          sendDataToAction("changeDiaper-accepted", undefined, Sender);
          break;
        case DiaperSettingValues.Deny:
          sendDataToAction("changeDiaper-rejected", undefined, Sender);
          break;
      }
    },
  },
};
