import { ABCLdata } from "src/constants";

export const initProperties = () => {
  CraftingPropertyMap.set("Laxative" as CraftingPropertyType, (asset: Asset) => {
    return true;
  });
  CraftingPropertyMap.set("Diuretic" as CraftingPropertyType, (asset: Asset) => {
    return true;
  });
  CraftingPropertyMap.set("Hollow" as CraftingPropertyType, (asset: Asset) => {
    return asset.Group.Name === "ItemButt";
  });
  CraftingPropertyMap.set("DiaperDiscolorationProtection" as CraftingPropertyType, (asset: Asset) => {
    return Object.keys(ABCLdata.Diapers).includes(asset.Group.Name + asset.Name);
  });

  CraftingEffectsPrerequisite["Hollow" as CraftingPropertyType] = { max: 1 };
  CraftingEffectsPrerequisite["Laxative" as CraftingPropertyType] = { max: 3 };
  CraftingEffectsPrerequisite["Diuretic" as CraftingPropertyType] = { max: 3 };
  CraftingEffectsPrerequisite["DiaperDiscolorationProtection" as CraftingPropertyType] = { max: 1 };
};
