export default function createClockIcon({ $timerApp, onClick, isTimerOpen }) {
  const clockIcon = document.createElement("div");
  clockIcon.id = "clockIcon";
  clockIcon.innerHTML = "&#x23f1;";
  clockIcon.classList.add("clockIcon");

  const tooltip = document.createElement("span");
  tooltip.id = "tooltip";
  tooltip.innerText = "타이머를 셋팅합니다";
  tooltip.classList.add("tooltip");
  clockIcon.appendChild(tooltip);

  function toggleClockIcon(isOpen) {
    if (isOpen) {
      clockIcon.classList.add("hidden");
    } else {
      clockIcon.classList.remove("hidden");
    }
  }
  toggleClockIcon(isTimerOpen);

  clockIcon.addEventListener("click", () => {
    onClick();
    toggleClockIcon(!isTimerOpen);
  });

  $timerApp.appendChild(clockIcon);
}
