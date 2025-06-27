import { h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import StatsPage from "./pages/stats";
import MessagesPage from "./pages/messages";
import { resizeElements } from "src/core/player/ui";
import { AboutPage } from "./pages/about";
import styled from "styled-components";
import SharedSettingsPage from "./pages/shared-settings";

const SettingsPageComponent = styled.div<JSX.IntrinsicElements["div"]>`
  height: 79%;
  margin: 5% 10dvw 0dvh 5dvw;
  overflow-y: auto;
  > header > h1 {
    text-align: center;
    width: fit-content;
    margin-top: 0;
  }
`;

const MenuPage = styled.div<JSX.IntrinsicElements["div"]>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 56%;
  > section {
    gap: 0.2em;
    display: flex;
    flex-direction: column;
    padding: 1%;
    > div > * {
      width: 100%;
    }
    > div {
      /* content */
      margin-top: 2.1%;
      margin-bottom: 0.7%;
    }
  }
  #ABCL-contact-info {
    padding: 1%;
    width: fit-content;
    gap: 0.5em;
    display: flex;
    flex-direction: column;
  }
  #ABCL-page-list {
    display: flex;
    flex-direction: column;
    margin: 1%;
    gap: 0.5em;
    > * {
      flex: 1 1 auto;
      text-align: left;
      padding: 10px;
      border: 1px black solid;
    }
  }
  .ABCL-button {
    width: fit-content;
    padding: 0.3em;
    border: 1px black solid;
    background-color: white;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background-color: cyan;
    }
  }
`;
export default function SettingsPage(): h.JSX.Element {
  const [page, setPage] = useState<string>("menu");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>(undefined);
  useEffect(() => {
    resizeElements();
  }, [page]);
  return (
    <>
      <SettingsPageComponent id="ABCL-settings-page" className="ABCL-hidden">
        <button onClick={() => PreferenceSubscreenExtensionsExit()} className="ABCL-exit-button"></button>
        <header>
          <h1> ABCL Settings </h1>
        </header>
        {
          {
            menu: (
              <MenuPage>
                <section>
                  <h2>Menu</h2>
                  <div id="ABCL-page-list">
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
                  <div className="ABCL-contact-info" id="ABCL-contact-info">
                    <button onClick={() => window.open("https://discord.gg/ENYGwmgDmQ", "_blank")} className="ABCL-button">
                      Join our Discord
                    </button>
                    <button
                      onClick={() =>
                        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdOMGAEmOlFTpbcdkdn8b380p50WAE8qPux-45WvFM3qhf9_w/viewform", "_blank")
                      }
                      className="ABCL-button"
                    >
                      Give Feedback
                    </button>
                  </div>
                </section>
              </MenuPage>
            ),
            messages: <MessagesPage setPage={setPage} />,
            stats: <StatsPage setPage={setPage} />,
            about: <AboutPage setPage={setPage} />,
            sharedSettings: <SharedSettingsPage setPage={setPage} selectedCharacter={selectedCharacter} />,
          }[page]
        }
      </SettingsPageComponent>
      <button
        onClick={() => {
          (window as any).CurrentScreen = "Preference";
          (window as any).PreferenceSubscreen = PreferenceSubscreens.find(screen => screen.name === "Extensions");
          setPage("sharedSettings");
          setSelectedCharacter(InformationSheetSelection ?? undefined);
        }}
        id="ABCL-shared-settings-button"
        className={"ABCL-hidden"}
      ></button>
    </>
  );
}
