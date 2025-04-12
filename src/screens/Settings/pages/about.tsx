import { h } from "preact";
import "./about.css";

export function AboutPage({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
  return (
    <div>
      <button onClick={() => setPage("menu")} className="ABCL-exit-button"></button>
      <div>
        <h1>ABCL {modVersion}</h1>
        <p>
          An addon for <a href="https://www.bondageprojects.com/club_game/">Bondage Club</a> that adds ABDL features to the game.
        </p>
        <p>
          Made by <a href="https://github.com/zoe-64">Zoe</a> and <a href="https://github.com/kjbro">En (mama)</a>.
        </p>
        <p>
          Thanks to
          <div className="ABCL-thanks-list">
            <p>
              <a>
                <span>Firefly</span>
              </a>{" "}
              - <span data-reason>for the original idea</span>
            </p>
            <p>
              <a href="https://github.com/mochamaple">
                <span data-name></span>Maple
              </a>{" "}
              - <span data-reason>for the mod plugin template</span>
            </p>
            <p>
              <a href="https://github.com/FurryZoi">
                <span data-name></span>Zoi
              </a>{" "}
              - <span data-reason>for helping get themed to work</span>
            </p>
            <p>
              <a href="https://github.com/minimar">
                <span data-name></span>minimar
              </a>{" "}
              - <span data-reason>for helping with typos</span>
            </p>
            <p>
              <a href="https://github.com/dDeepLb">
                <span data-name></span>Deep (papa)
              </a>{" "}
              - <span data-reason>for helping with code review and testing</span>
            </p>
            <p>
              <a href="https://github.com/dynilath">
                <span data-name></span>Da'Inihlus
              </a>{" "}
              - <span data-reason>for mod items architecture</span>
            </p>
            <p>
              <a href="https://github.com/tetris245">
                <span data-name></span>Nemesea
              </a>{" "}
              - <span data-reason>for getting me started with modding in bc</span>
            </p>
            <p>
              <a href="https://github.com/littlesera">
                <span data-name></span>Sera
              </a>{" "}
              - <span data-reason>for helping during the development process</span>
            </p>
          </div>
        </p>
        <p>
          Source code available on <a href="https://github.com/zoe-64/ABCL">GitHub</a>.
        </p>
      </div>
    </div>
  );
}
