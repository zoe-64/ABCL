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

export const css = `

#ABCLCurrentPlayerSelect {
  margin-bottom: 5px;
}

.ABCLOverlay {
	aspect-ratio: 2/1;
	max-width: 100%;
	max-height: 100%;
	margin: auto;
	position: relative;
	transform: translateY(-50%);
	top: 50%;
	pointer-events: none;
  font-family: arial;
  
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
.ABCLAddCaregiver {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 25rem;
}
.ABCLAddCaregiverButton {
  margin-left: 5px;
}
.ABCLAddCaregiverInput {
  margin-right: 5px;
  flex: 1;
}
.ABCLCaregiverLabel {
  margin-top: 1em;
  display: block;
}
.ABCLCaregiverList {
  list-style: none;
  border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  border-radius: var(--sl-input-border-radius-medium);
  padding: 0rem 0rem;
  width: fit-content;
  min-width: 17em;
  max-height: 15em;
  overflow-y: scroll;
  font-size: var(--sl-button-font-size-medium);
  line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
}
.ABCLCaregiver {
  padding: 0.3rem;
  border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  display: flex;
}
.ABCLRemoveCaregiver {
  aspect-ratio: 1;
  width: fit-content;
  margin-left: 0.5em;
}
.ABCLCaregiverName {
  flex: 1;
}
.ABCLRemoveCaregiver::part(base) {
  background: #ff7b7b;
  color: white;
  font-weight: bold;
}
.ABCLSettingPage sl-checkbox {
  display: block;
  margin: 1rem 0;
  width: fit-content;
}
.sl-theme-light, .sl-theme-dark {
  --sl-toggle-size-small: 0.875rem;
  --sl-toggle-size-medium: 1.125rem;
  --sl-toggle-size-large: 1.375rem;

  --sl-input-height-small: 1.875em;
  --sl-input-height-medium: 2.5em;
  --sl-input-height-large: 3.125em;

  --sl-letter-spacing-loose: 0.075em;
  --sl-letter-spacing-looser: 0.15em;

  --sl-font-size-large: 1.25em;
  --sl-font-size-x-large: 1.5em;
  --sl-font-size-2x-large: 2.25em;
  --sl-font-size-3x-large: 3em;
  --sl-font-size-4x-large: 4.5em;
  
  --sl-spacing-3x-small: 0.125em;
  --sl-spacing-2x-small: 0.25em;
  --sl-spacing-x-small: 0.5em;
  --sl-spacing-small: 0.75em;
  --sl-spacing-medium: 1em;
  --sl-spacing-large: 1.25em;
  --sl-spacing-x-large: 1.75em;
  --sl-spacing-2x-large: 2.25em;
  --sl-spacing-3x-large: 3em;
  --sl-spacing-4x-large: 4.5em;

  --sl-border-radius-small: 0.1875em;
  --sl-border-radius-medium: 0.25em;
  --sl-border-radius-large: 0.5em;
  --sl-border-radius-x-large: 1em;

  --sl-font-size-2x-small: 1.2vmin;
  --sl-font-size-x-small: 1.4vmin;
  --sl-font-size-small: 1.6vmin;
  --sl-font-size-medium: 1.6vmin;
  --sl-font-size-large: 2.5vmin;
  --sl-font-size-x-large: 3vmin;
  --sl-font-size-2x-large: 4.5vmin;
  --sl-font-size-3x-large: 6vmin;
  --sl-font-size-4x-large: 9vmin;
}

sl-tab, sl-radio-button, sl-checkbox {
  pointer-events: all;
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
