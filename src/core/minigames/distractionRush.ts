import { incontinenceCheck } from "../player/player";
import { overlay } from "../player/ui";
import { BaseMiniGame } from "./baseMinigame";

const options = {
  Wetting: {
    good: [
      { text: "Painting with crayons" },
      { text: "Building with blocks" },
      { text: "Shaking a rattle" },
      { text: "Listening to calming music" },
      { text: "Reciting the alphabet backwards" },
      { text: "Reading a boring book" },
      { text: "Doing a simple puzzle" },
      { text: "Coloring in a coloring book" },
      { text: "Writing your name repeatedly" },
      { text: "Stacking small stones" },
      { text: "Threading beads on a string" },
      { text: "Organizing playing cards" },
      { text: "Drawing spirals on paper" },
      { text: "Studying a detailed picture" },
      { text: "Looking for hidden objects" },
      { text: "Sorting paper clips by color" },
      { text: "Making a mental to-do list" },
    ],
    bad: [
      { text: "A delicious smoothie" },
      { text: "Jumping on a trampoline" },
      { text: "Taking a nap" },
      { text: "Listening to running water" },
      { text: "Drinking a large coffee" },
      { text: "Sipping iced water" },
      { text: "Doing jumping jacks" },
      { text: "Sitting in a warm bath" },
      { text: "Drinking a glass of milk" },
      { text: "Watching a comedy show" },
      { text: "Ocean sounds meditation" },
      { text: "Eating watermelon" },
      { text: "Doing deep squats" },
      { text: "Pouring liquid between cups" },
      { text: "Drinking through a straw" },
      { text: "Holding a cold beer can" },
      { text: "Thinking of rollercoasters" },
      { text: "Applying a cold compress" },
      { text: "Sitting on a vibrating chair" },
    ],
  },
  Messes: {
    good: [
      { text: "Sitting very still and straight" },
      { text: "Taking slow, shallow breaths" },
      { text: "Counting backwards from 100" },
      { text: "Ignoring your phone" },
      { text: "Focusing on a neutral smell" },
      { text: "Tightly clenching your lips" },
      { text: "Visualizing a firm, flat surface" },
      { text: "Listening to loud, upbeat music" },
      { text: "Reading an intense thriller novel" },
      { text: "Squeezing a stress ball with your hand" },
      { text: "Mentally calculating math problems" },
      { text: "Tuning into a single distant sound" },
      { text: "Thinking 'no' on repeat" },
      { text: "Pressing your feet firmly into the floor" },
      { text: "Visualizing a big red stop sign" },
      { text: "Crossing your fingers and toes" },
      { text: "Imagining a bright, dry light" },
    ],
    bad: [
      { text: "Drinking a hot morning coffee" },
      { text: "Chugging a glass of water" },
      { text: "Eating a big breakfast" },
      { text: "Laughing uncontrollably" },
      { text: "Feeling a sneeze coming on" },
      { text: "Sitting in a warm, comfy armchair" },
      { text: "Bending over to touch your toes" },
      { text: "Eating a fiber-rich cereal bar" },
      { text: "Sipping on prune juice" },
      { text: "Wearing tight pants around your waist" },
      { text: "Lying down on your side" },
      { text: "Smelling a delicious meal cooking" },
      { text: "Jogging in place" },
      { text: "Eating a spicy bite of food" },
      { text: "Drinking iced water quickly" },
      { text: "Reading on the toilet 'just in case'" },
      { text: "Listening to smooth, relaxing jazz" },
      { text: "Applying gentle stomach pressure" },
    ],
  },
};

