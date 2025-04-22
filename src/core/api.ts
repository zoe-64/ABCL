import { changeDiaper, changeDiaperRequest } from "./actions/changeDiaper";
import { checkDiaper, diaperCheckFunction } from "./actions/checkDiaper";
import { usePotty, usePottyFunction } from "./actions/usePotty";
import { useToilet, useToiletFunction } from "./actions/useToilet";
import { sendDataToAction, sendUpdateMyData } from "./hooks";
import {
  getDiaperVerb,
  getPlayerDiaper,
  getPlayerDiaperSize,
  hasDiaper,
  incontinenceChanceFormula,
  incontinenceLimitFormula,
  incontinenceOnAccident,
  isDiaper,
  isDiaperDirty,
  isDiaperLocked,
  isLeaking,
  mentalRegressionBonus,
  mentalRegressionOnAccident,
  mentalRegressionOvertime,
  setDiaperColor,
  updateDiaperColor,
} from "./player/diaper";
import { abclPlayer } from "./player/player";
import { getCharacter, isABCLPlayer } from "./player/playerUtils";
import { overlay } from "./player/ui";
import { clearData, updateData } from "./settings";

export function initApi(): void {
  (<any>window)[`${modIdentifier}`] = {
    version: modVersion,
    inModSubscreen: () => Boolean(overlay.querySelector(`.${modIdentifier}SettingPage`)?.classList.contains("ABCL-hidden")),
    isABCLPlayer,

    wet: abclPlayer.wet,
    attemptWetting: abclPlayer.attemptWetting,

    soil: abclPlayer.soil,
    attemptSoiling: abclPlayer.attemptSoiling,

    settings: Player.ABCL.Settings,
    stats: abclPlayer.stats,
    actions: {
      changeDiaper: changeDiaperRequest,
      checkDiaper: diaperCheckFunction,

      diaperFaceRub: () => sendDataToAction("diaperFaceRub", undefined, Player.MemberNumber),
      diaperFaceSit: () => sendDataToAction("diaperFaceSit", undefined, Player.MemberNumber),
      diaperPatBack: () => sendDataToAction("diaperPatBack", undefined, Player.MemberNumber),
      diaperPatFront: () => sendDataToAction("diaperPatFront", undefined, Player.MemberNumber),
      diaperPeeOthersDiaper: () => sendDataToAction("diaperPeeOthersDiaper", undefined, Player.MemberNumber),
      diaperPour: () => sendDataToAction("diaperPour", undefined, Player.MemberNumber),
      diaperRubBack: () => sendDataToAction("diaperRubBack", undefined, Player.MemberNumber),
      diaperRubFront: () => sendDataToAction("diaperRubFront", undefined, Player.MemberNumber),
      diaperSquishBack: () => sendDataToAction("diaperSquishBack", undefined, Player.MemberNumber),
      diaperSquishFront: () => sendDataToAction("diaperSquishFront", undefined, Player.MemberNumber),

      wipePuddle: () => sendDataToAction("wipePuddle", undefined, Player.MemberNumber),
      lickPuddle: () => sendDataToAction("lickPuddle", undefined, Player.MemberNumber),

      sendABCLmessage: (message: string, isLocal?: boolean) => sendDataToAction("onABCLMessage", { message, local: isLocal }, Player.MemberNumber),

      useToilet: () => useToiletFunction(),
      usePotty: () => usePottyFunction(),

      get canUseToilet() {
        return useToilet.activity?.Criteria?.(Player);
      },
      get canUsePotty() {
        return usePotty.activity?.Criteria?.(Player);
      },
      get canChangeDiaper() {
        return changeDiaper.activity?.Criteria?.(Player);
      },
      get canCheckDiaper() {
        return checkDiaper.activity?.Criteria?.(Player);
      },
    },
    raw: {
      sendUpdateMyData,
      sendDataToAction,
      mentalRegressionBonus,
      mentalRegressionOvertime,
      mentalRegressionOnAccident,
      incontinenceOnAccident,
      incontinenceChanceFormula,
      incontinenceLimitFormula,
      updateDiaperColor,
      getPlayerDiaperSize,
      getPlayerDiaper,
      getDiaperVerb,
      setDiaperColor,
      isDiaperLocked,
      isDiaperDirty,
      isDiaper,
      isABCLPlayer,
      isLeaking,
      hasDiaper,
      utility: {
        getCharacter,
      },
      clearData,
      updateData,
    },
  };
}
