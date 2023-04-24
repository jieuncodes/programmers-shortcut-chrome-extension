export default function createTimerContainer($timerApp) {
  const timerContainerHtml = `
        <span id="timerSpan">00:00:00</span>
        <div class="buttonContainer">
          <button id="startPauseButton">&#x25B6</button>
          <button id="resetButton" class="hidden">&#10226;</button>
          <button id="closeButton">&#xD7</button>
        </div>
    `;

  const $target = document.createElement("div");
  $target.id = "timerContainer";
  $target.className = "hidden";
  $target.innerHTML = timerContainerHtml;

  $timerApp.appendChild($target);
}
