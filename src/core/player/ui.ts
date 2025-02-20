import { bcModSDK, generateUniqueID, waitForElement } from "../utils";
import { getPlayerDiaperSize, hasDiaper } from "./diaper";
import { getCharacter, getCharacterName } from "./playerUtils";

export class ABCLStatsWindow {
  statsDrawer: HTMLElement;
  // openButton: HTMLButtonElement;
  folded: boolean = false;
  constructor() {
    //this.openButton = document.createElement("button");
    //this.openButton.classList.add(`${modIdentifier}OpenStatsButton`);
    //this.openButton.textContent = "ABCL Stats";
    // overlay.appendChild(this.openButton);

    this.statsDrawer = document.createElement("sl-drawer");
    this.statsDrawer.innerHTML = `
    <p class="${modIdentifier}WindowHeaderTitle">Stats</p>
    <sl-select id="${modIdentifier}CurrentPlayerSelect" value="${Player.MemberNumber}">
    </sl-select>

  
		<div class="${modIdentifier}StatsWindowContent">
      <label id="SoilinessPercentage">Soiliness</label>
      <sl-progress-bar label="Soiliness" class="${modIdentifier}SoilinessPercentage"></sl-progress-bar>
      <label id="WetnessPercentage">Wetness</label>
      <sl-progress-bar label="Wetness" class="${modIdentifier}WetnessPercentage"></sl-progress-bar>
      <label id="BowelFullness">Bowel</label>
      <sl-progress-bar label="Bowel Fullness" class="${modIdentifier}BowelFullness"></sl-progress-bar>
      <label id="BladderFullness">Bladder</label>
      <sl-progress-bar label="Bladder Fullness" class="${modIdentifier}BladderFullness"></sl-progress-bar>
      <label id="Incontinence">Incontinence</label>
      <sl-progress-bar label="Incontinence" class="${modIdentifier}Incontinence"></sl-progress-bar>
      <label id="MentalRegression">Mental Regression</label>
      <sl-progress-bar label="Mental Regression" class="${modIdentifier}MentalRegression"></sl-progress-bar>
		</div>
   <sl-button class="${modIdentifier}RefreshButton">Refresh</sl-button>
	`;

    overlay.appendChild(this.statsDrawer);
    this.statsDrawer
      .querySelector(`#${modIdentifier}CurrentPlayerSelect`)
      ?.addEventListener("sl-change", () => this.update());
    this.statsDrawer
      .querySelector(`.${modIdentifier}RefreshButton`)
      ?.addEventListener("click", () => this.update());
    // this.openButton.addEventListener("click", () => {
    //   if (this.statsDrawer.getAttribute("open") === "true") {
    //     this.close();
    //   } else {
    //     this.open();
    //   }
    // });
    this.update();
  }
  close() {
    this.statsDrawer.removeAttribute("open");
  }
  open(selectedPlayerId?: number) {
    this.statsDrawer.setAttribute("open", "true");
    if (selectedPlayerId !== undefined) {
      const currentPlayerSelect: HTMLSelectElement | null =
        this.statsDrawer.querySelector(`#${modIdentifier}CurrentPlayerSelect`);
      if (currentPlayerSelect) {
        currentPlayerSelect.value = selectedPlayerId.toString();
      }
    }
    this.update();
  }
  async update() {
    const currentPlayerSelect: HTMLSelectElement | null =
      this.statsDrawer.querySelector(`#${modIdentifier}CurrentPlayerSelect`);
    if (!currentPlayerSelect) return;

    let selectedCharacter: Character | undefined = getCharacter(
      currentPlayerSelect.value
    );
    if (!selectedCharacter || !selectedCharacter?.ABCL) {
      selectedCharacter = Player;
    }
    // fill select ChatRoomCharacter
    currentPlayerSelect.innerHTML = "";
    for (let character of ChatRoomCharacter) {
      if (!character.ABCL) continue;
      currentPlayerSelect.innerHTML += `<sl-option value="${
        character.MemberNumber
      }">${getCharacterName(character.MemberNumber)}</sl-option>`;
    }

    const updateInput = (className: string, value: number) => {
      value = Math.round(value);
      const input: HTMLInputElement | null = this.statsDrawer.querySelector(
        `.${modIdentifier}${className}`
      );
      const label: HTMLLabelElement | null = this.statsDrawer.querySelector(
        `#${className}`
      );
      if (!input || !label) return;
      const valueRounded = Math.round((value + Number.EPSILON) * 10) / 10;
      if (value >= 100) {
        input.value = "100";
        input.innerText = `overflowing ${Math.round(
          (value - 100) / (value / 100)
        )}%`;
        label.innerText = `${label.innerText.split(":")[0]}: overflowing ${
          valueRounded - 100
        }%`;
      } else {
        input.value = valueRounded.toString();
        input.innerText = valueRounded.toString() + "%";
        label.innerText =
          label.innerText.split(":")[0] + ": " + valueRounded.toString() + "%";
      }
    };
    if (!selectedCharacter.ABCL) {
      return;
    }
    if (hasDiaper(selectedCharacter)) {
      updateInput(
        "SoilinessPercentage",
        (selectedCharacter.ABCL.Stats.Soiliness.value /
          getPlayerDiaperSize(selectedCharacter)) *
          100
      );
      updateInput(
        "WetnessPercentage",
        (selectedCharacter.ABCL.Stats.Wetness.value /
          getPlayerDiaperSize(selectedCharacter)) *
          100
      );
    } else {
      updateInput("SoilinessPercentage", 0);
      updateInput("WetnessPercentage", 0);
    }

    updateInput(
      "BowelFullness",
      (selectedCharacter.ABCL.Stats.Bowel.value /
        selectedCharacter.ABCL.Stats.Bowel.size) *
        100
    );
    updateInput(
      "BladderFullness",
      (selectedCharacter.ABCL.Stats.Bladder.value /
        selectedCharacter.ABCL.Stats.Bladder.size) *
        100
    );
    updateInput(
      "Incontinence",
      selectedCharacter.ABCL.Stats.Incontinence.value * 100
    );
    updateInput(
      "MentalRegression",
      selectedCharacter.ABCL.Stats.MentalRegression.value * 100
    );
  }
}
class MovableElement {
  newX: number = 0;
  newY: number = 0;
  oldX: number = 0;
  oldY: number = 0;
  element: HTMLElement;
  isDragging: boolean = false;
  isResizing: boolean = false;
  resizeDirection: string | null = null;
  edgeThreshold: number = 10; // Distance from the edge to trigger resizing
  resizable: boolean = true;

