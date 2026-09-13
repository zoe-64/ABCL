import { isABCLPlayer } from "./player/playerUtils";
import { CriteriaResult} from "./actionLoader";
import { abclPlayer } from "./player/player";
import { hasDiaper, isDiaperLocked } from "./player/diaper";

const BED_LIST = ["Crib", "BondageBench", "MedicalBed", "ChangingTable", "Bed", "床左边", "床右边"];

export function checkIsABCL(player: Character): CriteriaResult {
  return isABCLPlayer(player) ?
    CriteriaResult.ok() :
    CriteriaResult.err("They are not an ABCL player.")
}

export function checkIsDiapered(player: Character): CriteriaResult {
  return hasDiaper(player) ?
    CriteriaResult.ok() :
    CriteriaResult.err("They are not diapered.")
}

export function checkIsSelfDiapered(_player: Character): CriteriaResult {
  return hasDiaper(Player) ?
    CriteriaResult.ok() :
    CriteriaResult.err("You are not diapered.")
}

export function checkIsDiaperLocked(player: Character): CriteriaResult {
  return isDiaperLocked(player) ?
    CriteriaResult.ok() :
    CriteriaResult.err("Their diaper is locked.")
}

export function checkIsRestrained(player : Character): CriteriaResult {
  if (!Player.IsRestrained())
    return CriteriaResult.ok()
  if (player.IsPlayer()) {
    const item = InventoryGet(player, "ItemDevices");
    if (item && BED_LIST.includes(item.Asset.Name))
      return CriteriaResult.ok()
  }
  return CriteriaResult.err("You are restrained.")
}

export function checkCanCheckDiaper(player : Character): CriteriaResult {
  if (abclPlayer.settings.CanCheckDiaperWithRestraints)
    return CriteriaResult.ok()
  return checkIsRestrained(player)
}

export function checkIsOnFlatSurface(player : Character): CriteriaResult {
  const item = InventoryGet(player, "ItemDevices");
  return (item && BED_LIST.includes(item.Asset.Name)) ?
    CriteriaResult.ok() :
    CriteriaResult.err("They are not on a changing table or a flat surface.")
}

export function checkBladderIsntEmpty(_player : Character): CriteriaResult {
  return abclPlayer.stats.BladderFullness >= 0.15?
    CriteriaResult.ok() :
    CriteriaResult.err("Your bladder is empty.")
}

export function checkHasPuddle(player : Character): CriteriaResult {
  return (player?.ABCL && player.ABCL!.Stats.PuddleSize.value > 0) ?
    CriteriaResult.ok() :
    CriteriaResult.err("They have no puddle.")
}

export function checkCanPauseStats(_player : Character): CriteriaResult {
  return Player.ABCL.SettingPermissions.PauseStats ?
    CriteriaResult.ok() :
    CriteriaResult.err("Your parent(s) don't allow you to pause your stats")
}

export function checkHasPotty(player : Character): CriteriaResult {
  return player.Appearance.some(item => item.Asset.Name == "Potty") ?
    CriteriaResult.ok() :
    CriteriaResult.err("You don't have a potty to use!")
}

