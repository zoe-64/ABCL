import { initActivitiesData } from "./data/activities-data";
import { bcModSDK, waitForElement } from "./utils";
export type ABCLActivity = {
  Name: string;
  Image: string;
  OnClick?: (player: Character, group: AssetGroupItemName) => void;
  Target?: AssetGroupItemName[];
  TargetSelf?: AssetGroupItemName[];
  Criteria?: (player: Character) => boolean;
};
export const insertActivityButton = (
  name: string,
  id: string,
  src: string,
  onClick?: (player: Character, group: AssetGroupItemName) => void
): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = id;
  button.name = `${modIdentifier}_${name}`;
  button.dataset.group = "ItemArms";
  button.className = `blank-button button button-styling HideOnPopup dialog-grid-button`;
  button.innerHTML = `<img decoding="async" loading="lazy" src="${src}" class="button-image"><span class="button-label button-label-bottom">${name}</span>`;

  button.addEventListener("click", (e) => {
    const player = CurrentCharacter ?? Player;
    const focusGroup = player?.FocusGroup?.Name;
    if (!onClick || !focusGroup) return;
    onClick(player, focusGroup);
    DialogLeave();
  });

  return button;
};

export const activityInGroup = (activity: ABCLActivity, group: AssetGroupItemName): boolean => {
  return Boolean(activity.Target?.includes(group) || (activity.TargetSelf?.includes(group) && Player.MemberNumber === CurrentCharacter?.MemberNumber));
};
export const activityIsInserted = (id: string): boolean => {
  return Boolean(document.getElementById(id));
};
export const activityFitsCriteria = (activity: ABCLActivity, player: Character): boolean => {
  if (!player) {
    return false;
  }
  return Boolean((!activity.Criteria || activity.Criteria(player)) && player.FocusGroup && activityInGroup(activity, player.FocusGroup.Name));
};
export const activities: Record<string, ABCLActivity> = {};

export const initActivities = (): void => {
  /** clickedObj becomes null with custom activities */
  initActivitiesData();
  bcModSDK.hookFunction("DialogMenuMapping.activities.GetClickStatus", 1, (args, next) => {
    const [_C, _clickedObj, _equippedItem] = args;
    if (!_clickedObj) return null;
    return next(args);
  });

  bcModSDK.hookFunction("DialogChangeMode", 1, async (args, next) => {
    const [_mode] = args;
    next(args);
    if (_mode !== "activities") return;

    const activityGrid = await waitForElement("#dialog-activity-grid");
    const focusGroup = CurrentCharacter?.FocusGroup?.Name;
    if (!focusGroup) return;
    Object.entries(activities).forEach(([id, activity]) => {
      if (activityFitsCriteria(activity, CurrentCharacter ?? Player)) {
        if (!activityIsInserted(id)) {
          activityGrid.appendChild(insertActivityButton(activity.Name, id, activity.Image, activity.OnClick));
        }
      }
    });
  });
};
