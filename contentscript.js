// create a hidden tag
let runtimeID = document.createElement('div');
runtimeID.style.display = 'none';
runtimeID.innerHTML = "chrome-extension://"+chrome.runtime.id+"/";
runtimeID.id = 'ABCLruntimeID';
document.body.appendChild(runtimeID);

for (let src of ['ABCL.js','Data/abcl.html']) {
  switch (src.split('.').pop()) {
    case 'js':
      let script = document.createElement('script');
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