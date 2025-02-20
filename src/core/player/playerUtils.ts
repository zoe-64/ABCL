// luv you zoi <3
export const getCharacter = (
  identifier: string | number
): Character | undefined => {
  if (!identifier) return;
  return ChatRoomCharacter.find((Character) => {
    return (
      Character.MemberNumber == identifier ||
      Character.Name.toLowerCase() === identifier ||
      Character.Nickname?.toLowerCase() === identifier
    );
  });
};

export const isABCLPlayer = (character: Character): boolean => {
  return Boolean(character?.ABCL);
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
