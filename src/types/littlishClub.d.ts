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
  isCaregiverOf(C1: Character, C2?: Character): boolean;
  /**
   * Finds out if character "C1" is mommy of character "C2"
   */
  isMommyOf(C1: Character, C2?: Character): boolean;
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
