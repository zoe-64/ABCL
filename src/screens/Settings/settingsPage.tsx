import { h } from "preact";
import "./settingsPage.css";
import { useEffect, useState } from "preact/hooks";
import StatsPage from "./pages/stats";
import MessagesPage from "./pages/messages";
import { resizeElements } from "src/core/player/ui";
import { AboutPage } from "./pages/about";

export default function SettingsPage(): h.JSX.Element {
  const [page, setPage] = useState<string>("menu");
  useEffect(() => {
    resizeElements();
  }, [page]);
  return (
    <div id="ABCL-settings-page" className="ABCL-hidden ABCL-settings-page">
      <button onClick={() => PreferenceSubscreenExtensionsExit()} className="ABCL-exit-button"></button>
      <div>
        <h1 className="ABCL-settings-title"> ABCL Settings </h1>
      </div>
      {
        {
          menu: (
            <div className="ABCL-settings-menu">
              <section>
                <h2>Menu</h2>
                <div className="ABCL-page-list ABCL-settings-section">
                  <button onClick={() => setPage("messages")} className="ABCL-button">
                    Messages
                  </button>
                  <button onClick={() => setPage("stats")} className="ABCL-button">
                    Stats
                  </button>
                  <button onClick={() => setPage("about")} className="ABCL-button">
                    About ABCL {modVersion}
                  </button>
                </div>
              </section>
              <section>
                <h2>Support</h2>
                <div className="ABCL-contact-info ABCL-settings-section" id="ABCL-contact-info">
                  <button onClick={() => window.open("https://discord.gg/ENYGwmgDmQ", "_blank")} className="ABCL-button">
                    Join our Discord
                  </button>
                  <button
                    onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdOMGAEmOlFTpbcdkdn8b380p50WAE8qPux-45WvFM3qhf9_w/viewform", "_blank")}
                    className="ABCL-button"
                  >
                    Give Feedback
                  </button>
                </div>
              </section>
            </div>
          ),
          messages: <MessagesPage setPage={setPage} />,
          stats: <StatsPage setPage={setPage} />,
          about: <AboutPage setPage={setPage} />,
        }[page]
      }
    </div>
  );
}
