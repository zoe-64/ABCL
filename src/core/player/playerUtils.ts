import { sendDataToAction } from "../hooks";
import { sendChatLocal } from "../utils";

// luv you zoi <3
export const getCharacter = (identifier: string | number | Character): Character | undefined => {
  if (!identifier) return;
  if (typeof identifier === "object") return identifier;

  const characters = ChatRoomCharacter.filter(Character => {
    const name = Character.Name.toLowerCase();
    const nickname = Character.Nickname?.toLowerCase();
    const identifierString = `${identifier}`.toLowerCase();

    return (
      Character.MemberNumber == identifier ||
      name === identifierString ||
      nickname === identifierString ||
      name.startsWith(identifierString) ||
      nickname?.startsWith(identifierString)
    );
  });
  if (characters.length === 0) return undefined;
  else if (characters.length > 1)
    return characters[0]; //throw new Error(`More than one character matches ${identifier}!`);
  else return characters[0];
};

export const targetInputExtractor = (parsed: string[]): Character | undefined => {
  const name = parsed.join(" ");
  const character = getCharacter(name);
  if (!character) {
    return;
  }

  return character;
};

export const isABCLPlayer = (character: Character, strict?: boolean, version = Player?.ABCL?.Version): boolean => {
  return Boolean(character?.ABCL && (!strict || character?.ABCL?.Version === version));
};

export function getCharacterName(memberNumber: number | undefined): string {
  if (!memberNumber) {
    return "Unknown";
  }
  const character = getCharacter(memberNumber);

  if (!character) {
    return "Unknown";
  }
  return character.Nickname ? character.Nickname : character.Name;
}

export const isAccidentsAutopiloted = () => {
  if (document.hidden || document.visibilityState === "hidden") return true;
  return ["Afk", "Brb", "Sleep"].includes(InventoryGet(Player, "Emoticon")?.Property?.Expression ?? "") || Player.ABCL.Settings.AccidentAutopilot;
};

export const getAccidentAutopilotSuccess = (type: keyof typeof Player.ABCL.Stats.MinigameStatistics) => {
  if (Player.ABCL.Stats.MinigameStatistics[type].Total < 10) return 0.7;
  return (Player.ABCL.Stats.MinigameStatistics[type].Success / (Player.ABCL.Stats.MinigameStatistics[type].Total ?? 1)) * 0.9;
};

export const getAccidentAutopilotOutcome = (type: keyof typeof Player.ABCL.Stats.MinigameStatistics) => {
  const chance = getAccidentAutopilotSuccess(type);
  const roll = Math.random();
  if (roll < chance) return true;
  return false;
};

// luv you sera <3
export function replace_template(text: string, source: Character | null = null, fallbackSourceName: string = "") {
  let result = text;

  let pronounItem = CharacterPronounDescription(Player);
  let isPlayerMale = pronounItem === "He/Him";

  let possessive = isPlayerMale ? "His" : "Her";
  let intensive = isPlayerMale ? "Him" : "Her";
  let pronoun = isPlayerMale ? "He" : "She";

  let opp_pronounItem = !source ? "They/Them" : CharacterPronounDescription(source);
  let isOppMale = opp_pronounItem === "He/Him";

  let oppName = source?.IsPlayer() ? (isOppMale ? "himself" : "herself") : !!source ? CharacterNickname(source) : fallbackSourceName;
  let oppPossessive = isOppMale ? "His" : "Her";
  let oppIntensive = source == Player ? (isOppMale ? "Himself" : "Herself") : isOppMale ? "Him" : "Her";
  let oppPronoun = isOppMale ? "He" : "She";

  return result
    .replaceAll("%NAME%", CharacterNickname(Player))
    .replaceAll("%POSSESSIVE%", possessive.toLocaleLowerCase())
    .replaceAll("%PRONOUN%", pronoun.toLocaleLowerCase())
    .replaceAll("%INTENSIVE%", intensive.toLocaleLowerCase())
    .replaceAll("%CAP_POSSESSIVE%", possessive)
    .replaceAll("%CAP_PRONOUN%", pronoun)
    .replaceAll("%CAP_INTENSIVE%", intensive)

    .replaceAll("%OPP_NAME%", oppName)
    .replaceAll("%OPP_PRONOUN%", oppPronoun.toLocaleLowerCase())
    .replaceAll("%OPP_POSSESSIVE%", oppPossessive.toLocaleLowerCase())
    .replaceAll("%OPP_INTENSIVE%", oppIntensive.toLocaleLowerCase())
    .replaceAll("%CAP_OPP_PRONOUN%", oppPronoun)
    .replaceAll("%CAP_OPP_POSSESSIVE%", oppPossessive)
    .replaceAll("%CAP_OPP_INTENSIVE%", oppIntensive);
}