  constructor(element: HTMLElement, resizable: boolean = false) {
    this.element = element;
    this.resizable = resizable;
    // Bind methods to the instance
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMoveForCursor = this.onMouseMoveForCursor.bind(this);

    this.element.addEventListener("mousedown", this.onMouseDown);

    this.element.addEventListener("mousemove", this.onMouseMoveForCursor);
    this.element.style.position = "fixed";

    if (!this.resizable) {
      return;
    }
    this.element.style.resize = "none";
    this.element.addEventListener("mouseenter", this.onMouseEnter);
    this.element.addEventListener("mouseleave", this.onMouseLeave);
  }

  onMouseEnter(event: MouseEvent) {
    // Add mousemove listener for cursor updates
    this.element.addEventListener("mousemove", this.onMouseMoveForCursor);
  }

  onMouseLeave(event: MouseEvent) {
    // Remove mousemove listener and reset cursor
    this.element.removeEventListener("mousemove", this.onMouseMoveForCursor);
    this.element.style.cursor = "default";
  }

  onMouseMoveForCursor(event: MouseEvent) {
    // Update cursor based on mouse position
    const { offsetX, offsetY } = event;
    const { offsetWidth, offsetHeight } = this.element;
    if (!this.resizable) return;
    if (offsetX < this.edgeThreshold) {
      this.element.style.cursor = "ew-resize"; // Left edge
    } else if (offsetX > offsetWidth - this.edgeThreshold) {
      this.element.style.cursor = "ew-resize"; // Right edge
    } else if (offsetY < this.edgeThreshold) {
      this.element.style.cursor = "ns-resize"; // Top edge
    } else if (offsetY > offsetHeight - this.edgeThreshold) {
      this.element.style.cursor = "ns-resize"; // Bottom edge
    } else {
      this.element.style.cursor = "default";
    }
  }

