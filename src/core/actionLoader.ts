import { ABCLActivity, CombinedAction } from "../types/types";
import { changeDiaper } from "./actions/changeDiaper";
import { checkDiaper } from "./actions/checkDiaper";
import { diaperFaceRub } from "./actions/diaperFaceRub";
import { diaperFaceSit } from "./actions/diaperFaceSit";
import { diaperPatBack } from "./actions/diaperPatBack";
import { diaperPatFront } from "./actions/diaperPatFront";
import { diaperPeeOthersDiaper } from "./actions/diaperPeeOthersDiaper";
import { diaperPour } from "./actions/diaperPour";
import { diaperRubBack } from "./actions/diaperRubBack";
import { diaperRubFront } from "./actions/diaperRubFront";
import { diaperSquishBack } from "./actions/diaperSquishBack";
import { diaperSquishFront } from "./actions/diaperSquishFront";
import { lickPuddle } from "./actions/lickPuddle";
import { onABCLMessage } from "./actions/onABCLMessage";
import { pauseStats } from "./actions/pauseStats";
import { sync } from "./actions/sync";
import { toPee } from "./actions/toPee";
import { toPoop } from "./actions/toPoop";
import { usePotty } from "./actions/usePotty";
import { useToilet } from "./actions/useToilet";
import { wipePuddle } from "./actions/wipePuddle";
import { bcModSDK, waitForElement } from "./utils";

class Activity {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public onClick?: (player: Character, group: AssetGroupItemName) => void,
    private target?: AssetGroupItemName[],
    private targetSelf?: AssetGroupItemName[],
    private criteria?: (player: Character) => boolean,
  ) {}

  fitsCriteria(player: Character, focusGroup: AssetGroupItemName): boolean {
    return Boolean(
      (!this.criteria || this.criteria(player)) &&
        (this.target?.includes(focusGroup) || (this.targetSelf?.includes(focusGroup) && Player.MemberNumber === player?.MemberNumber)),
    );
  }

  createButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.id = this.id;
    button.name = `${modIdentifier}_${this.name}`;
    button.dataset.group = "ItemArms";
    button.className = `blank-button button button-styling HideOnPopup dialog-grid-button`;
    button.innerHTML = `<img decoding="async" loading="lazy" src="${this.image}" class="button-image"><span class="button-label button-label-bottom">${this.name}</span>`;

    button.addEventListener("click", e => {
      const player = CurrentCharacter?.FocusGroup ? CurrentCharacter : Player;
      const focusGroup = player?.FocusGroup?.Name;
      if (!this.onClick || !focusGroup) return;
      this.onClick(player, focusGroup);
      DialogLeave();
    });

    return button;
  }

  static isInserted(id: string): boolean {
    return Boolean(document.getElementById(id));
  }
}

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
    const player = CurrentCharacter?.FocusGroup ? CurrentCharacter : Player;
    const activityGrid = await waitForElement("#dialog-activity-grid");
    const focusGroup = player.FocusGroup?.Name;
    if (!focusGroup) return;

    for (const { activity } of actions) {
      if (!activity) continue;
      const activityInstance = new Activity(
        activity.ID,
        activity.Name,
        activity.Image,
        activity.OnClick,
        activity.Target,
        activity.TargetSelf,
        activity.Criteria,
      );
      if (activityInstance.fitsCriteria(player, focusGroup)) {
        if (!Activity.isInserted(activity.ID)) {
          activityGrid.appendChild(activityInstance.createButton());
        }
      }
    }
  });
  CommandCombine(commands);
};
export const actions: CombinedAction[] = [
  changeDiaper,
  checkDiaper,
  toPee,
  toPoop,
  usePotty,
  useToilet,
  sync,
  lickPuddle,
  wipePuddle,
  onABCLMessage,
  diaperFaceRub,
  diaperFaceSit,
  diaperPatBack,
  diaperPatFront,
  diaperPeeOthersDiaper,
  diaperPour,
  diaperRubFront,
  diaperRubBack,
  diaperSquishBack,
  diaperSquishFront,
  pauseStats,
];

export const commands = actions.reduce((commands, { command }) => (command ? [...commands, command] : commands), [] as ICommand[]);
export const activites = actions.reduce((activites, { activity }) => (activity ? [...activites, activity] : activites), [] as ABCLActivity[]);
