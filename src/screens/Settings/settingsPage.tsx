import { h } from "preact";
import Checkbox from "../components/checkbox";
import ButtonGroup from "../components/buttonGroup";
import { useState } from "preact/hooks";

export default function SettingsPage(): h.JSX.Element {
  const [peeMetabolism, setPeeMetabolism] = useState<MetabolismSetting>(Player[modIdentifier].Settings.PeeMetabolism);
  const [poopMetabolism, setPoopMetabolism] = useState<MetabolismSetting>(Player[modIdentifier].Settings.PoopMetabolism);
  const [diaperChangePromptSetting, setDiaperChangePromptSetting] = useState<DiaperChangePromptSetting>(Player[modIdentifier].Settings.OnDiaperChange);

  return (
    <div style={{ top: "20px", left: "100px", padding: "60px" }} id={`${modIdentifier}SettingsPage`} className={"ABCLHidden"}>
      <h1 style={{ textAlign: "center", width: "fit-content" }}> Settings </h1>
      {/* Wet and Soiling accidents prevention */}
      <div>
        <h2>Wet and Soiling</h2>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
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
            <div></div>
            <div></div>
            <div></div>
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
            options={["Deny", "Ask", "Allow"] as DiaperChangePromptSetting[]}
            value={diaperChangePromptSetting}
            setValue={(value: string) => {
              setDiaperChangePromptSetting(value as DiaperChangePromptSetting);
              Player[modIdentifier].Settings.OnDiaperChange = value as DiaperChangePromptSetting;
            }}
            label="On Diaper Prompt"
          />
        </div>
      </div>
      <hr style={{ margin: "20px 0" }} />

      <div>
        <h2>Visible Messages to Players</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.wetDiaper}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.wetDiaper = value)}
            label="Wetting Diapers"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.wetClothing}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.wetClothing = value)}
            label="Wetting Clothes"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.soilDiaper}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.soilDiaper = value)}
            label="Soiling Diapers"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.soilClothing}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.soilClothing = value)}
            label="Soiling Clothes"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.changeDiaper}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.changeDiaper = value)}
            label="Changing Diapers"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.checkDiaper}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.checkDiaper = value)}
            label="Checking Diapers"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.lickPuddle}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.lickPuddle = value)}
            label="Licking Puddles"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.wipePuddle}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.wipePuddle = value)}
            label="Wiping Puddle"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.usePotty}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.usePotty = value)}
            label="Using Potty"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.useToilet}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.useToilet = value)}
            label="Using Toilet"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.VisibleMessages.statusMessages}
            setChecked={value => (Player[modIdentifier].Settings.VisibleMessages.statusMessages = value)}
            label="Show Status Messages"
          />
          <div></div>
        </div>
      </div>
      <div>
        <h2>Visible Status Messages to Yourself</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
          <Checkbox
            checked={Player[modIdentifier].Settings.StatusMessages["Wetness"] ?? false}
            setChecked={value => (Player[modIdentifier].Settings.StatusMessages["Wetness"] = value)}
            label="Show wetness status message"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.StatusMessages["Soiliness"] ?? false}
            setChecked={value => (Player[modIdentifier].Settings.StatusMessages["Soiliness"] = value)}
            label="Show soiliness status message"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.StatusMessages["Bladder"] ?? false}
            setChecked={value => (Player[modIdentifier].Settings.StatusMessages["Bladder"] = value)}
            label="Show bladder status message"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.StatusMessages["Bowel"] ?? false}
            setChecked={value => (Player[modIdentifier].Settings.StatusMessages["Bowel"] = value)}
            label="Show bowel status message"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.StatusMessages["Incontinence"] ?? false}
            setChecked={value => (Player[modIdentifier].Settings.StatusMessages["Incontinence"] = value)}
            label="Show incontinence status message"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.StatusMessages["MentalRegression"] ?? false}
            setChecked={value => (Player[modIdentifier].Settings.StatusMessages["MentalRegression"] = value)}
            label="Show mental regression status message"
          />
          <Checkbox
            checked={Player[modIdentifier].Settings.StatusMessages["PuddleSize"] ?? false}
            setChecked={value => (Player[modIdentifier].Settings.StatusMessages["PuddleSize"] = value)}
            label="Show puddle size status message"
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}
