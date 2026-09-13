import { CriteriaResult } from "./actionLoader";
import { hasDiaper, isDiaperLocked } from "./player/diaper";
import { abclPlayer } from "./player/player";
import { isABCLPlayer } from "./player/playerUtils";

const BED_LIST = ["Crib", "BondageBench", "MedicalBed", "ChangingTable", "Bed", "床左边", "床右边"];

export function checkIsABCL(player: Character): CriteriaResult {
  return CriteriaResult.OkIf(isABCLPlayer(player), "They are not an ABCL player.");
}

export function checkIsDiapered(player: Character): CriteriaResult {
  return CriteriaResult.OkIf(hasDiaper(player), "They are not diapered.");
}

export function checkIsSelfDiapered(_player: Character): CriteriaResult {
  return CriteriaResult.OkIf(hasDiaper(Player), "You are not diapered.");
}

export function checkIsDiaperLocked(player: Character): CriteriaResult {
  return CriteriaResult.OkIf(isDiaperLocked(player), "Their diaper is locked.");
}

export function checkIsRestrained(player: Character): CriteriaResult {
  if (!Player.IsRestrained()) return CriteriaResult.ok();
  if (player.IsPlayer()) {
    const item = InventoryGet(player, "ItemDevices");
    if (item && BED_LIST.includes(item.Asset.Name)) return CriteriaResult.ok();
  }
  return CriteriaResult.err("You are restrained.");
}

export function checkCanCheckDiaper(player: Character): CriteriaResult {
  if (abclPlayer.settings.CanCheckDiaperWithRestraints) return CriteriaResult.ok();
  return checkIsRestrained(player);
}

export function checkIsOnFlatSurface(player: Character): CriteriaResult {
  const item = InventoryGet(player, "ItemDevices");
  return CriteriaResult.OkIf(!!(item && BED_LIST.includes(item.Asset.Name)), "They are not on a changing table or a flat surface.");
}

export function checkBladderIsntEmpty(_player: Character): CriteriaResult {
  return CriteriaResult.OkIf(abclPlayer.stats.BladderFullness >= 0.15, "Your bladder is empty.");
}

export function checkHasPuddle(player: Character): CriteriaResult {
  return CriteriaResult.OkIf(!!(player?.ABCL && player.ABCL!.Stats.PuddleSize.value > 0), "They have no puddle.");
}

export function checkCanPauseStats(_player: Character): CriteriaResult {
  return CriteriaResult.OkIf(Player.ABCL.SettingPermissions.PauseStats, "Your parent(s) don't allow you to pause your stats");
}

export function checkHasPotty(player: Character): CriteriaResult {
  return CriteriaResult.OkIf(
    player.Appearance.some(item => item.Asset.Name == "Potty"),
    "You don't have a potty to use!",
  );
}

export function checkIsMentalRegressionTooHighSelf(player: Character): CriteriaResult {
  return CriteriaResult.OkIf(abclPlayer.stats.MentalRegression >= 0.3, "You don't have a potty to use!");
}
