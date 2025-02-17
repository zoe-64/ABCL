// ==UserScript==
// @name __NAME__
// @namespace https://www.bondageprojects.com/
// @version 2.0.0-beta
// @description __DESCRIPTION__
// @author __AUTHOR__
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @match http://localhost:*/*
// @icon  __FAVICON__
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
  "use strict";
  const src = `__DEPLOY_SITE__?v=${Date.now()}`;
  if (typeof __LOAD_FLAG__ === "undefined") {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
})();
