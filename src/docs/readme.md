ABCL repository: https://github.com/zoe-64/ABCL

Majority of BC addons are coded in Typescript, you will need to install node and probably an IDE, you need a github account.

To contribute to a repository:

1. Fork the repository
Press "Fork" button on the repository page

2. Clone the repository
```sh
git clone https://github.com/user/repository.git
```

3. Install dependancies
```sh
npm install
```
or your prefered package manager.

4. Run / build the addon
At this stage you should be able to run build scripts and run scripts

```sh
npm run watch
```
Will build and serve a scipt on http://localhost:3041

You can then use a ViolentMonkey / TamperMonkey usersript to load your dev version:
```js
// ==UserScript==
// @name ABCL (Loader)
// @namespace https://www.bondageprojects.com/
// @version Beta
// @description An addon for [Bondage Club](https://www.bondageprojects.com/club_game/). Stands for "Adult baby club lover"~
// @author Zoe, Maple, En
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @match http://localhost:*/*
// @icon  https://zoe-64.github.io/ABCL/versions/beta/assets/favicon.ico
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
  "use strict";
  const src = `http://127.0.0.1:3041/abcl.js?v=${Date.now()}`;
  if (typeof ABCL_Loaded === "undefined") {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
})();
```

**Do not run unstable code on your main account and disable the normal addon if you have it enabled!**
