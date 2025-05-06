// ==UserScript==
// @name ABCL (Loader) Latest
// @namespace https://www.bondageprojects.com/
// @version Latest
// @description An addon for [Bondage Club](https://www.bondageprojects.com/club_game/). Stands for "Adult baby club lover"~
// @author Zoe, Maple, En
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @match http://localhost:*/*
// @icon  https://zoe-64.github.io/ABCL/versions/latest/assets/favicon.ico
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
  "use strict";
  const src = `https://zoe-64.github.io/ABCL/versions/latest/abcl.js?v=${Date.now()}`;
  if (typeof ABCL_Loaded === "undefined") {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
})();
