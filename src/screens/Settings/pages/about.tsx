import { h } from "preact";
import styled from "styled-components";

const CreditItemComponent = styled.p<{ stroke?: string }>`
  margin: 0.25em 0;
  font-size: 1.2em;
  > a {
    font-weight: bold;
    color: hsl(${({ stroke }) => stroke ?? 0}, 100%, 70%);
  }
  > span:first-child {
    font-weight: bold;
    color: hsl(${({ stroke }) => stroke ?? 0}, 100%, 70%);
  }
  > span {
    color: inherit;
  }
`;
const CreditBox = styled.div`
  background: rgb(39, 39, 39);
  padding: 0.5em;
  border: 0.1em black solid;
  border-radius: 0.5em;
  margin: 0.5em 0;
  display: flex;
  flex-flow: wrap;
  gap: 0.5em;
`;
function stringToHue(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  return Math.abs(hash) % 360;
}
function CreditItem({ name, reason, link }: { name: string; reason?: string; link?: string }): h.JSX.Element {
  return (
    <CreditItemComponent stroke={stringToHue(name).toString()}>
      {link ? (
        <a target="_blank" href={link}>
          <span>{name}</span>
        </a>
      ) : (
        <span>{name}</span>
      )}
      {reason && <span> - {reason}</span>}
    </CreditItemComponent>
  );
}
export function AboutPage({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
  return (
    <div>
      <button onClick={() => setPage("menu")} className="ABCL-exit-button"></button>
      <div>
        <h1>ABCL {modVersion}</h1>
        <p>
          An addon for{" "}
          <a target="_blank" href="https://www.bondageprojects.com/club_game/">
            Bondage Club
          </a>{" "}
          that adds ABDL features to the game.
        </p>
        <p>
          Made by{" "}
          <a target="_blank" href="https://github.com/zoe-64">
            Zoe
          </a>{" "}
          and{" "}
          <a target="_blank" href="https://github.com/kjbro">
            En (mama)
          </a>
          .
        </p>
        <p>
          Thanks to
          <CreditBox>
            <CreditItem name="Firefly" />
            <CreditItem name="Arelia" />
            <CreditItem name="Lorenzi" />
            <CreditItem name="Tenjõ" link="https://github.com/tenjou-no-kitsune" />
            <CreditItem name="Lumi" link="https://github.com/blorbly" />
            <CreditItem name="JennaWbbb" link="https://github.com/JennaWbbb" />
            <CreditItem name="Maple" link="https://github.com/mochamaple" />
            <CreditItem name="Zoi" link="https://github.com/FurryZoi" />
            <CreditItem name="minimar" link="https://github.com/minimar" />
            <CreditItem name="Deep" link="https://github.com/dDeepLb" />
            <CreditItem name="Da'Inihlus" link="https://github.com/dynilath" />
            <CreditItem name="Nemesea" link="https://github.com/tetris245" />
            <CreditItem name="Sera" link="https://github.com/littlesera" />
            <CreditItem name="Ashlor" link="https://github.com/Ashlor" />
            <CreditItem name="Code Rabbit Ai" link="https://github.com/coderabbitai" />
          </CreditBox>
          <br />
          <div>Supporters:</div>
          <CreditBox>
            <CreditItem name="Madelyn" />
            <CreditItem name="Candi" />
            <CreditItem name="JennaWbbb" />
          </CreditBox>
        </p>
        <p>
          Source code available on{" "}
          <a target="_blank" href="https://github.com/zoe-64/ABCL">
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
}
