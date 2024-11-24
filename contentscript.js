
let script = document.createElement('script');
script.type = 'module';
script.defer = true;
script.src = chrome.runtime.getURL("index.js");
(document.head || document.documentElement).appendChild(script);
