// ==UserScript==
// @name ABCL
// @namespace https://www.bondageprojects.com/
// @version 1.0
// @description Diaper lover mod for Bondage Club
// @author Zoe
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @icon data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// @run-at document-end
// ==/UserScript==

const scriptSrc = "https://zoe-64.github.io/ABCL/beta/ABCL.js?_=" + Date.now();

let script = document.createElement("script");
script.setAttribute("language", "JavaScript");
script.setAttribute("crossorigin", "anonymous");
script.setAttribute("src", scriptSrc);
document.head.appendChild(script);
