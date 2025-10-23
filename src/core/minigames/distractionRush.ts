import { incontinenceCheck } from "../player/player";
import { overlay } from "../player/ui";
import { BaseMiniGame } from "./baseMinigame";

const options = {
  Wetting: {
    good: [
      { text: "🖍️ Painting with Crayons" },
      { text: "🧱 Building with Blocks" },
      { text: "👶 Shaking a Rattle" },
      { text: "🎵 Listening to Calming Music" },
      { text: "💭 Reciting the Alphabet Backwards" },
      { text: "📚 Reading a Boring Book" },
      { text: "🧩 Doing a Simple Puzzle" },
      { text: "🎨 Coloring in a Coloring Book" },
      { text: "📝 Writing Your Name Repeatedly" },
      { text: "🪨 Stacking Small Stones" },
      { text: "🧵 Threading Beads on a String" },
      { text: "🃏 Organizing Playing Cards" },
      { text: "🌀 Drawing Spirals on Paper" },
      { text: "🖼️ Studying a Detailed Picture" },
      { text: "🔍 Looking for Hidden Objects" },
      { text: "🗂️ Sorting Paper Clips by Color" },
      { text: "📋 Making a Mental To-Do List" },
    ],
    bad: [
      { text: "🥤 A Delicious Smoothie" },
      { text: "🤸 Jumping on a Trampoline" },
      { text: "😴 Taking a Nap" },
      { text: "🚿 Listening to Running Water" },
      { text: "☕ Drinking a Large Coffee" },
      { text: "💦 Sipping Iced Water" },
      { text: "🏃 Doing Jumping Jacks" },
      { text: "🛁 Sitting in a Warm Bath" },
      { text: "🥛 Drinking a Glass of Milk" },
      { text: "🤣 Watching a Comedy Show" },
      { text: "🌊 Ocean Sounds Meditation" },
      { text: "🍉 Eating Watermelon" },
      { text: "🧘 Doing Deep Squats" },
      { text: "🫖 Pouring Liquid Between Cups" },
      { text: "🚰 Drinking Through a Straw" },
      { text: "🍺 Holding a Cold Beer Can" },
      { text: "🎢 Thinking of Rollercoasters" },
      { text: "❄️ Applying Cold Compress" },
      { text: "🪑 Sitting on a Vibrating Chair" },
    ],
  },
  Messes: {
    good: [
      { text: "🧘 Sitting Very Still and Straight" },
      { text: "😮‍💨 Taking Slow, Shallow Breaths" },
      { text: "💭 Counting Backwards from 100" },
      { text: "📵 Ignoring Your Phone" },
      { text: "👃 Focusing on a Neutral Smell" },
      { text: "🤐 Tightly Clenching Your Lips" },
      { text: "🛌 Visualizing a Firm, Flat Surface" },
      { text: "🎵 Listening to Loud, Upbeat Music" },
      { text: "📚 Reading an Intense Thriller Novel" },
      { text: "✊ Squeezing a Stress Ball (with your hand)" },
      { text: "🧮 Mentally Calculating Math Problems" },
      { text: "👂 Tuning Into a Single Distant Sound" },
      { text: "🚫 Thinking 'No' on Repeat" },
      { text: "🪑 Pressing Your Feet Firmly into the Floor" },
      { text: "🛑 Visualizing a Big Red Stop Sign" },
      { text: "🤞 Crossing Your Fingers and Toes" },
      { text: "💡 Imagining a Bright, Dry Light" },
    ],
    bad: [
      { text: "☕ Drinking a Hot Morning Coffee" },
      { text: "🚰 Chugging a Glass of Water" },
      { text: "🍳 Eating a Big Breakfast" },
      { text: "🤣 Laughing Uncontrollably" },
      { text: "🤧 Feeling a Sneeze Coming On" },
      { text: "🪑 Sitting in a Warm, Comfy Armchair" },
      { text: "🧘 Bending Over to Touch Your Toes" },
      { text: "🍎 Eating a Fiber-Rich Cereal Bar" },
      { text: "🫖 Sipping on Prune Juice" },
      { text: "🤰 Wearing Tight Pants Around Your Waist" },
      { text: "🛌 Lying Down on Your Side" },
      { text: "🍽️ Smelling a Delicious Meal Cooking" },
      { text: "🏃‍♂️ Jogging in Place" },
      { text: "🌶️ Eating a Spicy Bite of Food" },
      { text: "🧊 Drinking Iced Water Quickly" },
      { text: "📖 Reading on the Toilet 'Just in Case'" },
      { text: "🪕 Listening to Smooth, Relaxing Jazz" },
      { text: "🤰 Applying Gentle Stomach Pressure" },
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
  timer: NodeJS.Timeout | null = null;
  constructor(type: "Wetting" | "Messes") {
    super();
    this.type = type;
    this.name = "DistractionRush-" + type;
    this.options = options[type];
  }
  Load() {
    incontinenceCheck.pause();
    this.Element = ElementCreate({
      tag: "div",
      attributes: {
        id: "abcl-minigame",
      },
      classList: ["game-container", "minigame-loading"],
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
          classList: ["status-bar"],
          children: [],
        },
        {
          tag: "div",
          attributes: { id: "abcl-minigame-container" },
          classList: ["abcl-minigame-vertical-list"],
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
          children: ["00"],
        }),
      ],
      parent: overlay,
    });
    this.correctAnswers = 0;
    this.mistakes = 0;
    this.renderGame();
    this.timeLeft = DistractionRushGame.timerLength / MiniGameDifficulty;
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
                <span>✅ Wins: ${this.correctAnswers} / ${WIN_THRESHOLD}</span>
                <span>❌ Mistakes: ${this.mistakes} / ${MAX_MISTAKES}</span>
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
    const goodOption: { text: string; isGood: boolean } = { ...this.options.good[goodIndex], isGood: true };

    const badCandidates: { text: string; isGood: boolean }[] = [];
    for (let i = 0; i < Math.max(Math.round(2 * MiniGameDifficulty), 1); i++) {
      const candidate = { ...this.options.bad[Math.floor(Math.random() * this.options.bad.length)], isGood: false };
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
