import { h, JSX } from "preact";
import { useEffect, useReducer, useState } from "preact/hooks";
import StatsPage from "./pages/stats";
import MiscPage from "./pages/misc";
import { resizeElements } from "src/core/player/ui";
import { AboutPage } from "./pages/about";
import styled from "styled-components";
import SharedSettingsPage from "./pages/shared-settings";

const SettingsPageComponent = styled.div<JSX.IntrinsicElements["div"]>`
  height: 77%;
  margin: 2em 5em 1em 5em;
  overflow-y: auto;
  padding: 1em;
  color: var(--abcl-text);
  > header > h1 {
    text-align: center;
    margin-bottom: 0.1em;
    margin-top: 0;
  }
  > h2 {
    margin: 0;
    margin-bottom: 0.25em;
  }
`;
export const SettingsH2 = styled.h2`
  margin: 0;
  font-size: 6vmin;
  color: var(--abcl-text);
`;
const MenuPage = styled.div<JSX.IntrinsicElements["div"]>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 56%;
  color: var(--abcl-text);
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
      border: var(--abcl-border);
      color: inherit;
    }
  }
  .ABCL-button {
    width: fit-content;
    padding: 0.3em;
    border: var(--abcl-border);
    background-color: var(--abcl-element);
    cursor: pointer;
    white-space: nowrap;
    color: inherit;
    &:hover {
      background-color: var(--abcl-hover-color);
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
          <hr />
        </header>
        {
          {
            menu: (
              <MenuPage>
                <section>
                  <h2>Menu</h2>
                  <div id="ABCL-page-list">
                    <button onClick={() => setPage("misc")} className="ABCL-button">
                      Misc
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
            misc: <MiscPage setPage={setPage} />,
            stats: <StatsPage setPage={setPage} />,
            about: <AboutPage setPage={setPage} />,
            sharedSettings: <SharedSettingsPage setPage={setPage} selectedCharacter={selectedCharacter} />,
          }[page]
        }
      </SettingsPageComponent>
      <button
        onClick={() => {
          setPage("sharedSettings");
          setSelectedCharacter(InformationSheetSelection ?? undefined);
        }}
        id="ABCL-shared-settings-button"
        className={"ABCL-hidden"}
      ></button>
    </>
  );
}
