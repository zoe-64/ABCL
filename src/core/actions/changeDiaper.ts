import { CombinedAction, DiaperSettingValues } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper, isDiaperLocked, updateDiaperColor } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, getCharacterName, isABCLPlayer, replace_template, sendABCLAction, targetInputExtractor } from "../player/playerUtils";

export const changeDiaperRequest = (player: Character, force?: boolean) => {
  if (!abclPlayer.settings.CanChangeSelf && player.MemberNumber === Player.MemberNumber) {
    sendABCLAction(
      "%NAME% tries to tug on %POSSESSIVE% diaper tabs, pulling on the waistband and shaking the diaper but nothing works.",
      undefined,
      "changeDiaper",
      player,
    );
    return;
  }
  if (!abclPlayer.settings.CanChangeDiapers && player.MemberNumber !== Player.MemberNumber) {
    sendABCLAction("%NAME% tries to change %OPP_NAME%'s diaper, but finds the task difficult.", undefined, "changeDiaper", player);
    return;
  }

  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("changeDiaper-pending", { force }, player.MemberNumber);

  changeDiaperFunction(player);
};
export const changeDiaperFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% changes %POSSESSIVE% diaper.";
  const otherMessage = "%OPP_NAME% changes %NAME%'s diaper.";
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "changeDiaper", player);

  abclPlayer.stats.WetnessValue = 0;
  abclPlayer.stats.SoilinessValue = 0;
  updateDiaperColor();
};

export type changeDiaperListeners = {
  "changeDiaper-accepted": undefined;
  "changeDiaper-rejected": undefined;
  "changeDiaper-pending": { force?: boolean };
};

export const changeDiaper: CombinedAction = {
  activity: {
    ID: "change-diaper",
    Name: "Change Diaper",
    Image: `${publicURL}/activity/changeDiaper.svg`,
    Target: ["ItemPelvis"],
    OnClick: (player: Character, group: AssetGroupItemName) => changeDiaperRequest(player),
    Criteria: (player: Character) => {
      if (!hasDiaper(player))
        return {
          success: false,
          message: "They are not diapered.",
        };
      if (isDiaperLocked(player))
        return {
          success: false,
          message: "Diaper is locked.",
        };
      if (!isABCLPlayer(player))
        return {
          success: false,
          message: "They are not an ABCL player.",
        };
      if (Player.IsRestrained())
        return {
          success: false,
          message: "You are restrained.",
        };
      const item = InventoryGet(player, "ItemDevices");
      if (!(item && ["MedicalBed", "ChangingTable", "Bed", "床左边", "床右边"].includes(item.Asset.Name)))
        return {
          success: false,
          message: "They are not on a changing table or a flat surface.",
        };

      return {
        success: true,
      };
    },
  },
  command: {
    Tag: "change-diaper",
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!changeDiaper.activity!.Criteria!(character).success) return;

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
