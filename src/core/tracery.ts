import tracery, { createGrammar } from "tracery-grammar";
import { getPlayerUnderwear, hasDiaper } from "./player/diaper";
const generic = {
  "generic-diaper": ["diaper", "padding", "nappy"],
  "generic-messy": ["messy", "stinky", "dirty", "smelly", "mushy"],
  "generic-soggy": ["soggy", "wet", "soaked", "damp"],
};
const soiling = {
  // Core building blocks
  "soiling-verb": ["soils", "poops in", "soils in", "makes a mess in"],
  "soiling-undies-action": ["#soiling-verb# #pronoun-their# #character-undies#"],
  "soiling-reaction": [
    "feels a warmth spread through #pronoun-their# #character-undies#",
    "feels a warmth settle into #pronoun-their# #character-undies#",
    "feels #pronoun-their# #character-undies# grow heavier",
    "smells the mess in #pronoun-their# #character-undies#",
  ],
  "soiling-emote": ["#soiling-undies-action# and #soiling-reaction#"],
  "soiling-clothes": ["soils #pronoun-their# clothes"],

  "soiling-default-undies": ["#character-name# #soiling-emote#"],
  "soiling-default-on-toilet": ["#character-name# uses the toilet"],
  "soiling-default-on-potty": ["#character-name# uses the potty"],
  "soiling-default-on-toilet-with-diaper": ["#character-name# forgets to lift up the lid, #soiling-emote# while sitting on the toilet."],
  "soiling-default-on-potty-with-diaper": [
    "#character-name# forgets to take off #pronoun-their# #character-undies#, #soiling-emote# while sitting on the potty.",
  ],

  "soiling-clothing-default": ["#character-name# #soiling-clothes#."],
  "soiling-clothing-on-toilet": ["#character-name# forgets to lift up the lid and #soiling-clothes# while sitting on the toilet."],
  "soiling-clothing-on-potty": ["#character-name# forgets to take off #pronoun-their# clothes and #soiling-clothes# while sitting on the potty."],
  "soiling-clothing-diaper-leak": ["#character-name#'s diaper leaks and #soiling-clothes#."],
  "soiling-clothing-diaper-leak-on-toilet": ["#character-name#'s diaper leaks and #soiling-clothes# while sitting on the toilet."],
  "soiling-clothing-diaper-leak-on-potty": ["#character-name#'s diaper leaks and #soiling-clothes# while sitting on the potty."],

  "soiling-default-floor": ["#character-name# #soiling-floor-action#"],
  "soiling-floor-action": ["makes a mess on the floor", "poops on the floor", "soils the floor"],
};

const wetting = {
  // Core building blocks
  "wetting-verb": ["wets", "soaks", "pees in", "lets go in", "leaks in"],
  "wetting-undies-action": ["#wetting-verb# #pronoun-their# #character-undies#"],
  "wetting-reaction": [
    "feels a warmth spread through #pronoun-their# #character-undies#",
    "feels a warmth settle into #pronoun-their# #character-undies#",
    "feels #pronoun-their# #character-undies# grow damp",
    "feels #pronoun-their# #character-undies# grow heavier",
  ],
  "wetting-emote": ["#wetting-undies-action# and #wetting-reaction#"],
  "wetting-clothes": ["#wetting-verb# #pronoun-their# clothes"],

  "wetting-default-undies": ["#character-name# #wetting-emote#"],
  "wetting-default-on-toilet": ["#character-name# uses the toilet"],
  "wetting-default-on-potty": ["#character-name# uses the potty"],
  "wetting-default-on-toilet-with-diaper": ["#character-name# forgets to lift up the lid, #wetting-emote# while sitting on the toilet."],
  "wetting-default-on-potty-with-diaper": [
    "#character-name# forgets to take off #pronoun-their# #character-undies#, #wetting-emote# while sitting on the potty.",
  ],

  "wetting-clothing-default": ["#character-name# #wetting-clothes#."],
  "wetting-clothing-on-toilet": ["#character-name# forgets to lift up the lid and #wetting-clothes# while sitting on the toilet."],
  "wetting-clothing-on-potty": ["#character-name# forgets to take off #pronoun-their# clothes and #wetting-clothes# while sitting on the potty."],
  "wetting-clothing-diaper-leak": ["#character-name#'s diaper leaks and #wetting-clothes#."],
  "wetting-clothing-diaper-leak-on-toilet": ["#character-name#'s diaper leaks and #wetting-clothes# while sitting on the toilet."],
  "wetting-clothing-diaper-leak-on-potty": ["#character-name#'s diaper leaks and #wetting-clothes# while sitting on the potty."],

  "wetting-default-floor": ["#character-name# #wetting-floor-action#"],
  "wetting-floor-action": ["makes a puddle on the floor", "pees on the floor", "wets the floor"],
};

