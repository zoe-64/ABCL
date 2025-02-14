import { bcModSDK, generateUniqueID } from "../utils";
import { abclPlayer } from "./player";

export class ABCLStatsWindow {
  statsWindow: HTMLElement;
  minimizeButton: HTMLButtonElement;
  closeButton: HTMLButtonElement;
  openButton: HTMLButtonElement;
  folded: boolean = false;
  constructor() {
    document.addEventListener("click", () => {
      if (CurrentScreen !== "ChatRoom") {
        this.close();
        this.openButton.style.display = "none";
      } else {
        this.openButton.style.display = "block";
      }
    });
    this.openButton = document.createElement("button");
    this.openButton.classList.add(`${modIdentifier}OpenStatsButton`);
    this.openButton.textContent = "ABCL Stats";
    overlay.appendChild(this.openButton);

    this.statsWindow = document.createElement("div");
    new MovableElement(this.statsWindow);

    this.statsWindow.classList.add(`${modIdentifier}StatsWindow`);
    this.statsWindow.innerHTML = `
    <div class="${modIdentifier}WindowHeader">
    <p class="${modIdentifier}WindowHeaderTitle">Stats</p>
    <button class="${modIdentifier}WindowMinimize">△</button>
    <button class="${modIdentifier}WindowClose">X</button>
    </div>
		<div class="${modIdentifier}StatsWindowContent">
			<ol class="${modIdentifier}StatsWindowList">  
      ${this.getStatsListElement("SoilinessPercentage", "Soiled-ness")}
      ${this.getStatsListElement("WetnessPercentage", "Wetness")} 
      ${this.getStatsListElement("BowelFullness", "Bowel")}
      ${this.getStatsListElement("BladderFullness", "Bladder")}
      ${this.getStatsListElement("Incontinence", "Incontinence")}
      ${this.getStatsListElement("MentalRegression", "Mental Regression")}
      </ol>
		</div>
	`;

    this.minimizeButton = this.statsWindow.querySelector(
      `.${modIdentifier}WindowMinimize`
    )!;
    this.closeButton = this.statsWindow.querySelector(
      `.${modIdentifier}WindowClose`
    )!;

    this.minimizeButton.addEventListener("click", () => this.fold());
    overlay.appendChild(this.statsWindow);
    this.openButton.addEventListener("click", () => {
      if (this.statsWindow.classList.contains(`${modIdentifier}Hidden`)) {
        this.open();
      } else {
        this.close();
      }
    });
    this.closeButton.addEventListener("click", () => this.close());
    this.update();
  }
  close() {
    this.statsWindow.classList.add(`${modIdentifier}Hidden`);
  }
  open() {
    this.statsWindow.classList.remove(`${modIdentifier}Hidden`);
    this.statsWindow.style.top = "0px";
    this.statsWindow.style.left = "0px";
  }
  fold() {
    this.statsWindow.classList.toggle(`${modIdentifier}StatsWindowFolded`);
    this.minimizeButton.textContent = this.folded ? "△" : "▽";
    this.folded = !this.folded;
  }
  getStatsListElement(className: string, title: string): string {
    return `
				<li class="${modIdentifier}StatsWindowListItem ${modIdentifier}${className}"> ${title}
        <p></p>
        <input type="range" min="0" max="100" class="${modIdentifier}StatsWindowSlider ${modIdentifier}${className}Slider" readonly>
        </li>
      `;
  }
  async update() {
    const updateInput = (className: string, value: number) => {
      this.statsWindow
        .querySelector<HTMLInputElement>(`.${modIdentifier}${className} input`)
        ?.setAttribute("value", `${value * 100}`);
      const paragraphElement =
        this.statsWindow.querySelector<HTMLParagraphElement>(
          `.${modIdentifier}${className} p`
        );
      if (paragraphElement) {
        paragraphElement.textContent = `${Math.floor(value * 1000) / 10}%`;
      }
    };

    updateInput("SoilinessPercentage", abclPlayer.stats.SoilinessPercentage);
    updateInput("WetnessPercentage", abclPlayer.stats.WetnessPercentage);
    updateInput("BowelFullness", abclPlayer.stats.BowelFullness);
    updateInput("BladderFullness", abclPlayer.stats.BladderFullness);
    updateInput("Incontinence", abclPlayer.stats.Incontinence);
    updateInput("MentalRegression", abclPlayer.stats.MentalRegression);
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
  setTimeout(() => {
    abclStatsWindow = new ABCLStatsWindow();

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
          abclStatsWindow.openButton.style.top = `${Y}px`;
          abclStatsWindow.openButton.style.left = `${X}px`;
        }
      }
    );
    document.body.appendChild(overlay);
  }, 1500);
};
