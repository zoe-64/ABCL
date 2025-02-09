import { generateUniqueID } from "../utils";
import { abclPlayer } from "./player";

export class ABCLStatsWindow {
  statsWindow: HTMLElement;
  constructor() {
    this.statsWindow = document.createElement("div");
    new MovableElement(this.statsWindow);
    this.statsWindow.classList.add(`${modIdentifier}StatsWindow`);
    this.statsWindow.innerHTML = `<p class="${modIdentifier}StatsWindowHeader">Stats</p>
		<div class="${modIdentifier}StatsWindowContent">
			<ol class="${modIdentifier}StatsWindowList">
				<li class="${modIdentifier}StatsWindowListItem ${modIdentifier}SoilinessPercentage"> Soiled-ness 
        <input type="range" min="0" max="100" value="${
          abclPlayer.stats.SoilinessPercentage * 100
        }" class="${modIdentifier}StatsWindowSlider ${modIdentifier}SoilinessPercentageSlider" readonly>
        </li>

				<li class="${modIdentifier}StatsWindowListItem ${modIdentifier}WetnessPercentage"> Wetness 
        <input type="range" min="0" max="100" value="${
          abclPlayer.stats.WetnessPercentage * 100
        }" class="${modIdentifier}StatsWindowSlider ${modIdentifier}WetnessPercentageSlider" readonly>
        </li>

				<li class="${modIdentifier}StatsWindowListItem ${modIdentifier}BowelFullness">Bowel <input type="range" min="0" max="100" value="${
      abclPlayer.stats.BowelFullness * 100
    }" class="${modIdentifier}StatsWindowSlider ${modIdentifier}BowelFullnessSlider" readonly></li>
				<li class="${modIdentifier}StatsWindowListItem ${modIdentifier}BladderFullness">Bladder <input type="range" min="0" max="100" value="${
      abclPlayer.stats.BladderFullness * 100
    }" class="${modIdentifier}StatsWindowSlider ${modIdentifier}BladderFullnessSlider" readonly></li>
				<li class="${modIdentifier}StatsWindowListItem ${modIdentifier}Incontinence">Incontinence <input type="range" min="0" max="100" value="${
      abclPlayer.stats.Incontinence * 100
    }" class="${modIdentifier}StatsWindowSlider ${modIdentifier}IncontinenceSlider" readonly></li>
				<li class="${modIdentifier}StatsWindowListItem ${modIdentifier}MentalRegressionSlider">Mental Regression <input type="range" min="0" max="100" value="${
      abclPlayer.stats.MentalRegression * 100
    }" class="${modIdentifier}StatsWindowSlider ${modIdentifier}MentalRegressionSlider" readonly></li>
				</ol>
		</div>
	`;

    overlay.appendChild(this.statsWindow);
  }

  async update() {
    this.statsWindow
      .querySelector(`.${modIdentifier}SoilinessPercentage input`)
      ?.setAttribute("value", `${abclPlayer.stats.SoilinessPercentage * 100}`);
    this.statsWindow
      .querySelector(`.${modIdentifier}WetnessPercentage input`)
      ?.setAttribute("value", `${abclPlayer.stats.WetnessPercentage * 100}`);
    this.statsWindow
      .querySelector(`.${modIdentifier}BowelFullness input`)
      ?.setAttribute("value", `${abclPlayer.stats.BowelFullness * 100}`);
    this.statsWindow
      .querySelector(`.${modIdentifier}BladderFullness input`)
      ?.setAttribute("value", `${abclPlayer.stats.BladderFullness * 100}`);
    this.statsWindow
      .querySelector(`.${modIdentifier}Incontinence input`)
      ?.setAttribute("value", `${abclPlayer.stats.Incontinence * 100}`);
    this.statsWindow
      .querySelector(`.${modIdentifier}MentalRegression input`)
      ?.setAttribute("value", `${abclPlayer.stats.MentalRegression * 100}`);
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
    document.body.appendChild(overlay);
  }, 5000);

  abclStatsWindow = new ABCLStatsWindow();
  setInterval(() => abclStatsWindow.update(), 1000);
};