const pacifier = {
  "pacifier-suck-self": [
    "#character-name# sucks on #pronoun-their# pacifier, a tiny contented hum slipping past the silicone nipple.",
    "#character-name# nibbles and sucks on #pronoun-their# pacifier, cheeks puffing slightly as #pronoun-they# settle into the rhythm.",
    "#character-name# gives #pronoun-their# pacifier a slow, soothing suck, staring off into a hazy little daze.",
    "#character-name# relaxes and sucks on #pronoun-their# pacifier, the familiar rhythm making #pronoun-them# feel sleepy and safe.",
    "#character-name# gently sucks on #pronoun-their# pacifier, letting #pronoun-themself# sink into a quiet, cozy comfort.",
  ],
};

const thumb = {
  "thumb-suck-self": [
    "#character-name# slips #pronoun-their# thumb into #pronoun-their# mouth and sucks, the familiar rhythm making #pronoun-them# feel calmer and more settled.",
    "#character-name# gently sucks on #pronoun-their# thumb, a tiny hum escaping as #pronoun-they# sink into the comforting motion.",
    "#character-name# nudges #pronoun-their# thumb between #pronoun-their# lips and sucks softly, eyes drifting half-closed in a sleepy, contented haze.",
    "#character-name# comforts #pronoun-themself# by sucking on #pronoun-their# thumb, cheeks puffing slightly as #pronoun-they# settle into the habit.",
    "#character-name# brings #pronoun-their# thumb to #pronoun-their# mouth and sucks, the simple motion easing #pronoun-themself# into a quiet little calm.",
  ],
};

