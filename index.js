"use strict";
(() => {
  // data/dictionary.json
  var dictionary_default = `{ \r
    "DiaperSizeScale": {\r
        "none": 0,\r
        "small": 1500,\r
        "medium": 3000,\r
        "large": 5000\r
    },\r
    "Diapers": {\r
            "Patterned Diaper": {\r
                "primaryColor": 1,\r
                "size": "small"\r
            },\r
            "Bulky Diaper": {\r
                "primaryColor": 1,\r
                "secondaryColor": 0,\r
                "size": "medium"\r
            },\r
            "Bulky Chastity Diaper 0": {\r
                "primaryColor": 1,\r
                "secondaryColor": 0,\r
                "size": "medium"\r
            },\r
            "Bulky Chastity Diaper 1": {\r
                "primaryColor": 1,\r
                "secondaryColor": 0,\r
                "size": "large"\r
            },\r
            "Poofy Diaper": {\r
                "primaryColor": 1,\r
                "secondaryColor": 0,\r
                "size": "medium"\r
            },\r
            "Poofy Chastity Diaper": {\r
                "primaryColor": 1,\r
                "secondaryColor": 0,\r
                "size": "medium"\r
            },\r
            "Plastic Covered Diaper": {\r
                "primaryColor": 0,\r
                "size": "medium"\r
            },\r
            "Satin Covered Diaper": {\r
                "primaryColor": 0,\r
                "size": "large"\r
            },\r
            "Diaper": {\r
                "size": "small"\r
            },\r
            "Diaper Harness": {\r
                "size": "none"\r
            }\r
    },\r
    "Items": {\r
        "Adult Baby Harness": {"modifier": 0.2},\r
        "Shiny Dress": {"modifier": 0.4},\r
        "Bows Dress": {"modifier": 0.3},\r
        "Puffy Dress" : { "modifier": 0.2}, \r
        "Sumer flower dress" : {"modifier": 0.2},\r
        "Bib": {"modifier": 0.3},\r
        "Bonnet Style 1": {"modifier": 0.2},\r
        "Bonnet Style 2": {"modifier": 0.2},\r
        "Rose Tiara": {"modifier": 0.2},\r
        "Tutu": {"modifier": 0.2},\r
        "Hollow Butt Plug": {"modifier": 0.2},\r
\r
        "Cow Printed Socks": {"modifier": 0.1},\r
        "Striped Socks": {"modifier": 0.1},\r
        "Vinyl Socks": {"modifier": 0.1},\r
        "Style 4": {"modifier": 0.1},\r
\r
        "Halo": {"modifier": 0.1},       \r
        "Unicorn Horn": {"modifier": 0.1},\r
        "Reindeer Hairband": {"modifier": 0.1},\r
\r
        "Piercing Set": {"modifier": -0.1},\r
        "Harem Stockings": {"modifier": -0.1},\r
        "ID Card": {"modifier": -0.1}, \r
        "Key Necklace": {"modifier": -0.1}\r
        },\r
    "Regex": {\r
        "Cute": {"modifier": 0.1},\r
        "Frill": {"modifier": 0.2},\r
        "Panties": {"modifier": -0.1},\r
        "Bra": {"modifier": -0.1},\r
        "Bikini": {"modifier": -0.1},\r
        "Business": {"modifier": -0.1},\r
        "Cheerleader": {"modifier": 0.1},\r
        "Fur": {"modifier": 0.1},\r
        "Fishnet": {"modifier": -0.1},\r
        "Latex": {"modifier": -0.05},\r
        "Flower": {"modifier": 0.1},\r
        "Leather": {"modifier": -0.1},\r
        "Puff": {"modifier": 0.1},\r
        "Shiny": {"modifier": 0.1},\r
        "Satin": {"modifier": 0.1},\r
        "Ears": {"modifier": 0.1},\r
        "Horns": {"modifier": -0.1},\r
        "Crown": {"modifier": 0.1},\r
        "Briefs": {"modifier": -0.1},\r
        "Thong": {"modifier": -0.1},\r
        "Crotch": {"modifier": -0.1},\r
        "Heels": {"modifier": -0.1},\r
        "Angel": {"modifier": 0.1},\r
        "Pet": {"modifier": 0.1},\r
        "Ribbons": {"modifier": 0.1},\r
        "Plush": {"modifier": 0.1},\r
        "Crib": {"modifier": 0.5},\r
        "Cushion": {"modifier": 0.1},\r
        "Teddy": {"modifier": 0.1},\r
        "Bow": {"modifier": 0.1},\r
        "Mittes": {"modifier": 0.1},\r
        "Mits": {"modifier": 0.1},\r
        "Pacifier": {"modifier": 0.3},\r
        "Milk": {"modifier": 0.1},\r
        "Nursery": {"modifier": 3},\r
        "Heart": {"modifier": 0.1},\r
        "Doll": {"modifier": 0.1},\r
        "Baby": {"modifier": 0.1}\r
    },\r
    "CraftingModifiers": {\r
        "absorbancy": {\r
            "massive": 3,\r
            "big": 2,\r
            "large": 1\r
        },\r
        "messChance": {\r
            "special laxative": 0.8,\r
            "laxative": 0.4,\r
            "weak laxative": 0.2,\r
            "stinkies": 0.4,\r
            "messy": 0.2\r
        },\r
        "wetChance": {\r
            "special diuretic": 0.8,\r
            "diuretic": 0.4,\r
            "weak diuretic": 0.2\r
        },\r
        "regression": {\r
            "hypnotic": 5\r
        },\r
        "desperation": {\r
            "hypnotic": 5\r
        }\r
    },\r
    "messages":{\r
        "internalMonologue": {\r
            "mess": "You have made a mess in your \xA7diaper\xA7.",\r
            "fullymess": "You have fully soiled your \xA7diaper\xA7.",\r
            "wet": "You have wet your \xA7diaper\xA7.",\r
            "fullywet": "You have fully soiled your \xA7diaper\xA7.",\r
            "immergency": "You are really in need of a diaper change!",\r
            "selfwet": "You have wet your clothing. Get a \xA7diaper\xA7 on you before You make another mess!",\r
            "selfmess": "You have soiled your clothing. Get a \xA7diaper\xA7 on you before You make another mess!",\r
            "noDiaper": "You do not have a \xA7diaper\xA7! Get one on before You make a mess!",\r
            "changeSelf": "You have changed your \xA7diaper\xA7.",\r
            "changeBy": "\xA7by-player\xA7 has changed your \xA7diaper\xA7."\r
        },\r
        "default": {\r
            "mess": "\xA7name\xA7 has made a mess in \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "fullymess": "\xA7name\xA7 has fully soiled \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "wet": "\xA7name\xA7 has wet \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "fullywet": "\xA7name\xA7 has fully wet \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "immergency": "\xA7name\xA7 is really in need of a diaper change!",\r
            "selfwet": "\xA7name\xA7 has wet \xA7dependent\xA7 clothes. Get a \xA7diaper\xA7 on \xA7objective\xA7 before \xA7subjective\xA7 makes another mess!",\r
            "selfmess": "\xA7name\xA7 has soiled \xA7dependent\xA7 clothes. Get a \xA7diaper\xA7 on \xA7objective\xA7 before \xA7subjective\xA7 makes another mess!",\r
            "noDiaper": "\xA7name\xA7 does not have a \xA7diaper\xA7! Get one on \xA7objective\xA7 before \xA7subjective\xA7 makes a mess~",\r
            "changeSelf": "\xA7name\xA7 has changed \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "changeBy": "\xA7by-player\xA7 has changed \xA7name\xA7 \xA7current-diaper\xA7. \xA7name\xA7 is now clean and dry~"\r
        },\r
        "embarrassment": {\r
            "mess": "\xA7name\xA7 \xA7trembles\xA7 as \xA7dependent\xA7 diaper filled, trying desperately to remain discreet..",\r
            "fullymess": "\xA7name\xA7 diaper \xA7quickly\xA7 fills, \xA7name\xA7's \xA7trembles\xA7 intensifies, \xA7subjective\xA7's desperate to remain inconspicuous",\r
            "wet": "\xA7name\xA7 \xA7desperately\xA7 \xA7trembles\xA7 to conceal \xA7dependent\xA7 embarrassment as \xA7dependent\xA7 diaper \xA7quickly\xA7 soaks.",\r
            "fullywet": "\xA7name\xA7 \xA7burns\xA7 with \xA7embarrassment\xA7 as \xA7dependent\xA7 diaper is completely saturated, \xA7subjective\xA7 can't bear to imagine how \xA7obvious\xA7 the soggy bulge peeks",\r
            "immergency": "\xA7name\xA7 silently \xA7trembles\xA7, as \xA7dependent\xA7 diaper saggs heavily down \xA7dependent\xA7 legs, \xA7subjective\xA7 is in dire need of a change~",\r
            "selfwet": "\xA7name\xA7 freezes as \xA7warm\xA7 liquid trickles down \xA7dependent\xA7 legs, quickly creating a puddle beneath \xA7dependent\xA7; \xA7dependent\xA7 \xA7items-below\xA7 visibly damp.",\r
            "selfmess": "\xA7name\xA7 \xA7shudders\xA7 as \xA7warm\xA7 and \xA7wet\xA7 mess spreads across \xA7dependent\xA7 bottom, \xA7dependent\xA7 \xA7items-below\xA7 are now visibly soiled.",\r
            "changeSelf": "\xA7name\xA7 \xA7quickly\xA7 \xA7trembling\xA7 changes \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "changeBy": "\xA7name\xA7 \xA7trembles\xA7 as \xA7by-player\xA7 changes \xA7name\xA7 \xA7current-diaper\xA7.",\r
            "noDiaper": "\xA7name\xA7 \xA7trembles\xA7 as \xA7subjective\xA7 realizes \xA7dependent\xA7 \xA7current-diaper\xA7 is missing, \xA7subjective\xA7 is in dire need of a change~"\r
        }\r
    },\r
    "verbs": {\r
        "\xA7trembles\xA7": {"neutral":["trembles", "shudders", "shakes", "quivers", "shivers", "struggles", "squirms"]},\r
        "\xA7trembling\xA7": {"neutral":["trembling", "shaking", "quivering", "shivering", "struggling", "squirming"]},\r
        "\xA7moan\xA7": {"neutral":["moan", "groan", "whimper", "whine", "cry"]},\r
        "\xA7squirm\xA7": {"neutral":["squirm", "wriggle", "fidget", "shift", "shuffle"]},\r
        "\xA7blush\xA7": {"neutral":["blush", "flush", "redden"]},\r
        "\xA7quickly\xA7": {"neutral":["quickly", "rapidly", "swiftly", "promptly"]},\r
        "\xA7desperately\xA7": {"neutral":["desperatly", "frantically", "anxiously"]},\r
        "\xA7burns\xA7": {"neutral":["burns", "flushes", "glows"]},\r
        "\xA7embarrassment\xA7": {"neutral":["embarrassment", "shame", "humiliation"]},\r
        "\xA7obvious\xA7": {"neutral":["obvious", "clear", "evident"]},\r
        "\xA7wet\xA7": {"neutral":["wet", "soaked", "soggy", "damp", "moist"]},\r
        "\xA7has-wet\xA7": {"neutral":["wet", "soaked"]},\r
        "\xA7warm\xA7": {"neutral":["warm", "hot"]},\r
        "\xA7diaper\xA7": {"neutral":["diaper", "nappy", "pullup"]}\r
    }\r
}\r
`;

  // src/modules/player.ts
  var player = {
    _bladder: 0,
    _bowel: 0,
    waterIntake: 1 / 200,
    foodIntake: 1 / 450,
    metabolism: 1,
    // slow / normal / fast
    get bladder() {
      return this._bladder;
    },
    set bladder(value) {
      this._bladder = value;
      if (value > 1) this._bladder = 1;
      if (value < 0) this._bladder = 0;
    },
    get bowel() {
      return this._bowel;
    },
    set bowel(value) {
      this._bowel = value;
      if (value > 1) this._bowel = 1;
      if (value < 0) this._bowel = 0;
    },
    update() {
      player.bladder += player.waterIntake * player.metabolism / 100;
      player.bowel += player.foodIntake * player.metabolism / 100;
    }
  };

  // src/index.ts
  function getModVersion() {
    return "2.0";
  }
  globalThis.ABCLdata = dictionary_default;
  var abclData = dictionary_default;
  console.log(`abcl loaded version: ${getModVersion()}`);
  function loop() {
    player.update();
    if (player.bladder === 1) {
      player.bladder = 0;
      console.log("wet accident!!!");
    }
    if (player.bowel === 1) {
      player.bowel = 0;
      console.log("messy accident!!!");
    }
  }
  setInterval(loop, 1e3);
  loop();
})();
