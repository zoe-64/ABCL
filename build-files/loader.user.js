// ==UserScript==
// @name __NAME__ __VERSION__
// @namespace https://www.bondageprojects.com/
// @version __VERSION__
// @description __DESCRIPTION__
// @author __AUTHOR__
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @match http://localhost:*/*
// @icon  __DEPLOY_SITE__/assets/favicon.ico
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
  "use strict";
  const src = `__DEPLOY_SITE__/abcl.js?v=${Date.now()}`;
  // @ts-ignore
  if (typeof ABCL_Loaded === "undefined") {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
})();