const changeDiaper = {
  "changeDiaper-default-self-denied": [
    "#character-name# tries to tug on #pronoun-their# diaper tabs, pulling on the waistband and shaking the diaper, but nothing works.",
    "#character-name# fumbles with the tabs of #pronoun-their# diaper, but they won't budge.",
    "#character-name# tugs at #pronoun-their# diaper, but it stays firmly in place.",
    "#character-name# tries to peel off #pronoun-their# diaper, but the tapes hold fast.",
    "#character-name# reaches back to unfasten #pronoun-their# diaper, but can't get a grip on the tabs.",
    "#character-name# pulls at the waistband of #pronoun-their# diaper, but it won't come off.",
  ],
  "changeDiaper-default-other-denied": [
    "#character-name# tries to change #opp-name#'s diaper, but finds the task difficult.",
    "#character-name# reaches for #opp-name#'s diaper tabs, but can't get them loose.",
    "#character-name# tugs at #opp-name#'s diaper, but it won't budge.",
    "#character-name# tries to peel off #opp-name#'s diaper, but the tapes hold fast.",
    "#character-name# fumbles with #opp-name#'s diaper, unable to unfasten it.",
    "#character-name# tries to swap #opp-name#'s diaper, but can't get it off.",
  ],

  // --- Normal ---
  "changeDiaper-default-self": [
    "#character-name# changes #pronoun-their# diaper.",
    "#character-name# peels off #pronoun-their# used diaper and tapes on a fresh one.",
    "#character-name# unfastens the tabs of #pronoun-their# diaper and swaps in a clean one.",
    "#character-name# slips out of #pronoun-their# soiled diaper and fastens a fresh diaper snugly around #pronoun-themself#.",
    "#character-name# lays out a fresh diaper, wipes #pronoun-themself# clean, and tapes it on.",
    "#character-name# swaps #pronoun-their# old diaper for a clean one.",
  ],
  "changeDiaper-default-other": [
    "#opp-name# changes #character-name#'s diaper.",
    "#opp-name# peels off #character-name#'s used diaper and tapes on a fresh one.",
    "#opp-name# unfastens the tabs of #character-name#'s diaper and swaps in a clean one.",
    "#opp-name# slips #character-name# out of the soiled diaper and fastens a fresh one snugly around #pronoun-their#.",
    "#opp-name# lays out a fresh diaper, wipes #character-name# clean, and tapes it on.",
    "#opp-name# swaps #character-name#'s old diaper for a clean one.",
  ],

  // --- Magic (diaper -> fresh diaper) ---
  "changeDiaper-default-magic": [
    "#changeDiaper-magic-arrive# as #changeDiaper-magic-actor# #changeDiaper-magic-remove# and #changeDiaper-magic-add#.",
    "#changeDiaper-magic-arrive#, where #changeDiaper-magic-actor# #changeDiaper-magic-remove# and a fresh one appears in its place.",
    "#changeDiaper-magic-arrive# as #changeDiaper-magic-actor# #changeDiaper-magic-add#.",
    "#changeDiaper-magic-arrive#, where #changeDiaper-magic-actor# #changeDiaper-magic-remove# and #changeDiaper-magic-add#, #changeDiaper-magic-end#.",
  ],

  // --- Magic (unpadded -> diapered) ---
  "changeDiaper-default-magic-unpadded": [
    "#changeDiaper-magic-arrive# as #changeDiaper-magic-actor# #changeDiaper-magic-add#.",
    "#changeDiaper-magic-arrive#, where #changeDiaper-magic-actor# #changeDiaper-magic-add#.",
    "#changeDiaper-magic-arrive# and #changeDiaper-magic-actor# #changeDiaper-magic-add#, #changeDiaper-magic-end#.",
    "#changeDiaper-magic-arrive# as #changeDiaper-magic-actor# #changeDiaper-magic-add#, #changeDiaper-magic-end#.",
  ],
  "changeDiaper-magic-table": ["a magical changing table", "a glowing changing table", "a conjured changing table", "a shimmering changing table"],
  "changeDiaper-magic-arrive": [
    "#character-name# feels #pronoun-their# feet get swooped up and laid on #changeDiaper-magic-table#",
    "#character-name# is gently lifted onto #changeDiaper-magic-table#",
    "#character-name# floats briefly onto #changeDiaper-magic-table#",
    "#character-name# blinks as #changeDiaper-magic-table# materializes beneath #pronoun-their#",
    "#character-name# feels a warm shimmer wrap around #pronoun-their# waist",
  ],
  "changeDiaper-magic-actor": ["shimmering hands", "spectral hands", "ribbons of light", "wisps of magic", "a swirl of sparkles"],
  "changeDiaper-magic-remove": [
    "peel away #pronoun-their# used diaper",
    "whisk away #pronoun-their# diaper",
    "swap out #pronoun-their# diaper",
    "make quick work of #pronoun-their# diaper",
  ],
  "changeDiaper-magic-add": [
    "wrap a fresh diaper snugly around #pronoun-their# waist",
    "settle a clean diaper around #pronoun-their# hips",
    "fit #pronoun-their# with a clean diaper",
    "tape a fresh diaper snugly into place",
  ],
  "changeDiaper-magic-end": [
    "and set #pronoun-their# back down",
    "as #pronoun-their# diaper settles snugly into place",
    "before the table fades away",
    "in a soft glow",
  ],
};

