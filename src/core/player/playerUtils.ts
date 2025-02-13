export function getCharacter(memberNumber: number): Character | null {
  const character = ChatRoomCharacter.find(
    (c) => c.MemberNumber === memberNumber
  );

  if (!character) {
    return null;
  }

  if (character?.IsPlayer()) {
    return character as PlayerCharacter;
  }

  return character as Character;
}

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
