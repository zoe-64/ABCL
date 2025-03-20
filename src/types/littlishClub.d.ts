declare interface LITTLISH_CLUB_API {
  /**
   * Gets Littlish Club subscreen state, returns "true" if subscreen is active and "false" otherwise
   */
  inModSubscreen(): boolean;
  /**
   * Gets member numbers of character's caregivers
   */
  getCaregiversOf(C: Character): number[];
  /**
   * Gets name and member number of character's mommy
   */
  getMommyOf(C: Character): {
    name: string;
    id: number;
  } | null;
  /**
   * Finds out if character "C1" is caregiver of character "C2"
   */
  isCaregiverOf(C1: Character, C2: Character): boolean;
  /**
   * Finds out if character "C1" is mommy of character "C2"
   */
  isMommyOf(C1: Character, C2: Character): boolean;
  /**
   * Finds out if character "C1" has certain access right for character "C2"
   */
  hasAccessRightTo(C1: Character, C2: Character, accessRight: AccessRight): boolean;
  /**
   * Finds out if certain rule is active on character, based on rule conditions
   */
  isRuleActive(C: Character, ruleId: RuleId): boolean;
  /**
   * Finds out if character is sleeping, Littlish Club sleeping state
   */
  isSleeping(C: Character): boolean;
}
// Littlish club
declare enum AccessRight {
  MANAGE_DIAPER = "MANAGE_DIAPER",
  MANAGE_RULES = "MANAGE_RULES",
  TURN_RULE_STRICT_MODE = "TURN_RULE_STRICT_MODE",
  DELETE_NOTES = "DELETE_NOTES",
  MANAGE_APPEARANCE = "MANAGE_APPEARANCE",
  MANAGE_CAREGIVERS_ACCESS_RIGHTS = "MANAGE_CAREGIVERS_ACCESS_RIGHTS",
  TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST = "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST",
  CHANGE_CAREGIVERS_LIST = "CHANGE_CAREGIVERS_LIST",
}

declare enum RuleId {
  PREVENT_TAKING_ABDL_ITEMS_OFF = 1000,
  PREVENT_USING_ADMIN_POWERS = 1001,
  PREVENT_RESISTING_URGES = 1002,
  ABDL_INVENTORY = 1003,
  SPEAK_LIKE_BABY = 1004,
  WALK_LIKE_BABY = 1005,
  CANT_GO_SHOP_ALONE = 1006,
  FALL_SLEEP_AFTER_MILK_BOTTLE = 1007,
  DECREASE_SIZE = 1008,
  DISABLE_RESET_SETTINGS_BUTTON = 1009,
}
