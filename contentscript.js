// create a hidden tag
let runtimeID = document.createElement('div');
runtimeID.style.display = 'none'; // Hide it from view
runtimeID.id = 'ABCLruntimeID'; // Set an ID for easy access

let userAgent = navigator.userAgent.toLowerCase();
if (userAgent.includes("chrome") && !userAgent.includes("edge") && typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
  // Chrome or Chromium-based browsers (excluding Edge)
  let manifestURL = chrome.runtime.getURL("manifest.json");
  runtimeID.innerHTML = manifestURL.replace("manifest.json", "");
} else if (userAgent.includes("firefox") && typeof browser !== 'undefined' && browser.runtime && browser.runtime.id) {
  // Firefox
  let manifestURL = browser.runtime.getURL("manifest.json");
  runtimeID.innerHTML = manifestURL.replace("manifest.json", "");
} else {
  let manifestURL = browser.runtime.getURL("manifest.json");
  runtimeID.innerHTML = manifestURL.replace("manifest.json", "");
}

document.body.appendChild(runtimeID);

for (let src of ['ABCL.js']) {
  switch (src.split('.').pop()) {
    case 'js':
      let script = document.createElement('script');
      script.type = 'module';
      script.defer = true;
      script.src = chrome.runtime.getURL(src);
      (document.head || document.documentElement).appendChild(script);
      break;
    case 'css':
      let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = chrome.runtime.getURL(src);
      (document.head || document.documentElement).appendChild(link);
      break;
    case 'html':
      fetch(chrome.runtime.getURL(src))
        .then(response => response.text())
        .then(text => {
          
          let div = document.createElement('div');
          div.innerHTML = text;
          document.body.appendChild(div);
          
        });
      break;
    default:
      break;
  }
}