  onMouseDown(event: MouseEvent) {
    const { offsetX, offsetY } = event;
    const { offsetWidth, offsetHeight } = this.element;

    // Determine if resizing or dragging
    if (this.resizable) {
      if (offsetX < this.edgeThreshold) {
        this.isResizing = true;
        this.resizeDirection = "left";
      } else if (offsetX > offsetWidth - this.edgeThreshold) {
        this.isResizing = true;
        this.resizeDirection = "right";
      } else if (offsetY < this.edgeThreshold) {
        this.isResizing = true;
        this.resizeDirection = "top";
      } else if (offsetY > offsetHeight - this.edgeThreshold) {
        this.isResizing = true;
        this.resizeDirection = "bottom";
      } else {
        this.isDragging = true;
      }
    } else {
      this.isDragging = true;
    }

    if (this.isDragging || this.isResizing) {
      event.preventDefault();
      this.oldX = event.clientX;
      this.oldY = event.clientY;
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      // Dragging logic
      this.newX = this.oldX - event.clientX;
      this.newY = this.oldY - event.clientY;

      this.oldX = event.clientX;
      this.oldY = event.clientY;

      this.element.style.top = `${this.element.offsetTop - this.newY}px`;
      this.element.style.left = `${this.element.offsetLeft - this.newX}px`;
    } else if (this.isResizing) {
      // Resizing logic
      const deltaX = event.clientX - this.oldX;
      const deltaY = event.clientY - this.oldY;

      const style = getComputedStyle(this.element);
      const left = parseInt(style.left, 10);
      const top = parseInt(style.top, 10);
      const width = parseInt(style.width, 10);
      const height = parseInt(style.height, 10);

      switch (this.resizeDirection) {
        case "left":
          this.element.style.width = `${width - deltaX}px`;
          this.element.style.left = `${left + deltaX / 2}px`;
          break;
        case "right":
          this.element.style.width = `${width + deltaX}px`;
          this.element.style.left = `${left + deltaX / 2}px`;
          break;
        case "top":
          this.element.style.height = `${height - deltaY}px`;
          this.element.style.top = `${top + deltaY / 2}px`;
          break;
        case "bottom":
          this.element.style.height = `${height + deltaY}px`;
          this.element.style.top = `${top + deltaY / 2}px`;
          break;
      }

      this.oldX = event.clientX;
      this.oldY = event.clientY;
    }
  }

  onMouseUp(event: MouseEvent) {
    event.preventDefault();
    // Clean up
    this.isDragging = false;
    this.isResizing = false;
    this.resizeDirection = null;
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }
}

export class ABCLNotification {
  message: string;
  duration: number;
  constructor(message: string, duration: number = 3000) {
    this.message = message;
    this.duration = duration;
    this.show();
  }

  show() {
    const notification = document.createElement("div");
    notification.classList.add(`${modIdentifier}Notification`);
    notification.textContent = this.message;

    const closeButton = document.createElement("button");
    closeButton.classList.add("ABCLClose");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => notification.remove());

    notification.appendChild(closeButton);
    overlay.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, this.duration);
  }
}

