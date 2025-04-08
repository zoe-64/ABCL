import { generateUniqueID, waitForElement } from "../utils";

export const abclStatsWindow = {
  state: 0,
  memberNumber: 0,
  setState: (updater: (v: number) => number) => {
    abclStatsWindow.state = updater(abclStatsWindow.state);
  },
  setMemberNumber: (memberNumber: number) => {
    abclStatsWindow.setMemberNumber(memberNumber);
  },
  update: () => {
    abclStatsWindow.setState(v => v + 1);
  },
};
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

export class ABCLYesNoPrompt {
  message: string;
  onAccept: (...args: any) => void;
  onDeny: (...args: any) => void;
  id: string;
  prompt: HTMLElement = document.createElement("div");
  constructor(message: string, onAccept: () => void, onDeny: () => void, timeout: number = -1) {
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
    this.prompt.classList.add(`${modIdentifier}Prompt`, `no-resize`);
    this.prompt.id = this.id;
    this.prompt.innerHTML = `<p>${this.message}</p><button class="${modIdentifier}PromptNo ${modIdentifier}Button">Deny</button><button class="${modIdentifier}PromptYes ${modIdentifier}Button">Accept</button>`;
    overlay.appendChild(this.prompt);
    this.prompt.querySelector(`#${this.id} .${modIdentifier}PromptYes`)?.addEventListener("click", () => {
      this.onAccept();
      this.prompt.remove();
    });
    this.prompt.querySelector(`#${this.id} .${modIdentifier}PromptNo`)?.addEventListener("click", () => {
      this.onDeny();
      this.prompt.remove();
    });
  }
}

export const overlay = document.createElement("div");
overlay.id = `${modIdentifier}-overlay`;

export const resizeElements = () => {
  ElementPositionFixed(overlay.id, 0, 0, 2000, 1000);
  ElementPositionFixed("ABCL-stats-panel", 1700, 0, 300, 1000);
};

window.addEventListener("resize", resizeElements);

overlay.classList.add(`ABCL-overlay`);

export const initOverlay = () => {
  document.body.appendChild(overlay);
  waitForElement("#chat-room-div", { childCheck: true, timeout: 9999999999999999999999 }).then(() => {
    waitForElement(`.ABCL-overlay`, { timeout: 9999999999999999999999 }).then(() => {
      document.removeChild(overlay);
      setTimeout(() => {
        document.appendChild(overlay);
      }, 1000);
    });
  });
};
