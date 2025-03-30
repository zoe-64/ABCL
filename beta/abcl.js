(() => {
  const dialog = document.createElement("dialog");
  dialog.innerHTML = `<div>
		<h1> Outdated Beta </h1>
		<p> You are using an outdated beta version of ABCL. Please switch to the latest version to ensure compatibility and security. </p>
		<a href="https://github.com/zoe-64/ABCL/blob/main/beta/bookmark.js"> Bookmark </a></br>
		<a href="https://github.com/zoe-64/ABCL/raw/main/versions/beta/loader.user.js"> Monkey Loader </a>
		</br><button id="closeButton" style="position:absolute;bottom:15px;right:15px"> Close </button>
		</div>`;
  document.body.appendChild(dialog);
  dialog.showModal();
  dialog.querySelector("#closeButton").addEventListener("click", () => dialog.close());
})();