const WIN_THRESHOLD = 5;
const MAX_MISTAKES = 2;
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export class DistractionRushGame extends BaseMiniGame {
  correctAnswers = 0;
  mistakes = 0;
  rounds = 5;
  Element: HTMLElement | null = null;
  type: "Wetting" | "Messes";
  options: (typeof options)[typeof this.type];
  static timerLength: number = 120;
  timeLeft: number = 0;
  timer: number | null = null;
  constructor(type: "Wetting" | "Messes") {
    super();
    this.type = type;
    this.name = "DistractionRush-" + type;
    this.options = options[type];
  }
  Load() {
    incontinenceCheck.pause();
    super.Load();
    this.Element = ElementCreate({
      tag: "div",
      attributes: {
        id: "abcl-minigame",
      },
      classList: ["game-container", "minigame-loading", "abcl-distraction-rush-panel"],
      children: [
        {
          tag: "h1",
          children: [`Oh no! The ${this.type === "Wetting" ? "stream" : "mess"} is coming soon!`],
        },
        {
          tag: "p",
          children: [document.createTextNode("Find a way to distract yourself before it's too late.")],
        },
        {
          tag: "div",
          attributes: { id: "abcl-minigame-status" },
          classList: ["status-bar", "abcl-distraction-rush-status"],
          children: [],
        },
        {
          tag: "div",
          attributes: { id: "abcl-minigame-container" },
          classList: ["abcl-minigame-vertical-list", "abcl-distraction-rush-options"],
          children: [],
        },
        ElementButton.Create(
          null,
          () => {
            this.End(false);
          },
          {
            tooltip: `Choose to ` + (this.type === "Wetting" ? "wet" : "mess") + " yourself.",
            tooltipPosition: "bottom",
          },
          {
            button: {
              classList: ["abcl-distraction-rush-button", "abcl-distraction-rush-button-forfeit"],
              children: ["Forfeit"],
            },
          },
        ),
        ElementCreate({
          tag: "div",
          attributes: {
            id: "abcl-minigame-timer",
          },
          classList: ["abcl-distraction-rush-timer"],
          children: ["00"],
        }),
      ],
      parent: overlay,
    });
    this.correctAnswers = 0;
    this.mistakes = 0;
    this.renderGame();
    this.timeLeft = Math.floor(DistractionRushGame.timerLength / MiniGameDifficulty);
    this.timer = setInterval(() => {
      this.timeLeft--;
      const timer = document.getElementById("abcl-minigame-timer");
      if (!timer || this.timeLeft < 0) return;
      timer.innerHTML = this.timeLeft < 10 ? "0" + this.timeLeft : this.timeLeft.toString();
      if (this.timeLeft <= 0 && this.correctAnswers < WIN_THRESHOLD) {
        this.ShowMessage(false);
      }
    }, 1000);
  }
  Unload() {
    ElementRemove(this.Element!);
    clearInterval(this.timer!);
  }
  renderGame() {
    if (this.correctAnswers >= WIN_THRESHOLD) {
      return this.ShowMessage(true);
    }
    if (this.mistakes >= MAX_MISTAKES) {
      return this.ShowMessage(false);
    }

    this.updateStatus();
    this.renderOptions();
  }

  updateStatus() {
    const statusContainer = document.getElementById("abcl-minigame-status");
    if (statusContainer) {
      statusContainer.innerHTML = `
                <span>Wins: ${this.correctAnswers} / ${WIN_THRESHOLD}</span>
                <span>Mistakes: ${this.mistakes} / ${MAX_MISTAKES}</span>
            `;
    }
  }
  CreateOption(text: string, isGood: boolean) {
    const tooltipTexts = [
      "Hmm.. is that the right one?",
      "I'm not sure..",
      "Maybe you should press forfeit?",
      "It's too hard.",
      "Hmm yea this is probably correct.",
      "The pressure is too much!",
      "You probably can't read anymore... You are just looking at the icons",
    ];
    return ElementButton.Create(
      null,
      () => {
        if (isGood) {
          this.correctAnswers++;
        } else {
          this.mistakes++;
        }
        this.renderGame();
      },
      {
        tooltip: tooltipTexts[Math.floor(Math.random() * tooltipTexts.length)],
        tooltipPosition: "bottom",
      },
      {
        button: {
          classList: ["abcl-distraction-rush-button"],
          dataAttributes: {
            isGood: isGood,
          },
          children: [text],
        },
      },
    );
  }
  renderOptions() {
    const container = document.getElementById("abcl-minigame-container");
    if (!container) return;

    container.innerHTML = "";

    const goodIndex = Math.floor(Math.random() * this.options.good.length);
    const goodItem = this.options.good[goodIndex];
    if (!goodItem) return;
    const goodOption: { text: string; isGood: boolean } = {
      text: goodItem.text,
      isGood: true,
    };
    const badCandidates: { text: string; isGood: boolean }[] = [];
    for (let i = 0; i < Math.max(Math.round(2 * MiniGameDifficulty), 1); i++) {
      const bad = this.options.bad[Math.floor(Math.random() * this.options.bad.length)];
      if (!bad) continue;
      const candidate = { text: bad.text, isGood: false };
      badCandidates.push(candidate);
    }

    const selectedOptions: { text: string; isGood: boolean }[] = [goodOption, ...badCandidates];
    const shuffledOptions: { text: string; isGood: boolean }[] = shuffleArray(selectedOptions);

    // 4. Create buttons for each
    shuffledOptions.forEach(option => {
      const button = this.CreateOption(option.text, option.isGood);
      container.appendChild(button);
    });
  }
  ShowMessage(victory: boolean) {
    const container = document.getElementById("abcl-minigame-container")!;
    const statusContainer = document.getElementById("abcl-minigame-status")!;

    clearInterval(this.timer!);
    container.innerHTML = "";
    statusContainer.innerHTML = "";
    ElementCreate({
      tag: "div",
      classList: ["abcl-minigame-horizontal-list"],
      children: [
        {
          tag: "h2",
          children: [document.createTextNode("Result (closes in 15 seconds)")],
        },
        {
          tag: "p",
          children: [
            document.createTextNode(victory ? "SUCCESS! You held it! The distractions worked. What a relief!" : "FAILURE! The pressure was too great."),
          ],
        },
        ElementButton.Create(
          null,
          () => {
            this.End(victory);
          },
          null,
          {
            button: {
              classList: ["abcl-distraction-rush-button"],
              children: ["OK"],
            },
          },
        ),
      ],
      parent: statusContainer,
    });
    setTimeout(() => {
      if (!MiniGameEnded) this.End(victory);
    }, 15000);
  }

  End(victory: boolean) {
    super.End(victory);
  }
}
