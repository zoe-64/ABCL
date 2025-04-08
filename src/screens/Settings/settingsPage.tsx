import { h } from "preact";
import Checkbox from "../components/checkbox";
import "./settingsPage.css";
import { useState } from "preact/hooks";
import StatsPage from "./pages/stats";
import MessagesPage from "./pages/messages";

export default function SettingsPage(): h.JSX.Element {
  const [page, setPage] = useState<string>("menu");
  return (
    <div id="ABCL-settings-page" className="ABCL-hidden ABCL-settings-page">
      <div>
        <h1 className="ABCL-settings-title"> ABCL Settings </h1>
      </div>
      {
        {
          menu: (
            <div>
              <h2>Menu</h2>
              <button onClick={() => setPage("messages")}>Messages</button>
              <button onClick={() => setPage("stats")}>Stats</button>
            </div>
          ),
          messages: <MessagesPage setPage={setPage} />,
          stats: <StatsPage setPage={setPage} />,
        }[page]
      }
    </div>
  );
}
