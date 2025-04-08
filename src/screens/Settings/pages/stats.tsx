import { h } from "preact";

import ButtonGroup from "../../components/buttonGroup";
import Checkbox from "../../components/checkbox";
import { useState } from "preact/hooks";

export default function StatsPage({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
  const [peeMetabolism, setPeeMetabolism] = useState<MetabolismSetting>(Player[modIdentifier].Settings.PeeMetabolism);
  const [poopMetabolism, setPoopMetabolism] = useState<MetabolismSetting>(Player[modIdentifier].Settings.PoopMetabolism);
  const [mentalMetabolism, setMentalMetabolism] = useState<MetabolismSetting>(Player[modIdentifier].Settings.MentalRegressionModifier);
  const [diaperChangePromptSetting, setDiaperChangePromptSetting] = useState<DiaperChangePromptSetting>(Player[modIdentifier].Settings.OnDiaperChange);

  return (
    <div className="ABCL-settings-section">
      <h2>Wet and Soiling</h2>
      <button onClick={() => setPage("menu")}>Back</button>
      <div>
        <div className="ABCL-checkbox-group">
          <Checkbox
            checked={Player[modIdentifier].Settings.PauseStats}
            setChecked={value => (Player[modIdentifier].Settings.PauseStats = value)}
            label="Pause Stats"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.DisableWettingLeaks}
            setChecked={value => (Player[modIdentifier].Settings.DisableWettingLeaks = value)}
            label="Disable Wetting Leaks / Puddles"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.DisableSoilingLeaks}
            setChecked={value => (Player[modIdentifier].Settings.DisableSoilingLeaks = value)}
            label="Disable Messy Leaks"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.DisableClothingStains}
            setChecked={value => (Player[modIdentifier].Settings.DisableClothingStains = value)}
            label="Disable Clothing Stains"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.DisableDiaperStains}
            setChecked={value => (Player[modIdentifier].Settings.DisableDiaperStains = value)}
            label="Disable Diaper Stains"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.AccidentsByActivities}
            setChecked={value => (Player[modIdentifier].Settings.AccidentsByActivities = value)}
            label="Accidents by Activities (Experimental)"
          />
        </div>
      </div>
      <ButtonGroup
        options={["Disabled", "Slow", "Normal", "Fast", "Faster", "Fastest"] as MetabolismSetting[]}
        value={peeMetabolism}
        setValue={(value: string) => {
          setPeeMetabolism(value as MetabolismSetting);
          Player[modIdentifier].Settings.PeeMetabolism = value as MetabolismSetting;
        }}
        label="Pee Metabolism"
      />
      <ButtonGroup
        options={["Disabled", "Slow", "Normal", "Fast", "Faster", "Fastest"] as MetabolismSetting[]}
        value={poopMetabolism}
        setValue={(value: string) => {
          setPoopMetabolism(value as MetabolismSetting);
          Player[modIdentifier].Settings.PoopMetabolism = value as MetabolismSetting;
        }}
        label="Poop Metabolism"
      />

      <ButtonGroup
        options={["Disabled", "Slow", "Normal", "Fast", "Faster", "Fastest"] as MetabolismSetting[]}
        value={mentalMetabolism}
        setValue={(value: string) => {
          setMentalMetabolism(value as MetabolismSetting);
          Player[modIdentifier].Settings.MentalRegressionModifier = value as MetabolismSetting;
        }}
        label="Regression Speed"
      />
      <ButtonGroup
        options={["Deny", "Ask", "Allow"] as DiaperChangePromptSetting[]}
        value={diaperChangePromptSetting}
        setValue={(value: string) => {
          setDiaperChangePromptSetting(value as DiaperChangePromptSetting);
          Player[modIdentifier].Settings.OnDiaperChange = value as DiaperChangePromptSetting;
        }}
        label="On Diaper Prompt"
      />
    </div>
  );
}
