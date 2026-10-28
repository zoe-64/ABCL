import { ChatRoomRemoteEventEmitter } from "@sugarch/bc-event-handler";
import { getCharacter, sendABCLAction } from "../player/playerUtils";
import { overlay } from "../player/ui";
import { sendChatLocal } from "../utils";
import { BaseMiniGame } from "./baseMinigame";
import "./timeoutLines.css";

export type TimeoutPunishmentState = {
  memberNumber: number;
  durationSeconds: number;
  sentence: string;
  successReduction: number;
  failureAddition: number;
  startedAt: number;
  endAt: number;
  remainingSeconds: number;
  timer: number | null;
  game: TimeoutLinesGame | null;
};

const activeTimeouts = new Map<number, TimeoutPunishmentState>();

type TimeoutPunishmentEventMap = {
  request: [
    { senderMemberNumber: number; targetMemberNumber: number; durationSeconds: number; sentence: string; successReduction: number; failureAddition: number },
  ];
  accept: [
    { senderMemberNumber: number; targetMemberNumber: number; durationSeconds: number; sentence: string; successReduction: number; failureAddition: number },
  ];
  decline: [{ senderMemberNumber: number; targetMemberNumber: number }];
};

export const timeoutRemote = new ChatRoomRemoteEventEmitter<TimeoutPunishmentEventMap>(modIdentifier);

timeoutRemote.on("request", (info, { senderMemberNumber, targetMemberNumber, durationSeconds, sentence, successReduction, failureAddition }) => {
  if (info.sender === Player.MemberNumber) return;
  if (Player.MemberNumber !== targetMemberNumber) return;
  if (info.sender !== senderMemberNumber) return;
  if (typeof sentence !== "string" || !sentence.trim() || sentence.length > 500) return;
  if (![durationSeconds, successReduction, failureAddition].every(n => typeof n === "number" && Number.isFinite(n) && n > 0)) return;
  const target = ChatRoomCharacter.find(character => character.MemberNumber === targetMemberNumber);
  if (!target) return;
  requestTimeoutPunishment(target, durationSeconds, sentence, successReduction, failureAddition, senderMemberNumber);
});

timeoutRemote.on("accept", (info, { senderMemberNumber, targetMemberNumber }) => {
  if (info.sender === Player.MemberNumber) return;
  if (Player.MemberNumber !== senderMemberNumber) return;
  const target = ChatRoomCharacter.find(character => character.MemberNumber === targetMemberNumber);
  const targetName = target ? CharacterNickname(target) || target.Name : "The target";
  sendChatLocal(`${targetName} accepted the timeout punishment.`);
});

timeoutRemote.on("decline", (info, { senderMemberNumber, targetMemberNumber }) => {
  if (info.sender === Player.MemberNumber) return;
  if (Player.MemberNumber !== senderMemberNumber) return;
  const target = ChatRoomCharacter.find(character => character.MemberNumber === targetMemberNumber);
  const targetName = target ? CharacterNickname(target) || target.Name : "The target";
  sendChatLocal(`${targetName} declined the timeout punishment.`);
});

export const getActiveTimeout = (memberNumber: number) => activeTimeouts.get(memberNumber);

export const clearActiveTimeout = (memberNumber: number) => {
  const punishment = activeTimeouts.get(memberNumber);
  if (!punishment) return;
  if (punishment.timer) clearInterval(punishment.timer);
  punishment.game?.Unload();
  activeTimeouts.delete(memberNumber);
};

