import { JSX } from "preact/jsx-runtime";
import { getElement } from "src/core/utils";

export default function SharedSettingsPage({ setPage, selectedCharacter }: { setPage: (page: string) => void; selectedCharacter?: Character }): JSX.Element {
  return (
    <div>
      <button
        onClick={() => {
          getElement(document.body, "#ABCL-settings-page").classList.add(`ABCL-hidden`);
          setPage("menu");
          CurrentScreen = "InformationSheet";
        }}
        className="ABCL-exit-button"
      ></button>
    </div>
  );
}
