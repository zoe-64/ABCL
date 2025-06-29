import { useEffect, useState } from "preact/hooks";
import { ValueBar } from "./valueBar";
import { getCharacter, getCharacterName, isABCLPlayer } from "src/core/player/playerUtils";
import { getPlayerDiaperSize } from "src/core/player/diaper";
import { resizeElements, abclStatsWindow } from "src/core/player/ui";
import { h, JSX } from "preact";
import styled from "styled-components";
const StatsPanelComponent = styled.div<JSX.IntrinsicElements["div"]>`
  .ABCL-stats-overlay {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
  .ABCL-stats-panel {
    background-color: var(--tmd-element, rgb(255, 255, 255));
  }
  .ABCL-stats-select {
    padding: 0.7%;
    border-radius: 0.35%;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    color: #333;
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
    <StatsPanelComponent className="ABCL-hidden" id="ABCL-stats">
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
            <option key={character.MemberNumber} value={character.MemberNumber}>
              {getCharacterName(character.MemberNumber)}
            </option>
          ))}
        </select>

        <div className="ABCL-stats-container">
          <ValueBar value={incontinence} label="Incontinence" color="#cb5b5bff" foreground="#eeacacff" />
          <ValueBar value={regression} label="Mental Regression" color="#ad74beff" foreground="#e6bff1ff" />
          <ValueBar value={soiliness} label="Soiliness" color="#ab674aff" foreground="#d1aa98ff" />
          <ValueBar value={wetness} label="Wetness" color="#e7c463ff" foreground="#f3e1aeff" />
          <ValueBar value={bowel} label="Bowel Fullness" color="#7c4c36ff" foreground="#b7795cff" />
          <ValueBar value={bladder} label="Bladder Fullness" color="#cba01eff" foreground="#eacd73ff" />
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