export class ABCLYesNoPrompt {
  message: string;
  onAccept: (...args: any) => void;
  onDeny: (...args: any) => void;
  id: string;
  prompt: HTMLElement = document.createElement("div");
  constructor(
    message: string,
    onAccept: () => void,
    onDeny: () => void,
    timeout: number = -1
  ) {
    new MovableElement(this.prompt);
    this.id = generateUniqueID();
    this.message = message;
    this.onAccept = onAccept;
    this.onDeny = onDeny;
    this.show();
    if (timeout === -1) return;
    setTimeout(() => {
      this.prompt.remove();
    }, timeout);
  }

  show() {
    this.prompt.classList.add(`${modIdentifier}Prompt`);
    this.prompt.id = this.id;
    this.prompt.innerHTML = `<p>${this.message}</p><button class="${modIdentifier}PromptNo ${modIdentifier}Button">Deny</button><button class="${modIdentifier}PromptYes ${modIdentifier}Button">Accept</button>`;
    overlay.appendChild(this.prompt);
    this.prompt
      .querySelector(`#${this.id} .${modIdentifier}PromptYes`)
      ?.addEventListener("click", () => {
        this.onAccept();
        this.prompt.remove();
      });
    this.prompt
      .querySelector(`#${this.id} .${modIdentifier}PromptNo`)
      ?.addEventListener("click", () => {
        this.onDeny();
        this.prompt.remove();
      });
  }
}

// like in cookie clicker how numbers float up
export class ABCLTextParticle {
  element: HTMLElement = document.createElement("div");
  color: string = "white";
  size: number = 1;
  speed: number = 1;
  x: number = 0;
  y: number = 0;

  constructor(
    element: HTMLElement | string,
    options: { size?: number; speed?: number; x: number; y: number } = {
      x: 0,
      y: 0,
    },
    color: string = "white"
  ) {
    if (typeof element === "string") {
      this.element.innerHTML = element;
    } else {
      this.element = element;
    }
    this.speed = options.speed || 1;
    this.size = options.size || 1;
    this.x = options.x;
    this.y = options.y;
    this.element.classList.add(`${modIdentifier}TextParticle`);
    this.element.style.color = color;
    this.element.style.fontSize = `${options.size}px`;
    this.element.style.left = `${options.x}px`;
    this.element.style.top = `${options.y}px`;
    overlay.appendChild(this.element);
    setInterval(() => this.render(), 1000 / 30);
  }
  render() {
    this.element.style.top = `${
      parseInt(this.element.style.top) - this.speed
    }px`;
    if (parseInt(this.element.style.top) < 0) {
      this.element.remove();
    }
  }
}

export const overlay = document.createElement("div");

export let abclStatsWindow: ABCLStatsWindow;
overlay.classList.add(`${modIdentifier}Overlay`);

export const initOverlay = () => {
  waitForElement("#chat-room-div", { childCheck: true }).then(() => {
    abclStatsWindow = new ABCLStatsWindow();
    overlay.classList.add(
      (Player.ChatSettings?.ColorTheme ?? "Light").startsWith("Light")
        ? "sl-theme-light"
        : "sl-theme-dark"
    );
    overlay.style.color = (
      Player.ChatSettings?.ColorTheme ?? "Light"
    ).startsWith("Light")
      ? "black"
      : "white";
    bcModSDK.hookFunction(
      "ChatRoomCharacterViewDrawOverlay",
      1,
      (args, next) => {
        next(args);
        const [C, CharX, CharY, Zoom] = args;
        if (C.MemberNumber === Player.MemberNumber) {
          const [X, Y] = [
            ((CharX + 300 * Zoom) / 2000) * overlay.clientWidth,
            ((CharY + 550 * Zoom) / 1000) * overlay.clientHeight,
          ];
          //abclStatsWindow.openButton.style.top = `${Y}px`;
          //abclStatsWindow.openButton.style.left = `${X}px`;
        }
      }
    );
    document.body.appendChild(overlay);
  });
};
