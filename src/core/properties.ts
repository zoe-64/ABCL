export const initProperties = () => {
  CraftingPropertyMap.set("Laxative" as CraftingPropertyType, (asset: Asset) => {
    return true;
  });
  CraftingPropertyMap.set("Diuretic" as CraftingPropertyType, (asset: Asset) => {
    return true;
  });
  CraftingEffectsPrerequisite["Laxative" as CraftingPropertyType] = { max: 3 };
  CraftingEffectsPrerequisite["Diuretic" as CraftingPropertyType] = { max: 3 };
};
