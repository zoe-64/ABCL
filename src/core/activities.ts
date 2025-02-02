import _ from "lodash";
import { bcModSDK, hasDiaper } from "./utils";

export const insertActivityButton = (
  name: string,
  id: string,
  src?: string,
  onclick?: Function
) => {
  const items = document.querySelectorAll("#dialog-activity-grid > button");
  if (!items) {
    console.log("No items found");
    return document.createElement("button");
  }

  const lastItem = items[items.length - 1];
  const index = lastItem ? Number(lastItem.getAttribute("data-index")) + 1 : 0;

  const button = document.createElement("button");
  button.id = id;
  button.name = `${modIdentifier}_${name}`;
  button.dataset.index = `${index}`;
  button.dataset.group = "ItemArms";
  button.classList.add(
    "blank-button",
    "button",
    "button-styling",
    "HideOnPopup",
    "dialog-grid-button"
  );
  const image = `<img id="dialog-activities-${modIdentifier}_${name}-image" decoding="async" loading="lazy" aria-hidden="true" src="${
    src || ""
  }" class="button-image">`;
  const label = `<span id="dialog-activities-${modIdentifier}_${name}-label" for="dialog-activities-${index}-${modIdentifier}_${name}" class="button-label button-label-bottom">${name}</span>`;
  button.insertAdjacentHTML("beforeend", image + label);
  if (onclick) {
    button.onclick = (e) => {
      onclick(e, button);
      DialogLeave();
    };
  }
  return button;
};

export type ABCLActivity = {
  Name: string;
  Image?: string;
  OnClick?: Function;
  Target: AssetGroupItemName[];
  TargetSelf?: AssetGroupItemName[];
  InsertCondition?: (player: typeof Player) => boolean;
};

export const activities: Record<string, ABCLActivity> = {};

export const loadActivities = () => {
  bcModSDK.hookFunction(
    "DialogMenuMapping.activities.GetClickStatus",
    1,
    (args, next) => {
      const [_C, _clickedObj, _equippedItem] = args;
      if (typeof _clickedObj === "undefined") return null;
      return next(args);
    }
  );
  bcModSDK.hookFunction("DialogChangeMode", 1, async (args, next) => {
    const [_mode, _reset] = args;
    next(args);
    if (_mode !== "activities") return;

    await new Promise<void>((resolve) => {
      const observer = new MutationObserver((mutations, obs) => {
        if (document.querySelector("#dialog-activity-grid > button")) {
          obs.disconnect();
          resolve();
        }
      });
      observer.observe(document.querySelector("#dialog-activity-grid")!, {
        childList: true,
        subtree: true,
      });
    });

    const focusGroup = CurrentCharacter?.FocusGroup?.Name ?? null;
    if (!focusGroup) return;
    for (const [_id, activity] of Object.entries(activities)) {
      if (!activity.InsertCondition?.(Player)) continue;
      if (
        !(
          activity.Target.includes(focusGroup) ||
          (activity.TargetSelf?.includes(focusGroup) &&
            CurrentCharacter?.MemberNumber === Player.MemberNumber)
        )
      ) {
        continue;
      }

      const activityGrid = document.querySelector("#dialog-activity-grid");
      if (activityGrid) {
        const existingButton = activityGrid.querySelector(_id);
        if (!existingButton) {
          activityGrid.appendChild(
            insertActivityButton(
              activity.Name,
              _id,
              activity.Image,
              activity.OnClick
            )
          );
        }
      }
    }
  });
};

activities["ChangeDiaper"] = {
  Name: "Change Diaper",
  Image: `${publicURL}/activity/changeDiaper.svg`,
  OnClick: () => {
    console.log("Change Diaper");
  },
  Target: ["ItemPelvis"],
  InsertCondition: (player) => {
    return hasDiaper(player);
  },
};
