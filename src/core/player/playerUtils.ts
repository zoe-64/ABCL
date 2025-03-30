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

  return characters[0];
};

export const targetInputExtractor = (parsed: string[]): Character | undefined => {
  const name = parsed.join(" ");
  const character = getCharacter(name);
  if (!character) {
    return;
  }

  return character;
};

export const isABCLPlayer = (character: Character, strict?: boolean, version = Player.ABCL.Version): boolean => {
  return Boolean(character?.ABCL && (!strict || character.ABCL.Version === version));
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

export const SendStatusMessage = (type: keyof ModStats, delta: number, percent: boolean = false) => {
  if (delta === 0) return;
  if (percent) delta = delta * 100;
  delta = Number(delta.toPrecision(2));
  if (typeof Player[modIdentifier].Settings.StatusMessages[type] === "undefined") return;
  if (!Player[modIdentifier].Settings.StatusMessages[type]) return;
  const isLocal = Player[modIdentifier].Settings.StatusMessages[type];
  const wordConversion: Partial<Record<keyof ModStats, string>> = {
    Bladder: "PEE",
    Bowel: "POO",
    Incontinence: "INCON",
    MentalRegression: "REG",
    Soiliness: "MESS",
    Wetness: "WET",
    PuddleSize: "PUDL",
  };
  const message = `[${delta > 0 ? "+" : "-"}${Math.abs(delta)}${percent ? "%" : ""} ${wordConversion[type]}]`;
  if (isLocal) {
    sendChatLocal(message, ["ChatMessageAction", "ChatMessageNonDialogue"], `--label-color:#ff4949`);
  } else {
    sendDataToAction("onABCLMessage", { message: `${getCharacterName(Player.MemberNumber)}: ${message}`, local: isLocal });
  }
};
export function SendAction(action: string, sender: Character | null = null, messageType: keyof ModSettings["VisibleMessages"], target?: Character) {
  let msg = replace_template(action, sender);
  if (!messageType) {
    ServerSend("ChatRoomChat", {
      Content: "Beep",
      Type: "Action",
      Dictionary: [
        // EN
        { Tag: "Beep", Text: "msg" },
        // CN
        { Tag: "发送私聊", Text: "msg" },
        // DE
        { Tag: "Biep", Text: "msg" },
        // FR
        { Tag: "Sonner", Text: "msg" },
        // Message itself
        { Tag: "msg", Text: msg },
      ],
    });
    return;
  }
  const isLocal = !Player[modIdentifier].Settings.VisibleMessages[messageType];
  sendChatLocal(msg, ["ChatMessageAction", "ChatMessageNonDialogue"], "--label-color:#ff4949", isLocal);

  if (!isLocal) {
    sendDataToAction("onABCLMessage", { message: msg, local: isLocal });
  } else if (target && target.MemberNumber !== Player.MemberNumber) {
    sendDataToAction("onABCLMessage", { message: msg, local: isLocal }, target.MemberNumber);
  }
}
