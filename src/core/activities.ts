import _ from "lodash";
import { bcModSDK, waitForElement } from "./utils";

export type ABCLActivity = {
  Name: string;
  Image: string;
  OnClick?: Function;
  Target?: AssetGroupItemName[];
  TargetSelf?: AssetGroupItemName[];
  Criteria?: (player: typeof Player) => boolean;
};
export const insertActivityButton = (
  name: string,
  id: string,
  src: string,
  onClick?: Function
): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = id;
  button.name = `${modIdentifier}_${name}`;
  button.dataset.group = "ItemArms";
  button.className = `blank-button button button-styling HideOnPopup dialog-grid-button`;
  button.innerHTML = `<img decoding="async" loading="lazy" src="${src}" class="button-image"><span class="button-label button-label-bottom">${name}</span>`;

  button.addEventListener("click", (e) => {
    DialogLeave();
    if (!onClick) return;
    onClick(CurrentCharacter);
  });

  return button;
};

export const activityInGroup = (
  activity: ABCLActivity,
  group: AssetGroupItemName
): boolean => {
  return Boolean(
    activity.Target?.includes(group) ||
      (activity.TargetSelf?.includes(group) &&
        Player.MemberNumber === CurrentCharacter?.MemberNumber)
  );
};
export const activityIsInserted = (id: string): boolean => {
  return Boolean(document.getElementById(id));
};
export const activityFitsCriteria = (
  activity: ABCLActivity,
  player: typeof Player
): boolean => {
  if (!activity.Criteria) return true;
  return Boolean(
    activity.Criteria(player) &&
      player.FocusGroup &&
      activityInGroup(activity, player.FocusGroup.Name)
  );
};
export const activities: Record<string, ABCLActivity> = {};

export const loadActivities = (): void => {
  /** clickedObj becomes null with custom activities */
  bcModSDK.hookFunction(
    "DialogMenuMapping.activities.GetClickStatus",
    1,
    (args, next) => {
      const [_C, _clickedObj, _equippedItem] = args;
      if (!_clickedObj) return null;
      return next(args);
    }
  );

  bcModSDK.hookFunction("DialogChangeMode", 1, async (args, next) => {
    const [_mode] = args;
    next(args);
    if (_mode !== "activities") return;

    const activityGrid = await waitForElement("#dialog-activity-grid");
    const focusGroup = CurrentCharacter?.FocusGroup?.Name;
    if (!focusGroup) return;
    Object.entries(activities).forEach(([id, activity]) => {
      if (activityFitsCriteria(activity, Player)) {
        if (!activityIsInserted(id)) {
          activityGrid.appendChild(
            insertActivityButton(
              activity.Name,
              id,
              activity.Image,
              activity.OnClick
            )
          );
        }
      }
    });
  });
};
