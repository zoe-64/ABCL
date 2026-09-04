import { h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { resizeElements } from "src/core/player/ui";
import styled, { keyframes } from "styled-components";
import { AboutPage } from "./pages/about";
import { Changelog } from "./pages/changelog";
import CruelPage from "./pages/cruel";
import Intro from "./pages/intro";
import MiscPage from "./pages/misc";
import SharedSettingsPage from "./pages/shared-settings";
import StatsPage from "./pages/stats";

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
  h2 {
    margin: 0;
    margin-bottom: 0.25em;
  }
`;
export const SettingsH2 = styled.h2`
  margin: 0;
  margin-bottom: 0.25em;
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
      padding: 0.5em;
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
    text-decoration: none;
  }
`;
const shineSweep = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
`;

const PatreonLink = styled.a`
  /* Layout & Sizing */
  position: relative;
  display: inline-block;
  padding: 0.5em;
  overflow: hidden;
  user-select: none;
  text-decoration: none;

  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  font-weight: 700;
  letter-spacing: 0.03em;

  background: linear-gradient(135deg, hsl(0, 100%, 65%), hsl(340, 90%, 60%));

  color: #ffffff;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: #ffffffc9;
    transform: skewX(-25deg);
    transition: none;
  }

  &:hover::before {
    animation: ${shineSweep} 0.85s ease-in-out;
  }
  &:hover {
    background: linear-gradient(135deg, hsl(0, 79%, 59%), hsl(340, 86%, 60%));
  }

  &:active {
    background: linear-gradient(135deg, hsl(0, 100%, 76%), hsl(340, 81%, 71%));
  }
`;
async function openSettings() {
  InformationSheetLoadCharacter(Player);
  await CommonSetScreen("Character", "Preference");
  PreferenceSubscreen = PreferenceSubscreens.find(s => s.name === "Extensions") ?? null;
  PreferenceSubscreen?.load?.();
  const mod = PreferenceExtensionsDisplay.find(e => e.Button === "ABCL Settings");
  if (!mod) return;
  mod.click();
}
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
                      Misc Page
                    </button>
                    <button onClick={() => setPage("stats")} className="ABCL-button">
                      Stats Page
                    </button>
                    <button onClick={() => setPage("cruel")} className="ABCL-button">
                      Cruel Page
                    </button>
                    <button onClick={() => setPage("about")} className="ABCL-button">
                      About ABCL {modVersion}
                    </button>
                    <button onClick={() => setPage("changelog")} className="ABCL-button">
                      Changelog
                    </button>
                  </div>
                </section>
                <section>
                  <h2>Support</h2>
                  <div className="ABCL-contact-info" id="ABCL-contact-info">
                    <PatreonLink href="https://www.patreon.com/cutezoe" target="_blank" rel="noopener noreferrer">
                      Support Zoe's Work!
                    </PatreonLink>
                    <a href="https://discord.gg/ENYGwmgDmQ" className="ABCL-button" target="_blank" rel="noopener noreferrer">
                      Join our Discord
                    </a>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdOMGAEmOlFTpbcdkdn8b380p50WAE8qPux-45WvFM3qhf9_w/viewform"
                      className="ABCL-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Give Feedback
                    </a>
                  </div>
                </section>
              </MenuPage>
            ),
            misc: <MiscPage setPage={setPage} />,
            stats: <StatsPage setPage={setPage} />,
            about: <AboutPage setPage={setPage} />,
            changelog: <Changelog setPage={setPage} />,
            intro: <Intro setPage={setPage} />,
            cruel: <CruelPage setPage={setPage} />,
            sharedSettings: <SharedSettingsPage setPage={setPage} selectedCharacter={selectedCharacter} />,
          }[page]
        }
      </SettingsPageComponent>
      <button
        onClick={async function () {
          setSelectedCharacter(InformationSheetSelection ?? undefined);
          await openSettings();
          setPage("sharedSettings");
        }}
        id="ABCL-shared-settings-button"
        className={"ABCL-hidden"}
      ></button>
      <button
        onClick={async function () {
          await openSettings();
          setSelectedCharacter(Player);
          setPage("intro");
        }}
        id="ABCL-intro-button"
        className={"ABCL-hidden"}
      ></button>
    </>
  );
}
