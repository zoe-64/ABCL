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

export const overlay = document.createElement("div");
overlay.id = `${modIdentifier}-overlay`;

export const resizeElements = () => {
  ElementPositionFixed(overlay.id, 0, 0, 2000, 1000);
  ElementPositionFixed("ABCL-stats-panel", 1700, 0, 300, 1000);

  const exitButtons = document.querySelectorAll(`.${modIdentifier}-exit-button`);
  for (let i = 0; i < exitButtons.length; i++) {
    const exitButton = exitButtons[i];
    exitButton.id = exitButton.id || generateUniqueID();
    ElementPositionFixed(exitButton.id, 1815, 75, 90, 90);
  }
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
