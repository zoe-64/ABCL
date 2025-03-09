import { ABCLActivity, CombinedAction, HookListener } from "../types/types";
import { changeDiaper } from "./actions/changeDiaper";
import { checkDiaper } from "./actions/checkDiaper";
import { sync, syncListeners } from "./actions/sync";
import { toPee } from "./actions/toPee";
import { toPoop } from "./actions/toPoop";
import { usePotty } from "./actions/usePotty";
import { useToilet } from "./actions/useToilet";
import { bcModSDK, waitForElement } from "./utils";

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

export const initActions = (): void => {
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

    for (const { activity } of actions) {
      if (!activity) continue;

      if (activityFitsCriteria(activity, CurrentCharacter ?? Player)) {
        if (!activityIsInserted(activity.ID)) {
          activityGrid.appendChild(insertActivityButton(activity.Name, activity.ID, activity.Image, activity.OnClick));
        }
      }
    }
  });
  CommandCombine(commands);
};
export const actions: CombinedAction[] = [changeDiaper, checkDiaper, toPee, toPoop, usePotty, useToilet];

export const commands = actions.reduce((commands, { command }) => (command ? [...commands, command] : commands), [] as ICommand[]);
export const activites = actions.reduce((activites, { activity }) => (activity ? [...activites, activity] : activites), [] as ABCLActivity[]);
