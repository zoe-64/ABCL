// luv you zoi <3
export const getCharacter = (identifier: string | number | Character): Character | undefined => {
  if (!identifier) return;
  if (typeof identifier === "object") return identifier;
  return ChatRoomCharacter.find((Character) => {
    return Character.MemberNumber == identifier || Character.Name.toLowerCase() === identifier || Character.Nickname?.toLowerCase() === identifier;
  });
};

export const isABCLPlayer = (character: Character, version = Player.ABCL.Version): boolean => {
  return Boolean(character?.ABCL && character.ABCL.Version === version);
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

export function SendAction(action: string, sender: Character | null = null) {
  let msg = replace_template(action, sender);
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
}
