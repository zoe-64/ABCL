import { inModSubscreen } from "src/screens/Settings";
import { changeDiaper, changeDiaperRequest } from "./actions/changeDiaper";
import { checkDiaper, diaperCheckFunction } from "./actions/checkDiaper";
import { usePotty, usePottyFunction } from "./actions/usePotty";
import { useToilet, useToiletFunction } from "./actions/useToilet";
import { sendDataToAction, sendUpdateMyData } from "./hooks";
import {
  averageColor,
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
  isOwned,
  isWearingBabyClothes,
  mentalRegressionBonus,
  mentalRegressionOnAccident,
  mentalRegressionOvertime,
  mixLevels,
  setDiaperColor,
  updateDiaperColor,
} from "./player/diaper";
import { abclPlayer, updatePlayerClothes } from "./player/player";
import { getCharacter, getCharacterName, isABCLPlayer, replace_template, sendABCLAction, sendStatusMessage } from "./player/playerUtils";
import { clearData, updateData } from "./settings";
import { getColor, getElement, isColorable } from "./utils";

export function initApi(): void {
  (<any>window)[`${modIdentifier}`] = {
    version: modVersion,
    inModSubscreen: inModSubscreen,
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
      sendStatusMessage,
      sendABCLAction,
      updatePlayerClothes,
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
      isOwned,
      isDiaperLocked,
      isDiaperDirty,
      isDiaper,
      isABCLPlayer,
      isLeaking,
      isWearingBabyClothes,
      hasDiaper,
      utility: {
        getCharacter,
        mixLevels,
        averageColor,
        getCharacterName,
        replace_template,
        isColorable,
        getColor,
        getElement,
      },
      clearData,
      updateData,
    },
  };
}
