import { useEffect, useState } from "preact/hooks";
import { ValueBar } from "./valueBar";
import { getCharacter, getCharacterName, isABCLPlayer } from "src/core/player/playerUtils";
import { getPlayerDiaperSize, hasDiaper } from "src/core/player/diaper";
import { resizeElements, StatsPanelVersion } from "src/core/player/ui";
import { h } from "preact";

export default function StatsPanel(): h.JSX.Element {
  const [selectablePlayers, setSelectablePlayers] = useState<Character[]>(() => ChatRoomCharacter.filter(character => isABCLPlayer(character)));
  const [memberNumber, setMemberNumber] = useState<number>(Player.MemberNumber!);
  let character: Character = getCharacter(memberNumber) || Player;
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setVersion(v => v + 1);
    // Subscribe to updates
    StatsPanelVersion.setState = handleUpdate;
    return () => {
      StatsPanelVersion.setState = () => {};
    };
  }, []);
  const [regression, setRegression] = useState(character.ABCL!.Stats.MentalRegression.value);
  const [incontinence, setIncontinence] = useState(character.ABCL!.Stats.Incontinence.value);
  const [soiliness, setSoiliness] = useState(character.ABCL!.Stats.Soiliness.value / getPlayerDiaperSize(character));
  const [wetness, setWetness] = useState(character.ABCL!.Stats.Wetness.value / getPlayerDiaperSize(character));
  const [bowel, setBowel] = useState(character.ABCL!.Stats.Bowel.value / character.ABCL!.Stats.Bowel.size);
  const [bladder, setBladder] = useState(character.ABCL!.Stats.Bladder.value / character.ABCL!.Stats.Bladder.size);

  const refreshFunction = () => {
    setRegression(character.ABCL!.Stats.MentalRegression.value);
    setIncontinence(character.ABCL!.Stats.Incontinence.value);
    setSoiliness(character.ABCL!.Stats.Soiliness.value / getPlayerDiaperSize(character));
    setWetness(character.ABCL!.Stats.Wetness.value / getPlayerDiaperSize(character));
    setBowel(character.ABCL!.Stats.Bowel.value / character.ABCL!.Stats.Bowel.size);
    setBladder(character.ABCL!.Stats.Bladder.value / character.ABCL!.Stats.Bladder.size);
    setTimeout(() => {
      resizeElements();      
    }, 500);
    console.log("refresh");
  };

  useEffect(refreshFunction, [version]);

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
          onChange={e => setMemberNumber(parseInt((e.target as HTMLSelectElement).value))}
        >
          {selectablePlayers.map(character => (
            <option value={character.MemberNumber}>{getCharacterName(character.MemberNumber)}</option>
          ))}
        </select>

        <div style={{ padding: "15px 0" }}>
          <ValueBar value={incontinence} label={"Incontinence"} color={"#eeacacff"} foreground={"#cb5b5bff"} />
          <ValueBar value={regression} label={"Mental Regression"} color={"#e6bff1ff"} foreground={"#ad74beff"} />
          {hasDiaper(character) && !Player.IsRestrained() && (
            <>
              <ValueBar value={soiliness} label={"Soiliness"} color={"#d1aa98ff"} foreground={"#ab674aff"} />
              <ValueBar value={wetness} label={"Wetness"} color={"#f3e1aeff"} foreground={"#e7c463ff"} />
            </>
          )}
          <ValueBar value={bowel} label={"Bowel Fullness"} color={"#b7795cff"} foreground={"#7c4c36ff"} />
          <ValueBar value={bladder} label={"Bladder Fullness"} color={"#eacd73ff"} foreground={"#cba01eff"} />
          <button onClick={() => setVersion(version + 1)}>Refresh</button>
        </div>
      </div>
    </div>
  );
}
