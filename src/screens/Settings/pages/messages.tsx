import { h } from "preact";

import Checkbox from "src/screens/components/checkbox";

export default function MessagesPage({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
  return (
    <div>
      <button onClick={() => setPage("menu")}>Back</button>
      <div>
        <h2>Visible Messages to Players</h2>
        <div className="ABCL-checkbox-group">
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
        </div>
      </div>
      <div>
        <h2>Visible Status Messages to Yourself</h2>
        <div className="ABCL-checkbox-group">
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
        </div>
      </div>
    </div>
  );
}
