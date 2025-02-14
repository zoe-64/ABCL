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
	.${modIdentifier}${slider.className}Slider::-webkit-slider-runnable-track {
		background-color: ${slider.primary} !important;
	}
	.${modIdentifier}${slider.className}Slider::-ms-track {
		background-color: ${slider.primary} !important;
	}
	.${modIdentifier}${slider.className}Slider::-moz-range-track {
		background-color: ${slider.primary} !important;
	}
	.${modIdentifier}${slider.className}Slider::-webkit-slider-progress {
		background-color: ${slider.secondary} !important;
	}
	.${modIdentifier}${slider.className}Slider::-moz-range-progress {
		background-color: ${slider.secondary} !important;
	}
	.${modIdentifier}${slider.className}Slider::-ms-fill-lower {
		background-color: ${slider.secondary} !important;
	}`;
}

export const css = `
@media (max-width: 2000px) {
 .ABCLStatsWindow {
    transform: scale(1);
  }
}
@media (max-width: 1200px) {
 .ABCLStatsWindow {
    transform: scale(0.8);
  }
}


@media (max-width: 1000px) {
 .ABCLStatsWindow {
    transform: scale(0.7);
  }
}
@media (max-width: 900px) {
 .ABCLStatsWindow {
    transform: scale(0.6);
  }
}



@media (max-width: 800px) {
  .ABCLStatsWindow {
    transform: scale(0.5);
  }
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
  margin: 0;
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
.ABCLClose {
  aspect-ratio: 1/1;
  margin: -6px;
  background: white;
  border: black 1px solid;
  height: 30px;
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

.ABCLStatsWindowHeader {
  font-size: 1.2em;
  font-weight: bold;
  margin: -5px;
  padding: 5px 0 6px 8px;
  border-bottom: black 1px solid;
  cursor: pointer;
}
.ABCLStatsWindowHeader:hover {
  background: #fbfbfb;
}
.ABCLStatsWindowList {
  list-style: none; 
  padding: 0;
  margin: 0;
  margin-top: 10px;
}

.ABCLStatsWindowListItem {
  display: grid;
  grid-template-columns: 1fr min-content;
  margin-top: 10px;
}
.ABCLStatsWindowListItem p {
  margin: 0px;
  display: inline;
  text-align: right;
}
.ABCLStatsWindowListItem input {
 -webkit-appearance: none;
 appearance: none;
 grid-column: 1/-1;
 margin-top: 3px;
}

.ABCLStatsWindowListItem input::-ms-thumb {
  -ms-appearance: none !important;
   opacity: 0 !important;
}
.ABCLStatsWindowListItem input::-moz-range-thumb {
  -moz-appearance: none !important;
	opacity: 0 !important;
}
.ABCLStatsWindowListItem input::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  appearance: none !important;
  opacity: 0 !important;
}
.ABCLStatsWindowListItem input::-moz-range-track {
  -moz-appearance: none !important;
  appearance: none !important;
  height: 18px;
  border-radius: 5px;
  border: #999 1px solid;
  cursor: auto !important;
}
.ABCLStatsWindowListItem input::-ms-track {
  -ms-appearance: none !important;
  appearance: none !important;
  height: 18px;
  border-radius: 5px;
  border: #999 1px solid;
  cursor: auto !important;
}
.ABCLStatsWindowListItem input::-webkit-slider-runnable-track {
  -webkit-appearance: none !important;
  appearance: none !important;
  height: 18px;
  border-radius: 5px;
  border: #999 1px solid;
  cursor: auto !important;
}
.ABCLStatsWindowListItem input::-ms-fill-lower {
  -ms-appearance: none !important;
  appearance: none !important;
  height: 18px;
  border-radius: 4px;
  cursor: auto !important;
}
.ABCLStatsWindowListItem input::-moz-range-progress {
  -moz-appearance: none !important;
  appearance: none !important;
  height: 18px;
  border-radius: 4px;
  cursor: auto !important;

}
.ABCLStatsWindowListItem input::-webkit-slider-progress {
  -webkit-appearance: none !important;
  appearance: none !important;
  height: 18px;
  border-radius: 4px;
  cursor: auto !important;
}

.ABCLTextParticle {
  position: fixed;
  pointer-events: none;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
  font-size: 1.5em;
  font-weight: bold;
  mix-blend-mode: difference;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  transition: all 0.5s;
}


.ABCLStatsWindowFolded .ABCLStatsWindowList{
  display: none;
}

${cssSliders}

.ABCLHidden {
  display: none !important;
}
`;
