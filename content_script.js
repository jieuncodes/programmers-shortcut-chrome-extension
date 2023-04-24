import TimerApp from "./components/TimerApp.js";

const $timerApp = document.createElement("div");
$timerApp.className = "timerApp";
document.body.appendChild($timerApp);

new TimerApp($timerApp);
