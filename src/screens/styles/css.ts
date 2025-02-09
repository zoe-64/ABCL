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

.ABCLOverlay {
	aspect-ratio: 2/1;
	max-width: 100%;
	max-height: 100%;
	margin: auto;
	position: relative;
	transform: translateY(-50%);
	top: 50%;
	pointer-events: none;
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
  background: white;
  border: black 1px solid;
  pointer-events: all;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 25%;
}

.ABCLStatsWindowHeader {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
	margin-top: 0;
}

.ABCLStatsWindowContent {
}

.ABCLStatsWindowList {
  list-style: none; 
  padding: 0;
}

.ABCLStatsWindowListItem {
}

.ABCLStatsWindowSlider {
 -webkit-appearance: none; 
}

.ABCLStatsWindowSlider::-ms-thumb {
  -ms-appearance: none !important;
   opacity: 0 !important;
}
.ABCLStatsWindowSlider::-moz-range-thumb {
  -moz-appearance: none !important;
	opacity: 0 !important;
}
.ABCLStatsWindowSlider::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  appearance: none !important;
  opacity: 0 !important;
}
.ABCLStatsWindowSlider::-moz-range-track {
  -moz-appearance: none !important;
  appearance: none !important;
  height: 10px !important;
   border-radius: 0 !important;
}
.ABCLStatsWindowSlider::-ms-track {
  -ms-appearance: none !important;
  appearance: none !important;
height: 10px !important;
 border-radius: 0 !important;
}
.ABCLStatsWindowSlider::-webkit-slider-runnable-track {
  -webkit-appearance: none !important;
  appearance: none !important;
height: 10px !important;
 border-radius: 0 !important;
}
.ABCLStatsWindowSlider::-ms-fill-lower {
  -ms-appearance: none !important;
  appearance: none !important;
  height: 10px !important;
}
.ABCLStatsWindowSlider::-moz-range-progress {
  -moz-appearance: none !important;
  appearance: none !important;
  height: 10px !important;
}
.ABCLStatsWindowSlider::-webkit-slider-progress {
  -webkit-appearance: none !important;
  appearance: none !important;
  height: 10px !important;
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




${cssSliders}


`;