export function getVerb(verbs: { [key: number]: string }, value: number) {
  for (const key in verbs) {
    if (Number(key) > value) {
      return verbs[key];
    }
  }
  return verbs[0];
}
const statusThresholds: Record<keyof ModStats, Array<{ minPercent: number; message: string }>> = {
  Bladder: [
    { minPercent: 0, message: "" },
    { minPercent: 20, message: "%NAME%'s bladder feels tiny bit full" },
    { minPercent: 40, message: "%NAME%'s bladder feels half full" },
    { minPercent: 70, message: "%NAME%'s bladder feels pretty full" },
    { minPercent: 80, message: "%NAME%'s bladder feels very full" },
    { minPercent: 90, message: "%NAME%'s bladder feels like it is about to burst" },
  ],
  Bowel: [
    { minPercent: 0, message: "" },
    { minPercent: 20, message: "%NAME%'s bowels feel tiny bit full" },
    { minPercent: 40, message: "%NAME%'s bowels feel slightly full" },
    { minPercent: 70, message: "%NAME%'s bowels feel pretty full" },
    { minPercent: 80, message: "%NAME%'s bowels feel very full" },
    { minPercent: 90, message: "%NAME%'s bowels feel like they are about to burst" },
  ],
  Incontinence: [
    { minPercent: 0, message: "%NAME%'s feel in complete control" },
    { minPercent: 20, message: "%NAME%'s feel a bit in control" },
    { minPercent: 40, message: "%NAME%'s feel a bit weak" },
    { minPercent: 70, message: "%NAME%'s are struggling to hold it" },
    { minPercent: 80, message: "%NAME%'s have almost no control left" },
    { minPercent: 90, message: "%NAME%'s have lost all control" },
  ],
  MentalRegression: [
    { minPercent: 0, message: "%NAME%'s mind feels clear" },
    { minPercent: 40, message: "%NAME%'s mind feels a bit foggy" },
    { minPercent: 70, message: "%NAME% feel very childlike" },
    { minPercent: 80, message: "%NAME%'s thoughts are mostly babble" },
    { minPercent: 90, message: "%NAME%'s mind is completely regressed" },
  ],
  Soiliness: [
    { minPercent: 0, message: "%NAME% feels clean" },
    { minPercent: 20, message: "%NAME% feels a bit soiled" },
    { minPercent: 40, message: "%NAME% feels slightly soiled" },
    { minPercent: 70, message: "%NAME% feels dirty" },
    { minPercent: 80, message: "%NAME% feels very messy" },
    { minPercent: 90, message: "%NAME% is completely soiled" },
  ],
  Wetness: [
    { minPercent: 0, message: "%NAME% feels dry" },
    { minPercent: 20, message: "%NAME% feels slightly damp" },
    { minPercent: 40, message: "%NAME% feels moist" },
    { minPercent: 60, message: "%NAME% feels wet" },
    { minPercent: 70, message: "%NAME% feels pretty soaked" },
    { minPercent: 80, message: "%NAME% feels drenched" },
    { minPercent: 90, message: "%NAME% is completely drenched" },
  ],
  PuddleSize: [
    { minPercent: 0, message: "" },
    { minPercent: 1, message: "%NAME% feels some droplets fall down" },
    { minPercent: 10, message: "%NAME% feels some more droplets fall down" },
    { minPercent: 30, message: "%NAME% feels %POSSESSIVE% feet getting wet" },
    { minPercent: 60, message: "%NAME% feels a noticeable puddle forming at their feet" },
    { minPercent: 80, message: "%NAME% feels a large puddle forming at their feet" },
  ],
  WaterIntake: [],
  FoodIntake: [],
  MinigameStatistics: [],
};

const getZoneIndex = (percent: number, thresholds: Array<{ minPercent: number; message: string }>): number => {
  let activeIndex = -1;
  for (let i = 0; i < thresholds.length; i++) {
    if (percent >= thresholds[i].minPercent) {
      activeIndex = i;
    }
  }
  return activeIndex;
};
export const sendStatusMessage = (type: keyof ModStats, before: number, after: number, max: number) => {
  if (before === after || max <= 0) return;

  if (typeof Player.ABCL.Settings.StatusMessages[type] === "undefined") return;
  if (!Player.ABCL.Settings.StatusMessages[type]) return;

  const thresholds = statusThresholds[type];
  if (!thresholds) return;

  const beforePercent = (before / max) * 100;
  const afterPercent = (after / max) * 100;

  const beforeZone = getZoneIndex(beforePercent, thresholds);
  const afterZone = getZoneIndex(afterPercent, thresholds);

  if (beforeZone === afterZone || afterZone === -1) return;

  const descMessage = thresholds[afterZone].message;
  const isLocal = Player.ABCL.Settings.StatusMessages[type];
  if (descMessage === "") return;
  const message = replace_template(descMessage, Player);
  if (isLocal) return sendChatLocal(message, ["ChatMessageAction", "ChatMessageNonDialogue"], `--label-color:#ff4949`);

  sendDataToAction("onABCLMessage", {
    message: `${getCharacterName(Player.MemberNumber)}: ${message}`,
    local: isLocal,
  });
};

export function sendABCLAction(action: string, sender: Character | null = null, messageType: keyof ModSettings["VisibleMessages"], target?: Character) {
  let msg = replace_template(action, sender);
  const isLocal = !Player.ABCL.Settings.VisibleMessages[messageType];
  sendChatLocal(msg, ["ChatMessageAction", "ChatMessageNonDialogue"], "--label-color:#ff4949", isLocal);

  if (!isLocal) {
    sendDataToAction("onABCLMessage", { message: msg, local: isLocal });
  } else if (target && target.MemberNumber !== Player.MemberNumber) {
    sendDataToAction("onABCLMessage", { message: msg, local: isLocal }, target.MemberNumber);
  }
}
