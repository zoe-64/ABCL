import { useEffect, useState } from "preact/hooks";
import { ValueBar } from "./valueBar";
import { getCharacter, getCharacterName, isABCLPlayer } from "src/core/player/playerUtils";
import { getPlayerDiaperSize, incontinenceLimitFormula } from "src/core/player/diaper";
import { resizeElements, abclStatsWindow } from "src/core/player/ui";
import { h, JSX } from "preact";
import styled from "styled-components";
import { abclPlayer } from "src/core/player/player";
const StatsPanelComponent = styled.div<JSX.IntrinsicElements["div"]>`
  .ABCL-stats-overlay {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
  .ABCL-stats-panel {
    background-color: var(--abcl-element-indentation);
    color: var(--abcl-text);
  }
  .ABCL-stats-select {
    padding: 0.7%;
    border-radius: 0.35%;
    border: var(--abcl-border);
    background-color: var(--abcl-element);
    color: var(--abcl-text);
    width: calc(100% - 16%);
    margin: 8%;
  }
  .ABCL-stats-container {
    padding: 8%;
    font-size: 0.5em;
    gap: 1em;
    display: flex;
    flex-direction: column;
  }
`;
export default function StatsPanel(): h.JSX.Element {
  const [selectablePlayers, setSelectablePlayers] = useState<Character[]>(() => ChatRoomCharacter.filter(character => isABCLPlayer(character)));
  const [memberNumber, setMemberNumber] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      // Force re-render by updating a dummy state if needed
      // Alternatively, rely on memberNumber changes
    };
    abclStatsWindow.setState = handleUpdate;
    abclStatsWindow.setMemberNumber = setMemberNumber;
    return () => {
      abclStatsWindow.setState = () => {};
      abclStatsWindow.setMemberNumber = () => {};
    };
  }, []);

  const selectedCharacter = getCharacter(memberNumber);
  const isABCL = selectedCharacter && isABCLPlayer(selectedCharacter);

  // Calculate stats directly from the selected character
  const regression = isABCL ? selectedCharacter.ABCL!.Stats.MentalRegression.value : 0;
  const incontinence = isABCL ? selectedCharacter.ABCL!.Stats.Incontinence.value : 0;
  const soiliness = isABCL ? selectedCharacter.ABCL!.Stats.Soiliness.value / getPlayerDiaperSize(selectedCharacter) : 0;
  const wetness = isABCL ? selectedCharacter.ABCL!.Stats.Wetness.value / getPlayerDiaperSize(selectedCharacter) : 0;
  const bowel = isABCL ? selectedCharacter.ABCL!.Stats.Bowel.value / selectedCharacter.ABCL!.Stats.Bowel.size : 0;
  const bladder = isABCL ? selectedCharacter.ABCL!.Stats.Bladder.value / selectedCharacter.ABCL!.Stats.Bladder.size : 0;
  const pauseStats = isABCL ? selectedCharacter.ABCL!.Settings.PauseStats : false;
  useEffect(() => {
    resizeElements();
  }, [memberNumber]);

  return (
    <StatsPanelComponent
      className="ABCL-hidden"
      id="ABCL-stats"
      onMouseEnter={() => setSelectablePlayers(ChatRoomCharacter.filter(character => isABCLPlayer(character)))}
    >
      <div className="ABCL-stats-overlay" onClick={() => document.getElementById("ABCL-stats")?.classList.add("ABCL-hidden")}></div>
      <div className="ABCL-stats-panel" id="ABCL-stats-panel">
        <select
          class="ABCL-stats-select"
          onClick={() => {
            setSelectablePlayers(ChatRoomCharacter.filter(character => isABCLPlayer(character)));
          }}
          value={memberNumber}
          onChange={e => {
            setMemberNumber(parseInt((e.target as HTMLSelectElement).value));
          }}
        >
          {selectablePlayers.map(character => (
            <option key={character.MemberNumber} value={character.MemberNumber} selected={character.MemberNumber === memberNumber}>
              {getCharacterName(character.MemberNumber)}
            </option>
          ))}
        </select>

        <div className="ABCL-stats-container">
          <ValueBar value={incontinence} label="Incontinence" color="#e26c6cff" />
          <ValueBar value={regression} label="Mental Regression" color="#cf6ce2ff" />
          <ValueBar value={soiliness} label="Soiliness" color="#e2aa6cff" />
          <ValueBar value={wetness} label="Wetness" color="#e2d06cff" />
          <ValueBar value={bowel} label="Bowel Fullness" color="#e2aa6cff" stripedSection={1 - incontinenceLimitFormula(incontinence)} />
          <ValueBar value={bladder} label="Bladder Fullness" color="#e2d06cff" stripedSection={1 - incontinenceLimitFormula(incontinence)} />
          <p>
            <span>Stats: </span>
            <span>{pauseStats ? "Paused" : "Active"}</span>
          </p>
          <button onClick={() => resizeElements()}>Refresh</button>
        </div>
      </div>
    </StatsPanelComponent>
  );
}
