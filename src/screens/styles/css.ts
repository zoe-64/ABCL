`--tmd-main: #202020;
  --tmd-element: #262626;
  --tmd-element-hover: #2E2E2E;
  --tmd-element-disabled: #1E1E1E;
  --tmd-element-hint: #2E2E2E;
  --tmd-text: #CCCCCC;
  --tmd-text-shadow: #000000;
  --tmd-accent: #440171;
  --tmd-accent-hover: #520188;
  --tmd-accent-disabled: #36015A;
  --tmd-equipped: #3575B5;
  --tmd-equipped-hover: #4E8CCB;
  --tmd-crafted: #AAA235;
  --tmd-crafted-hover: #C5BD46;
  --tmd-blocked: #870C0C;
  --tmd-blocked-hover: #A20E0E;
  --tmd-limited: #9D6600;
  --tmd-limited-hover: #BC7A00;
  --tmd-allowed: #008800;
  --tmd-allowed-hover: #00A300;
  --tmd-room-friend: #008800;
  --tmd-room-friend-hover: #00A300;
  --tmd-room-blocked: #870C0C;
  --tmd-room-blocked-hover: #A20E0E;
  --tmd-room-game: #3575B5;
  --tmd-room-game-hover: #4E8CCB;`;
export const createCSS = () => {
  const fontColor = "var(--tmd-text, --sl-color-neutral-700)";
  const sliders = [
    {
      className: "SoilinessPercentage",
      primary: "#d1aa98ff",
      secondary: "#ab674aff",
    },
    {
      className: "WetnessPercentage",
      primary: "#f3e1aeff",
      secondary: "#e7c463ff",
    },
    {
      className: "BowelFullness",
      primary: "#b7795cff",
      secondary: "#7c4c36ff",
    },
    {
      className: "BladderFullness",
      primary: "#eacd73ff",
      secondary: "#cba01eff",
    },
    {
      className: "Incontinence",
      primary: "#eeacacff",
      secondary: "#cb5b5bff",
    },
    {
      className: "MentalRegression",
      primary: "#e6bff1ff",
      secondary: "#ad74beff",
    },
  ];
  let cssSliders = "";
  for (const slider of sliders) {
    cssSliders += `
  .${modIdentifier}${slider.className} {
    margin-bottom: 10px;
    margin-top: 3px;
  }
	.${modIdentifier}${slider.className}::part(base) {
		background-color: ${slider.primary};
	}
  .${modIdentifier}${slider.className}::part(indicator) {
    background-color: ${slider.secondary};
  }`;
  }

  return `
#ABCLCurrentPlayerSelect {
  margin-bottom: 5px;
}

.ABCLOverlay {
	aspect-ratio: 2/1;
	max-width: 100%;
	max-height: 100%;
	margin: auto;
	position: relative;
	top: 50%;
	pointer-events: none;
  font-family: arial;
  color: ${fontColor};
  order: 100;
  z-index: 10000;
}
.ABCLWindowHeaderTitle {
  margin: 5px;
  font-size: 32px;
  font-weight: bold;
}

.ABCLOpenStatsButton {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
  aspect-ratio: 1/1;
  width: 4%;
  white-space: collapse;
  text-align: center;
  border-radius: 5px;
  background: #ffffffa6;
  border: #e3e3e3 1px solid;
  backdrop-filter: blur(4px);
  pointer-events: all;
  font-size: clamp(9px, 1.3vw, 43px);
  cursor: pointer;
}
.ABCLOpenStatsButton:hover {
  background: #ffffffd1;
}
.ABCLWindowClose {
  aspect-ratio: 1/1;
  background: transparent;
  height: 29px;
  border-radius: 0px 4px 0 0;
  position: absolute;
  right: 0px;
  top: 0px;
  border: none;
  border-left: 1px #0000003d solid;
}
.ABCLWindowMinimize {
  aspect-ratio: 1/1;
  background: transparent;
  height: 29px;
  border-radius: 0px 0px 0 0;
  position: absolute;
  right: 30px;
  top: 0px;
  border: none;
  border-left: 1px #0000003d solid;
}
.ABCLWindowHeader {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 29px 24px;
  margin: -6px;
  padding: 5px;
  border: 1px #0000003d solid;
  border-radius: 6px 6px 0 0;
}
.ABCLNotification {
	background-color: white;
	width: fit-content;
	text-align: center;
	margin: auto;
	z-index: 10000;
	position: absolute;
	bottom: 30px;
	left: 25%;
	transform: translateX(-50%);
	border: 1px solid black;
	display: grid;
	grid-template-columns: 30px 1fr;
	padding: 5px;
	pointer-events: all;
}

.ABCLPrompt {
  background: white;
  width: fit-content;
  padding: 6px;
  border: 1px solid black;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
	pointer-events: all;
}
.ABCLButton {
  border: 1px #020202 solid;
  padding: 3px;
  margin: 4px;
  aspect-ratio: 3/2;
  width: 38px;
  cursor: pointer;
}
.ABCLPromptYes {
  background: #5ae85a;
  color: black;
}
.ABCLPromptNo {
  background: #ff4b4b;
  color: white;
}

.ABCLClose:hover {
  background: #ff4b4b;
  color: white;
  cursor: pointer;
}

.ABCLStatsWindow {
  width: 200px;
  height: fit-content;
  padding: 5px;
  background: #ffffffa6;
  border: #e3e3e3 1px solid;
  pointer-events: all;
  position: fixed;
  backdrop-filter: blur(4px);
  border-radius: 6px;
  box-shadow: 0 4px 5px 1px #00000014;
}

.ABCLSettingPage {
  width: 81%;
  margin: 6% auto;
  pointer-events: all;
}



#ABCLSettingsPage *, #ABCLStatsPanel * {
  pointer-events: all;
}



.ABCLMessageVisibility {
  margin-top: 1em
}

${cssSliders}

.ABCLHidden {
  display: none !important;
}


/* sorry fusam */
#fusam-addon-manager-container {
  position: absolute;
  top: 0;
}
`;
};
