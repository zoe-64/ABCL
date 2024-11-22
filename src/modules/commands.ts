import { GetName, GetPlayer, Messager, Pronoun } from "zoelib/dist/zoelib.mjs";
import { templates } from "./data";
import { modSession, modStorage } from "./storage";
import { changeDiaper, releaseInClothes, releaseInDiaper } from "./diaper";
import { getTime,nextDiaperAction } from "./utils";
import { increeseDesperation, getRegressionIncreese } from "./stats";


interface ICommand {
    name: string
    description: string
    args?: string
    action: (text: string) => void
}

const commands: ICommand[] = [
    {
        name: "help",
        description: "Open ABCL help menu",
        action: () => {
            ChatRoomSendLocal(
                "<p style='background-color:#ecc826'><b>ABCL</b>: Welcome to Adult Baby Club Lover! Where we make sure babies use their diapers!\n" +
                " \n" +
                "<b>/abcl tick</b> to force a tick\n" +
                "<b>/abcl stats</b> to see your current diaper stats\n" +
                "<b>/abcl help</b> to see this message\n" +
                " \n" +
                "To get new clean diapers:\n" +
                "<b>/abcl change</b> to change your diaper\n" +
                "<b>/abcl change (target)</b> to change someone else's diaper\n" +
                " \n" +
                "If you have any issues or suggestions then please join https://discord.gg/V9rNpRQqtZ</p>"
            );
        }
    },
    {
        name: "stats",
        description: "Displays ABCL info",
        action: () => {
            ChatRoomSendLocal(templates.stats);  
        }
    }, 
    {
        name: "tick",
        description: "Jumps forward to the next accident",
        action: () => {
            if (modSession.topLayer || modSession.bottomLayer) {
                releaseInDiaper()
            } else {
                releaseInClothes();
                modSession.settings.regressionLevel+= getRegressionIncreese()
                increeseDesperation()
            }
            ChatRoomSendLocal(`<p style='background-color:#ecc826'>ABCL: ${Player.Nickname == '' ? Player.Name : Player.Nickname} squeezes ${Pronoun.get("dependent", Player)} abdomen trying to get it all out. (only you can see this).</p>`);
        }
    },
    {
        name: "change",
        description: "Changes you or another person",
        args: "[username]",
        action: (args) => {
            let [command, ...input] = args.split(/[ ,]+/);
            let identifier = input[0]
            if (identifier == null) {
                if (!(modStorage.topLayer || modStorage.bottomLayer)) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#ecc826'>ABCL: You don't have a diaper!</p>"
                    );
                } else 
                    changeDiaper(Player);
                } else {
                    // inputs: Player.Name, Player.MemberNumber, Player.Nickname
                    let player = GetPlayer(identifier) as typeof Player;                                
                    if (player == null) {
                        ChatRoomSendLocal("<p style='background-color:#ecc826'>ABCL: Player not found!</p>");
                        return;
                    }

                    if (modStorage.topLayer || modStorage.bottomLayer) {
                        changeDiaper(player);
                    } else {
                        ChatRoomSendLocal("<p style='background-color:#ecc826'>ABCL: " + ChatRoomHTMLEntities(GetName(player)) + " does not have a diaper!</p>");
                    }
                    
                } 
        }
    }


];

function getArgs(text: string): string[] {
	return text.split(",").map((arg) => {
		return arg.trim();
	});
}
export function loadCommands(): void {
    CommandCombine([
        {
            Tag: "abcl",
            Description: "Execute ABCL command",
            Action: function (text) {
                const commandName = text.split(" ")[0];
                const commandText = text.split(" ").slice(1).join(" ");
                const command = commands.find((c) => c.name === commandName);
    
                if (command) {
                    command.action(commandText);
                } else {
					Messager.send("Unknown command, use <!/abcl help!> to view a list of all available commands!", Player.MemberNumber, "LocalMessage")
                }
            }
        }
    ]);
    setInterval(statUpdateLoop, 1000);

}

export async function statUpdateLoop() {
        const statBoxes = document.querySelectorAll('.stats-box');
        const seconds = getTime();
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const chance = nextDiaperAction();
        const totalAbsorbancy = (modSession.topLayer?.absorbancy ?? 0) + (modSession.bottomLayer?.absorbancy ?? 0)
        const totalMesses = (modSession.topLayer?.messes ?? 0) + (modSession.bottomLayer?.messes ?? 0)
        const totalWettings = (modSession.topLayer?.wettings ?? 0) + (modSession.bottomLayer?.wettings ?? 0)

        statBoxes.forEach(statbox => {
            const wetCount = statbox.querySelector('.wetCount');
            const messCount = statbox.querySelector('.messCount');
            const wetChance = statbox.querySelector('.wetChance');
            const messChance = statbox.querySelector('.messChance');
            const tickMinutes = statbox.querySelector('.tickMinutes');
            const tickSeconds = statbox.querySelector('.tickSeconds');
            const bar = statbox.querySelector('.bar') as HTMLElement; 
            const absorbancyTotal = statbox.querySelector('.absorbancyTotal');
            const desperationBase = statbox.querySelector('.desperationBase');
            const regressionBase = statbox.querySelector('.regressionbase');
            const regressionModifier = statbox.querySelector('.regressionModifier');

            if (wetCount) wetCount.textContent = (totalWettings * 60).toString();
            if (messCount) messCount.textContent = (totalMesses * 60).toString();
            if (wetChance) wetChance.textContent = Math.floor(chance.wet * 100) + '%';
            if (messChance) messChance.textContent = Math.floor(chance.mess * 100) + '%';
            if (tickMinutes) tickMinutes.textContent = minutes.toString();
            if (tickSeconds) tickSeconds.textContent = remainingSeconds.toString();
            if (bar) bar.style.width = (seconds / (getTime() * 60)) * 100 + '%';
            if (absorbancyTotal) absorbancyTotal.textContent = (totalAbsorbancy * 60).toString();
            if (desperationBase) desperationBase.textContent = (Math.floor(modSession.settings.desperationLevel * 10) / 10).toString();
            if (regressionBase) regressionBase.textContent = (Math.floor((getRegressionIncreese() + modSession.settings.regressionLevel) * 10) / 10).toString() + '%';
            if (regressionModifier) regressionModifier.textContent = (Math.floor(getRegressionIncreese() * 10) / 10).toString() + '%';
        });
    }
