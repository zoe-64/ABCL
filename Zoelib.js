const pronounMap = {
    "HeHim": {"subjective": "he", "objective": "him", "dependent": "his", "independent": "his", "reflexive": "himself"},
    "SheHer": {"subjective": "she", "objective": "her", "dependent": "her", "independent": "hers", "reflexive": "herself"},
    "TheyThem": {"subjective": "they", "objective": "them", "dependent": "their", "independent": "theirs", "reflexive": "themself"},
    "ItIt": {"subjective": "it", "objective": "it", "dependent": "its", "independent": "its", "reflexive": "itself"}, // not sure if it's even used
};
/**
* @param {String} shape aka subjecive (they, she), objective (them, her),  depdendant (their, her), independent (theirs, hers), reflexive (themself, herself)
* @returns {String} pronoun
*/
function Pronoun(shape) {
    let pronouns = Player.GetPronouns()
    return pronounMap[pronouns][shape.toLowerCase()]
}
function GetName(id=Player.MemberNumber) {
    return ChatRoomCharacter.map(char => char.MemberNumber).includes(id) ? (ChatRoomCharacter.find(char => char.MemberNumber == id).Nickname || ChatRoomCharacter.find(char => char.MemberNumber == id).Name) : "Unknown";
}
function GetPlayer(identifier) {
    if (typeof identifier == "string") {
        identifier = identifier.toLowerCase()
    }
    for (let character of ChatRoomCharacter) {
        if (character.MemberNumber == identifier) {
            return character
        }
        if (character.Name == identifier) {
            return character
        }
        if (character.Nickname.toLowerCase() == identifier) {
            return character
        }
    }
    if (identifier == "random") {
        return ChatRoomCharacter[Math.floor(Math.random() * ChatRoomCharacter.length)]
    }
    console.error("Player not found: ", identifier)
    return null;
}
async function getJson(url) {
    return fetch(url).then(response => response.json());
}
 
function hexToRgb(hex) {
    if (hex == "Default" || hex == "#") {
        hex = "#808080";
    }
    try {
        hex.replace(/^#/, '').match(/.{2}/g).map(x => parseInt(x, 16));
    } catch (e) {
        console.error(e);
        return [128, 128, 128];
    }
    return hex.replace(/^#/, '').match(/.{2}/g).map(x => parseInt(x, 16));
}
// Convert the RGB array to a hex color
function rgbToHex([r, g, b]) {
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

function averageColor(hex1, hex2, ratio = 0.5) {
    // Convert hex colors to RGB arrays
    let rgb1 = hexToRgb(hex1);
    let rgb2 = hexToRgb(hex2);

    // Calculate the weighted average RGB values based on the ratio
    let avgRgb = rgb1.map((x, i) => Math.round(x * ratio + rgb2[i] * (1 - ratio)));

    // Convert the average RGB values back to hex
    return rgbToHex(avgRgb);
}

class LocalCache {
    constructor(prefix) {
        this.prefix = prefix;
    }
    get(property, defaultValue = null) {
        let data = JSON.parse(localStorage.getItem(`${this.prefix}-${Player.MemberNumber}`)) || {};
        return (typeof data[property] != 'undefined' &&  data[property] != null) ? data[property] : defaultValue;
    } 
    set(property, value) {
        let data = JSON.parse(localStorage.getItem(`${this.prefix}-${Player.MemberNumber}`)) || {};
        data[property] = value;
        localStorage.setItem(`${this.prefix}-${Player.MemberNumber}`, JSON.stringify(data));
    }
}

class Messager {
    constructor() {
        this.callbacks = [];
        this.register("hiddenMessagerTest", (data) => {
            console.log("Message Received: ", data);
        });
    }
    send(json, Target) {
        ServerSend("ChatRoomChat", {Content:JSON.stringify(json), Type: "Hidden", Target: Target})
    }
    register(description, callback, priority = -5) {
        ChatRoomRegisterMessageHandler({Description:description, Callback: callback, Priority: priority})
        this.callbacks.push(callback);
    }

}
console.log("Zoelib.js loaded:" + getJson);