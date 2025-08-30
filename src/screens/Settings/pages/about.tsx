import { h } from "preact";
import "./about.css";
import { Stack } from "src/screens/components/positionComponents";
import styled from "@emotion/styled";

const CreditItemComponent = styled.p`
  margin: 0;
  > a {
    text-decoration: none;
    color: inherit;
  }
  > span {
    color: inherit;
  }
`;
function CreditItem({ name, reason, link }: { name: string; reason: string; link?: string }): h.JSX.Element {
  return (
    <CreditItemComponent>
      {link ? (
        <a target="_blank" href={link}>
          <span>{name}</span>
        </a>
      ) : (
        <span>{name}</span>
      )}
      - <span>{reason}</span>
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
          <Stack className="ABCL-thanks-list">
            <CreditItem name="Firefly" reason="for the original idea" />
            <CreditItem name="Maple" reason="for the mod plugin template" link="https://github.com/mochamaple" />
            <CreditItem name="Zoi" reason="for helping get themed to work" link="https://github.com/FurryZoi" />
            <CreditItem name="minimar" reason="for helping with typos" link="https://github.com/minimar" />
            <CreditItem name="Deep" reason="for helping with code review and testing" link="https://github.com/dDeepLb" />
            <CreditItem name="Da'Inihlus" reason="for providing great library mods" link="https://github.com/dynilath" />
            <CreditItem name="Nemesea" reason="for getting me started with modding in bc" link="https://github.com/tetris245" />
            <CreditItem name="Sera" reason="for helping during the development process" link="https://github.com/littlesera" />
          </Stack>
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
