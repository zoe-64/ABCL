import { h, render } from "preact";
import SettingsPage from "./Settings/settingsPage";
import { overlay } from "src/core/player/ui";
import StatsPanel from "./components/statsPanel";
import "./App.css";
import "./styles/minigame.css";
function App(): h.JSX.Element {
  return (
    <>
      <StatsPanel />
      <SettingsPage />
    </>
  );
}

export default function renderApp() {
  render(<App />, overlay);
}
