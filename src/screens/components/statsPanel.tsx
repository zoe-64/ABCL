import { useEffect, useState } from "preact/hooks";
import { ValueBar } from "./valueBar";
import { getCharacter, getCharacterName, isABCLPlayer } from "src/core/player/playerUtils";
import { getPlayerDiaperSize } from "src/core/player/diaper";
import { resizeElements, abclStatsWindow } from "src/core/player/ui";
import { h } from "preact";

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

  useEffect(() => {
    resizeElements();
  }, [memberNumber]);

  return (
    <div className={"ABCLHidden"} id="ABCLStatsPanel">
      <div
        style={{ width: "calc(2000px - 330px)", height: "1000px", top: 0, left: 0, position: "absolute" }}
        onClick={() => document.getElementById("ABCLStatsPanel")?.classList.add("ABCLHidden")}
      ></div>
      <div
        style={{
          padding: "15px",
          width: "300px",
          height: "1000px",
          position: "absolute",
          top: "0px",
          left: "calc(2000px - 330px)",
          backgroundColor: "var(--tmd-element,rgb(255, 255, 255))",
        }}
      >
        <select
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            color: "#333",
            width: "100%",
          }}
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

        <div style={{ padding: "15px 0" }}>
          <ValueBar value={incontinence} label={"Incontinence"} color={"#eeacacff"} foreground={"#cb5b5bff"} />
          <ValueBar value={regression} label={"Mental Regression"} color={"#e6bff1ff"} foreground={"#ad74beff"} />
          <ValueBar value={soiliness} label={"Soiliness"} color={"#d1aa98ff"} foreground={"#ab674aff"} />
          <ValueBar value={wetness} label={"Wetness"} color={"#f3e1aeff"} foreground={"#e7c463ff"} />
          <ValueBar value={bowel} label={"Bowel Fullness"} color={"#b7795cff"} foreground={"#7c4c36ff"} />
          <ValueBar value={bladder} label={"Bladder Fullness"} color={"#eacd73ff"} foreground={"#cba01eff"} />
          <button onClick={() => resizeElements()}>Refresh</button>
        </div>
      </div>
    </div>
  );
}