const spells = {
  "fluffy-butt-spell-default": [
    "#character-name# feels a soft poof and suddenly #pronoun-their# butt is wrapped in a thick, fluffy diaper.",
    "A puff of sparkles swirls around #character-name#'s waist, leaving #pronoun-them# in a nice thick fluffy diaper.",
    "#character-name# blinks as #pronoun-their# underwear is replaced by a soft, crinkly diaper.",
  ],
  "fill-bowels-spell-default": [
    "#character-name# feels a sudden pressure build in #pronoun-their# tummy and shifts uncomfortably.",
    "#character-name# lets out a little groan as #pronoun-their# tummy gurgles and rumbles.",
    "#character-name# presses a hand to #pronoun-their# tummy as #pronoun-they# suddenly needs to go.",
    "#character-name# wiggles in place, #pronoun-their# tummy suddenly feeling very full.",
  ],
  "fill-bladder-spell-default": [
    "#character-name# feels a sudden pressure build in #pronoun-their# bladder and presses #pronoun-their# thighs together.",
    "#character-name# shifts from foot to foot as #pronoun-their# bladder suddenly feels much fuller.",
    "#character-name# lets out a little whimper, suddenly very aware of how badly #pronoun-they# needs to go.",
    "#character-name# presses a hand to #pronoun-their# tummy as the urge to pee grows.",
  ],
};

let cached: ReturnType<typeof createGrammar> | undefined;
export const grammar = {
  entries: {
    ...generic,
    ...soiling,
    ...wetting,
    ...pacifier,
    ...thumb,
    ...changeDiaper,
    ...spells,
  } as Record<string, string | string[]>,
  modifiers: {
    if: function (str: string, parameters: string[]) {
      return parameters[0] === "true" ? str : "";
    },
  } satisfies Record<string, (s: string, params: string[]) => string>,
  addEntries(rules: Record<string, string | string[]>) {
    Object.assign(this.entries, rules);
    cached = undefined;
  },
  generate() {
    const data = cached ?? (cached = tracery.createGrammar(this.entries));
    data.addModifiers(this.modifiers);
    return data;
  },

  flatten(rule: string, allowEscapeChars?: boolean, sender: Character = Player, target: Character = Player): string {
    const oppPronouns = Object.fromEntries(Object.entries(getPronouns(target)).map(([k, v]) => [`opp-${k}`, v]));
    const metadata = {
      "character-name": sender.Nickname ? sender.Nickname : sender.Name,
      "character-undies": (() => {
        if (hasDiaper(sender)) return "diaper";
        const underwear = getPlayerUnderwear();
        return underwear[0]?.Asset.Description ?? "";
      })(),
      ...getPronouns(sender),
      "opp-name": target.Nickname ? target.Nickname : target.Name,
      "opp-undies": (() => {
        if (hasDiaper(target)) return "diaper";
        const underwear = getPlayerUnderwear(target);
        return underwear[0]?.Asset.Description ?? "";
      })(),
      ...oppPronouns,
    };
    const metadataString = grammarToInline(metadata);
    return this.generate().flatten(metadataString + rule, allowEscapeChars);
  },
};

(<any>window)[`Grammar`] = grammar;

export function getPronouns(character: Character): Record<string, string> {
  const pronoun = character.GetPronouns();
  const pronouns: Record<CharacterPronouns, Record<string, string>> = {
    SheHer: {
      "pronoun-they": "she",
      "pronoun-them": "her",
      "pronoun-their": "her",
      "pronoun-theirs": "hers",
      "pronoun-themself": "herself",
    },
    HeHim: {
      "pronoun-they": "he",
      "pronoun-them": "him",
      "pronoun-their": "his",
      "pronoun-theirs": "his",
      "pronoun-themself": "himself",
    },
    TheyThem: {
      "pronoun-they": "they",
      "pronoun-them": "them",
      "pronoun-their": "their",
      "pronoun-theirs": "theirs",
      "pronoun-themself": "themself",
    },
    ItIt: {
      "pronoun-they": "it",
      "pronoun-them": "it",
      "pronoun-their": "its",
      "pronoun-theirs": "its",
      "pronoun-themself": "itself",
    },
  };

  return pronouns[pronoun] || pronouns["TheyThem"];
}

export function grammarToInline(record: Record<string, string | string[]>): String {
  // [name:value, ...]
  const entries = Object.entries(record).map(([key, value]) => `[${key}:${Array.isArray(value) ? (value[0] ?? "") : value}]`);
  return `${entries.join("")}`;
}
