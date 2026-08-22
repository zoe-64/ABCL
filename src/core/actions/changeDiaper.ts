import { CombinedAction, DiaperSettingValues } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper, isDiaperLocked, updateDiaperColor } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, getCharacterName, isABCLPlayer, replace_template, sendABCLAction, targetInputExtractor } from "../player/playerUtils";
import { syncData } from "../settings";
import { sendChatLocal } from "../utils";

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
  syncData();
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
    InsertCriteria: function (player: Character) {
      let message = null;
      if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
      if (isDiaperLocked(player)) message ??= "Diaper is locked.";
      if (!hasDiaper(player)) message ??= "They are not diapered.";

      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
    Criteria: function (player: Character, silent?: boolean) {
      const result = this.InsertCriteria?.(player) ?? null;
      let message = result?.message ?? null;

      const item = InventoryGet(player, "ItemDevices");
      if (item?.Asset.Name != "ChangingTable" && Player.IsRestrained()) message ??= "You are restrained.";
      if (!(item && ["Crib", "MedicalBed", "ChangingTable", "Bed", "床左边", "床右边"].includes(item.Asset.Name)))
        message ??= "They are not on a changing table or a flat surface.";
      if (!silent && message) sendChatLocal(message);
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
  },
  command: {
    Tag: "change-diaper",
    Action: function (args, msg, parsed) {
      const character = targetInputExtractor(parsed) ?? Player;
      const result = changeDiaper.activity!.Criteria!(character);
      if (!result.success) return;

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
