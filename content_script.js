let timerInterval;
let isRunning = false;

function createClockIcon() {
  const clockIcon = document.createElement("div");
  clockIcon.id = "clockIcon";
  clockIcon.innerHTML = "&#x23f1;";
  clockIcon.classList.add("clockIcon");
  document.body.appendChild(clockIcon);

  const tooltip = document.createElement("span");
  tooltip.id = "tooltip";
  tooltip.innerText = "타이머를 셋팅합니다";
  tooltip.classList.add("tooltip");
  clockIcon.appendChild(tooltip);
}

function createTimer() {
  const timerContainer = document.createElement("div");
  timerContainer.id = "timerContainer";
  timerContainer.classList.add("timerContainer");
  timerContainer.style.display = "none";

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("inputContainer");

  const hourInput = document.createElement("input");
  hourInput.id = "hourInput";
  hourInput.type = "number";
  hourInput.min = "0";
  hourInput.value = "00";
  hourInput.placeholder = "시간";
  hourInput.classList.add("hourInput");
  hourInput.addEventListener("focus", () => {
    hourInput.placeholder = "";
  });
  hourInput.addEventListener("blur", () => {
    hourInput.placeholder = "시간";
  });

  const colonSpan = document.createElement("span");
  colonSpan.innerText = ":";
  colonSpan.id = "colonSpan";

  const minuteInput = document.createElement("input");
  minuteInput.id = "minuteInput";
  minuteInput.type = "number";
  minuteInput.min = "0";
  minuteInput.value = "00";
  minuteInput.placeholder = "분";
  minuteInput.classList.add("minuteInput");
  minuteInput.addEventListener("focus", () => {
    minuteInput.placeholder = "";
  });
  minuteInput.addEventListener("blur", () => {
    minuteInput.placeholder = "분";
  });

  const timerText = document.createElement("span");
  timerText.id = "timer";
  timerText.innerText = "00:00:00";
  timerText.style.display = "none";

  const startPauseButton = document.createElement("button");
  startPauseButton.id = "startPauseButton";
  startPauseButton.innerHTML = "&#x25B6";
  startPauseButton.classList.add("startPauseButton");

  const resetButton = document.createElement("button");
  resetButton.id = "resetButton";
  resetButton.innerHTML = "&#10226;";
  resetButton.classList.add("resetButton");
  resetButton.style.display = "none";

  inputContainer.appendChild(hourInput);
  inputContainer.appendChild(colonSpan);
  inputContainer.appendChild(minuteInput);

  timerContainer.appendChild(inputContainer);
  timerContainer.appendChild(timerText);
  timerContainer.appendChild(startPauseButton);
  timerContainer.appendChild(resetButton);
  document.body.appendChild(timerContainer);

  const closeButton = createCloseButton();
  timerContainer.appendChild(closeButton);

  resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseButton.innerHTML = "&#x25B6";
    timerText.innerText = "00:00:00";
    timerText.style.display = "none";
    minuteInput.style.display = "block";
    hourInput.style.display = "block";
    colonSpan.style.display = "block";
    resetButton.style.display = "none";
    closeButton.style.display = "block";
  });
}

function startPauseTimer() {
  const startPauseButton = document.getElementById("startPauseButton");
  const hourInput = document.getElementById("hourInput");
  const minuteInput = document.getElementById("minuteInput");
  const timerText = document.getElementById("timer");
  const resetButton = document.getElementById("resetButton");

  let seconds =
    parseInt(hourInput.value) * 3600 + parseInt(minuteInput.value) * 60;

  if (!isRunning) {
    isRunning = true;
    startPauseButton.innerHTML = "&#x23F8";
    closeButton.style.display = "block";
    resetButton.style.display = "none";

    const formattedHours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const formattedMinutes = String(Math.floor((seconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    timerText.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    timerInterval = setInterval(() => {
      if (seconds > 0) {
        seconds -= 1;
        const formattedHours = String(Math.floor(seconds / 3600)).padStart(
          2,
          "0"
        );
        const formattedMinutes = String(
          Math.floor((seconds % 3600) / 60)
        ).padStart(2, "0");
        const formattedSeconds = String(seconds % 60).padStart(2, "0");
        timerText.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        startPauseButton.innerHTML = "&#x25B6";
        alert("시간이 다 됐습니다!");
      }
    }, 1000);
  } else {
    isRunning = false;
    startPauseButton.innerHTML = "&#x25B6";
    clearInterval(timerInterval);
    if (seconds > 0) {
      resetButton.style.display = "block"; // Moved from the click event listener to here
      closeButton.style.display = "none"; // Change 2: Hide the close button when the timer is paused
    } else {
      resetButton.style.display = "none";
    }
  }
}

function createCloseButton() {
  const closeButton = document.createElement("button");
  closeButton.id = "closeButton";
  closeButton.innerHTML = "&#xD7";
  closeButton.classList.add("closeButton");
  return closeButton;
}

createClockIcon();
createTimer();

document.getElementById("startPauseButton").addEventListener("click", () => {
  const hourInput = document.getElementById("hourInput");
  const minuteInput = document.getElementById("minuteInput");
  const timerContainer = document.getElementById("timerContainer");
  const timerText = document.getElementById("timer");

  let seconds =
    parseInt(hourInput.value) * 3600 + parseInt(minuteInput.value) * 60;

  if (seconds > 0) {
    timerContainer.style.display = "flex";
    const clockIcon = document.getElementById("clockIcon");
    clockIcon.style.display = "none";
    minuteInput.style.display = "none";
    colonSpan.style.display = "none";

    hourInput.style.display = "none";

    timerText.style.display = "block";
  }

  startPauseTimer();
});

document.getElementById("closeButton").addEventListener("click", () => {
  const timerContainer = document.getElementById("timerContainer");
  const clockIcon = document.getElementById("clockIcon");
  timerContainer.style.display = "none";
  clockIcon.style.display = "block";
  resetButton.style.display = "none"; // Change 3: Hide the reset button when the timer is closed
});

const clockIcon = document.getElementById("clockIcon");
clockIcon.addEventListener("click", () => {
  const timerContainer = document.getElementById("timerContainer");
  if (timerContainer.style.display == "none") {
    timerContainer.style.display = "flex";
    clockIcon.style.display = "none";
  } else {
    timerContainer.style.display = "flex";
    clockIcon.style.display = "block";
  }
});