const formatTimer = (seconds: number) => {
  const total = Math.max(0, seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const openTimeoutPunishmentMenu = (initial?: {
  target?: Character | string | number;
  duration?: number;
  sentence?: string;
  successReduction?: number;
  failureAddition?: number;
}) => {
  const panelId = "abcl-timeout-menu";
  const existing = document.getElementById(panelId);
  if (existing) return;

  const targetSelect = ElementCreate({
    tag: "select",
    classList: ["timeout-lines-field"],
    attributes: {
      id: "abcl-timeout-target",
      name: "target",
    },
    children: [
      ElementCreate({
        tag: "option",
        attributes: { value: "" },
        children: ["Select a target"],
      }),
      ...ChatRoomCharacter.filter(character => character.MemberNumber !== Player.MemberNumber).map(character => {
        const label = CharacterNickname(character) || character.Name;
        return ElementCreate({
          tag: "option",
          attributes: { value: String(character.MemberNumber ?? "") },
          children: [label],
        });
      }),
    ],
  });

  const durationInput = ElementCreate({
    tag: "input",
    classList: ["timeout-lines-field"],
    attributes: {
      id: "abcl-timeout-duration",
      type: "number",
      min: "5",
      step: "1",
      value: "60",
      placeholder: "Duration in seconds",
      autocomplete: "off",
      spellcheck: "false",
    },
  }) as HTMLInputElement;

  const sentenceInput = ElementCreate({
    tag: "textarea",
    classList: ["timeout-lines-field", "timeout-lines-textarea"],
    attributes: {
      id: "abcl-timeout-sentence",
      rows: "4",
      placeholder: "Write the line they must complete",
      autocomplete: "off",
      autocorrect: "off",
      autocapitalize: "off",
      spellcheck: "false",
    },
  }) as HTMLTextAreaElement;

  const successInput = ElementCreate({
    tag: "input",
    classList: ["timeout-lines-field"],
    attributes: {
      id: "abcl-timeout-success-reduction",
      type: "number",
      min: "1",
      step: "1",
      value: "15",
      placeholder: "Seconds removed on success",
      autocomplete: "off",
      spellcheck: "false",
    },
  }) as HTMLInputElement;

  const failureInput = ElementCreate({
    tag: "input",
    classList: ["timeout-lines-field"],
    attributes: {
      id: "abcl-timeout-failure-addition",
      type: "number",
      min: "1",
      step: "1",
      value: "5",
      placeholder: "Seconds added on failure",
      autocomplete: "off",
      spellcheck: "false",
    },
  }) as HTMLInputElement;

  sentenceInput.addEventListener("paste", event => event.preventDefault());
  sentenceInput.addEventListener("copy", event => event.preventDefault());
  sentenceInput.addEventListener("cut", event => event.preventDefault());

  const sendButton = ElementButton.Create(
    null,
    () => {
      const targetValue = targetSelect.value;
      const target = targetValue ? getCharacter(Number(targetValue)) : null;
      const duration = Number(durationInput.value);
      const sentence = sentenceInput.value.trim();
      const successReduction = Number(successInput.value);
      const failureAddition = Number(failureInput.value);

      if (!target || !target.MemberNumber) {
        sendChatLocal("Please select a valid target for the timeout.");
        return;
      }
      if (!Number.isFinite(duration) || duration <= 0) {
        sendChatLocal("Duration must be a positive number of seconds.");
        return;
      }
      if (!sentence) {
        sendChatLocal("The sentence cannot be blank.");
        return;
      }
      if (!Number.isFinite(successReduction) || successReduction <= 0) {
        sendChatLocal("Success reduction must be a positive number of seconds.");
        return;
      }
      if (!Number.isFinite(failureAddition) || failureAddition <= 0) {
        sendChatLocal("Failure addition must be a positive number of seconds.");
        return;
      }

      const menu = document.getElementById(panelId);
      if (menu) menu.remove();

      if (target.MemberNumber === Player.MemberNumber) {
        beginTimeoutPunishment(target, duration, sentence, successReduction, failureAddition);
        return;
      }

      sendChatLocal(`Punishment sent to ${CharacterNickname(target) || target.Name}. They need to accept it.`);
      timeoutRemote.emit(target.MemberNumber, "request", {
        senderMemberNumber: Player.MemberNumber,
        targetMemberNumber: target.MemberNumber,
        durationSeconds: duration,
        sentence,
        successReduction,
        failureAddition,
      });
    },
    null,
    {
      button: {
        classList: ["abcl-distraction-rush-button"],
        children: ["Send punishment"],
      },
    },
  );

  const closeButton = ElementButton.Create(
    null,
    () => {
      const menu = document.getElementById(panelId);
      menu?.remove();
    },
    null,
    {
      button: {
        classList: ["abcl-distraction-rush-button", "abcl-distraction-rush-button-forfeit"],
        children: ["Close"],
      },
    },
  );

  if (initial?.target) {
    const targetValue = typeof initial.target === "object" ? String(initial.target.MemberNumber ?? "") : String(initial.target);
    if (targetValue) {
      targetSelect.value = targetValue;
    }
  }
  if (typeof initial?.duration === "number" && Number.isFinite(initial.duration)) {
    durationInput.value = String(Math.max(1, Math.round(initial.duration)));
  }
  if (typeof initial?.sentence === "string") {
    sentenceInput.value = initial.sentence;
  }
  if (typeof initial?.successReduction === "number" && Number.isFinite(initial.successReduction)) {
    successInput.value = String(Math.max(1, Math.round(initial.successReduction)));
  }
  if (typeof initial?.failureAddition === "number" && Number.isFinite(initial.failureAddition)) {
    failureInput.value = String(Math.max(1, Math.round(initial.failureAddition)));
  }

  const menu = ElementCreate({
    tag: "div",
    attributes: { id: panelId },
    classList: ["game-container", "timeout-lines-menu", "minigame-loading"],
    children: [
      {
        tag: "h1",
        children: ["Timeout punishment"],
      },
      {
        tag: "div",
        classList: ["timeout-lines-grid"],
        children: [
          {
            tag: "label",
            classList: ["timeout-lines-field-wrap"],
            children: [{ tag: "span", children: ["Target"] }, targetSelect],
          },
          {
            tag: "label",
            classList: ["timeout-lines-field-wrap"],
            children: [{ tag: "span", children: ["Duration (seconds)"] }, durationInput],
          },
          {
            tag: "label",
            classList: ["timeout-lines-field-wrap", "timeout-lines-full"],
            children: [{ tag: "span", children: ["Line to write"] }, sentenceInput],
          },
          {
            tag: "label",
            classList: ["timeout-lines-field-wrap"],
            children: [{ tag: "span", children: ["Success removes (seconds)"] }, successInput],
          },
          {
            tag: "label",
            classList: ["timeout-lines-field-wrap"],
            children: [{ tag: "span", children: ["Failure adds (seconds)"] }, failureInput],
          },
        ],
      },
      {
        tag: "div",
        classList: ["timeout-lines-actions"],
        children: [closeButton, sendButton],
      },
    ],
    parent: overlay,
  });

  return menu;
};

export const requestTimeoutPunishment = (
  target: Character,
  durationSeconds: number,
  sentence: string,
  successReduction: number = 15,
  failureAddition: number = 5,
  senderMemberNumber: number = Player.MemberNumber,
) => {
  const memberNumber = target.MemberNumber;
  if (!memberNumber) return;
  const name = CharacterNickname(target) || target.Name;
  const promptId = `abcl-timeout-prompt-${memberNumber}`;
  const existing = document.getElementById(promptId);
  if (existing) return;

  const acceptButton = ElementButton.Create(
    `${promptId}-accept`,
    () => {
      if (Player.MemberNumber !== memberNumber) return;
      if (activeTimeouts.has(memberNumber)) return;
      beginTimeoutPunishment(target, durationSeconds, sentence, successReduction, failureAddition);
      timeoutRemote.emit(senderMemberNumber, "accept", {
        senderMemberNumber,
        targetMemberNumber: memberNumber,
        durationSeconds,
        sentence,
        successReduction,
        failureAddition,
      });
      const prompt = document.getElementById(promptId);
      prompt?.remove();
    },
    null,
    {
      button: {
        classList: ["abcl-distraction-rush-button"],
        children: ["Accept"],
      },
    },
  );

  const declineButton = ElementButton.Create(
    `${promptId}-decline`,
    () => {
      if (Player.MemberNumber !== memberNumber) return;
      const sender = ChatRoomCharacter.find(character => character.MemberNumber === senderMemberNumber);
      const senderName = sender ? CharacterNickname(sender) || sender.Name : `member ${senderMemberNumber}`;
      sendChatLocal(`You turned down the timeout lines punishment from ${senderName}.`);
      timeoutRemote.emit(senderMemberNumber, "decline", {
        senderMemberNumber,
        targetMemberNumber: memberNumber,
      });
      const prompt = document.getElementById(promptId);
      prompt?.remove();
    },
    null,
    {
      button: {
        classList: ["abcl-distraction-rush-button", "abcl-distraction-rush-button-forfeit"],
        children: ["Decline"],
      },
    },
  );

  ElementCreate({
    tag: "div",
    attributes: { id: promptId },
    classList: ["game-container", "timeout-lines-menu", "minigame-loading"],
    children: [
      { tag: "h1", children: ["Timeout punishment"] },
      { tag: "p", children: [`${name}, you have a writing punishment to accept.`] },
      {
        tag: "div",
        classList: ["timeout-lines-status-row"],
        children: [
          { tag: "span", classList: ["timeout-lines-timer-label"], children: ["Duration"] },
          { tag: "div", classList: ["timeout-lines-timer"], children: [`${durationSeconds} sec`] },
        ],
      },
      { tag: "div", classList: ["timeout-lines-sentence"], children: [sentence] },
      {
        tag: "div",
        classList: ["timeout-lines-actions"],
        children: [declineButton, acceptButton],
      },
    ],
    parent: overlay,
  });
};

export const beginTimeoutPunishment = (
  target: Character,
  durationSeconds: number,
  sentence: string,
  successReduction: number = 15,
  failureAddition: number = 5,
) => {
  const memberNumber = target.MemberNumber;
  if (!memberNumber) return;
  if (Player.MemberNumber !== memberNumber) return;

  if (activeTimeouts.has(memberNumber)) return;

  const state: TimeoutPunishmentState = {
    memberNumber,
    durationSeconds,
    sentence,
    successReduction,
    failureAddition,
    startedAt: Date.now(),
    endAt: Date.now() + durationSeconds * 1000,
    remainingSeconds: durationSeconds,
    timer: null,
    game: null,
  };

  const game = new TimeoutLinesGame(memberNumber, durationSeconds, sentence, successReduction, failureAddition);
  state.game = game;
  activeTimeouts.set(memberNumber, state);
  game.Load();
};

export class TimeoutLinesGame extends BaseMiniGame {
  name = "TimeoutLines";
  targetMemberNumber: number;
  durationSeconds: number;
  sentence: string;
  successReduction: number;
  failureAddition: number;
  remainingSeconds: number;
  timerId: number | null = null;
  element: HTMLElement | null = null;
  inputElement: HTMLTextAreaElement | null = null;
  statusElement: HTMLElement | null = null;
  completed: boolean = false;

  constructor(
    targetMemberNumber?: number,
    durationSeconds: number = 60,
    sentence: string = "I will be good.",
    successReduction: number = 15,
    failureAddition: number = 5,
  ) {
    super();
    this.targetMemberNumber = targetMemberNumber ?? Player.MemberNumber;
    this.durationSeconds = Math.max(5, durationSeconds);
    this.sentence = sentence.trim() || "I will be good.";
    this.successReduction = Math.max(1, successReduction);
    this.failureAddition = Math.max(1, failureAddition);
    this.remainingSeconds = this.durationSeconds;
  }

  private syncTimerText() {
    if (!this.element) return;
    const timerEl = this.element.querySelector("#abcl-timeout-timer");
    if (!timerEl) return;
    timerEl.textContent = formatTimer(this.remainingSeconds);
  }

  private updateGhostText() {
    const preview = this.element?.querySelector("#abcl-timeout-ghost-preview") as HTMLElement | null;
    if (!preview || !this.inputElement) return;

    const typedText = this.inputElement.value;
    const expected = this.sentence;
    preview.innerHTML = "";

    const typedSpan = document.createElement("span");
    typedSpan.className = "timeout-line-typed";
    typedSpan.textContent = typedText;
    preview.appendChild(typedSpan);

    const ghostSpan = document.createElement("span");
    ghostSpan.className = "timeout-line-ghost";
    ghostSpan.textContent = expected.slice(typedText.length);
    preview.appendChild(ghostSpan);
  }

  private announceEnd(reason: "completed" | "timedOut" | "quit") {
    const target = ChatRoomCharacter.find(character => character.MemberNumber === this.targetMemberNumber);

    if (reason === "completed") {
      sendABCLAction("%OPP_NAME% completed the timeout writing punishment.", target ?? null, "punishment", target ?? undefined);
      return;
    }

    if (reason === "timedOut") {
      sendABCLAction("%OPP_NAME% failed the timeout writing punishment and the sentence is over.", target ?? null, "punishment", target ?? undefined);
      return;
    }

    sendABCLAction("%OPP_NAME% stopped the timeout punishment early.", target ?? null, "punishment", target ?? undefined);
  }

  private finish(escaped: boolean = false, reason: "completed" | "timedOut" | "quit" = escaped ? "completed" : "timedOut") {
    if (this.completed) return;
    this.completed = true;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.inputElement) {
      this.inputElement.disabled = true;
    }

    if (escaped) {
      this.announceEnd("completed");
      if (Player.MemberNumber === this.targetMemberNumber) {
        sendChatLocal("Timeout lines complete. You made it through the punishment.");
      }
    } else {
      this.announceEnd(reason === "quit" ? "quit" : "timedOut");
      if (Player.MemberNumber === this.targetMemberNumber) {
        sendChatLocal("Your timeout has ended.");
      }
    }

    const punishment = activeTimeouts.get(this.targetMemberNumber);
    if (punishment) {
      punishment.timer = null;
      punishment.remainingSeconds = 0;
      punishment.game = null;
      activeTimeouts.delete(this.targetMemberNumber);
    }

    if (this.element) {
      const status = this.element.querySelector("#abcl-timeout-status");
      if (status) {
        status.textContent = escaped ? "Completed." : "Finished.";
      }
      if (this.element.querySelector("#abcl-timeout-cancel")) {
        (this.element.querySelector("#abcl-timeout-cancel") as HTMLButtonElement).disabled = true;
      }
      const faded = document.createElement("div");
      faded.className = "abcl-timeout-lines-finished";
      faded.textContent = escaped ? "You completed the sentence and survived the timeout." : "The timeout is over.";
      this.element.appendChild(faded);
    }

    setTimeout(() => {
      this.Unload();
    }, 2500);
  }

  private recordMistake() {
    this.remainingSeconds += this.failureAddition;
    this.syncTimerText();
    if (this.inputElement) {
      this.inputElement.value = "";
      this.inputElement.focus();
      this.updateGhostText();
    }
    if (this.statusElement) {
      this.statusElement.textContent = `Mistake! +${this.failureAddition} seconds. Start over.`;
    }
  }

  private handleTyping() {
    if (!this.inputElement || this.completed) return;
    const typedText = this.inputElement.value;
    const expectedText = this.sentence.trim();

    if (!typedText) {
      this.updateGhostText();
      return;
    }

    if (typedText.toLowerCase() === expectedText.toLowerCase()) {
      this.submitLine();
      return;
    }

    if (!expectedText.toLowerCase().startsWith(typedText.toLowerCase())) {
      this.recordMistake();
      return;
    }

    this.updateGhostText();
  }

  private submitLine() {
    if (!this.inputElement) return;
    const value = this.inputElement.value.trim();
    if (!value) {
      if (this.statusElement) {
        this.statusElement.textContent = "Write the sentence to reduce the timer.";
      }
      return;
    }

    if (this.inputElement.value.trim().toLowerCase() === this.sentence.trim().toLowerCase()) {
      this.remainingSeconds = Math.max(0, this.remainingSeconds - this.successReduction);
      this.inputElement.value = "";
      this.syncTimerText();
      this.updateGhostText();
      if (this.statusElement) {
        this.statusElement.textContent = `Nice. You shaved off ${this.successReduction} seconds.`;
      }
      if (this.remainingSeconds <= 0) {
        this.finish(true);
      }
      return;
    }

    if (this.statusElement) {
      this.statusElement.textContent = "Close, but not quite. Keep trying or sit it out.";
    }
  }

  Load() {
    super.Load();
    this.element = ElementCreate({
      tag: "div",
      attributes: {
        id: "abcl-timeout-lines-minigame",
      },
      classList: ["game-container", "timeout-lines-game", "minigame-loading"],
      children: [
        {
          tag: "h1",
          children: ["Timeout punishment"],
        },
        {
          tag: "div",
          classList: ["timeout-lines-status-row"],
          children: [
            {
              tag: "span",
              classList: ["timeout-lines-timer-label"],
              children: ["Time left"],
            },
            {
              tag: "div",
              attributes: {
                id: "abcl-timeout-timer",
              },
              classList: ["timeout-lines-timer"],
              children: [formatTimer(this.remainingSeconds)],
            },
          ],
        },
        {
          tag: "div",
          attributes: {
            id: "abcl-timeout-status",
          },
          classList: ["timeout-lines-status"],
          children: ["Write the line before the timer expires."],
        },
        {
          tag: "div",
          classList: ["timeout-lines-sentence"],
          children: [this.sentence],
        },
        {
          tag: "div",
          classList: ["timeout-lines-ghost-wrap"],
          children: [
            { tag: "span", classList: ["timeout-lines-preview-label"], children: ["What comes next"] },
            { tag: "div", attributes: { id: "abcl-timeout-ghost-preview" }, classList: ["timeout-lines-ghost-preview"], children: [""] },
          ],
        },
        {
          tag: "textarea",
          attributes: {
            id: "abcl-timeout-input",
            rows: "4",
            placeholder: "Write the line here...",
            autocomplete: "off",
            autocorrect: "off",
            autocapitalize: "off",
            spellcheck: "false",
          },
          classList: ["timeout-lines-textarea"],
        },
        ElementButton.Create(
          "abcl-timeout-cancel",
          () => {
            if (!this.completed) {
              this.finish(false, "quit");
            }
          },
          null,
          {
            button: {
              classList: ["abcl-distraction-rush-button", "abcl-distraction-rush-button-forfeit"],
              children: ["I am done waiting"],
            },
          },
        ),
      ],
      parent: overlay,
    });

    this.statusElement = this.element.querySelector("#abcl-timeout-status") as HTMLElement | null;
    this.inputElement = this.element.querySelector("#abcl-timeout-input") as HTMLTextAreaElement | null;
    this.syncTimerText();
    this.updateGhostText();

    if (this.inputElement) {
      this.inputElement.addEventListener("input", () => this.handleTyping());
      this.inputElement.addEventListener("paste", event => event.preventDefault());
      this.inputElement.addEventListener("copy", event => event.preventDefault());
      this.inputElement.addEventListener("cut", event => event.preventDefault());
      this.inputElement.addEventListener("contextmenu", event => event.preventDefault());
      this.inputElement.addEventListener("drop", event => event.preventDefault());
      this.inputElement.setAttribute("autocomplete", "off");
      this.inputElement.setAttribute("autocorrect", "off");
      this.inputElement.setAttribute("autocapitalize", "none");
      this.inputElement.spellcheck = false;
    }

    this.timerId = window.setInterval(() => {
      if (this.completed) return;
      this.remainingSeconds = Math.max(0, this.remainingSeconds - 1);
      this.syncTimerText();
      if (this.remainingSeconds <= 0) {
        this.finish(false, "timedOut");
      }
    }, 1000);
  }

  Unload() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.element) {
      ElementRemove(this.element);
      this.element = null;
    }
    const punishment = activeTimeouts.get(this.targetMemberNumber);
    if (punishment && punishment.game === this) {
      punishment.game = null;
      activeTimeouts.delete(this.targetMemberNumber);
    }
  }

  Run() {
    this.Load();
  }
  Click() {}
  Resize() {}
  KeyDown() {}
  Exit() {
    this.Unload();
  }
  End(victory: boolean) {
    this.finish(victory);
  }
}

(window as any).TimeoutLinesGame = TimeoutLinesGame;
(window as any).TimeoutLinesMain = () => new TimeoutLinesGame();
