import createClockIcon from "./ClockIcon";
import createTimerContainer from "./TimerContainer";

function handleClockIconClick(appInstance) {
  appInstance.setState({
    ...appInstance.state,
    isTimerOpen: !appInstance.state.isTimerOpen,
  });
}
class TimerApp {
  constructor($timerApp) {
    this.state = {
      isTimerOpen: false,
      timerInterval: null,
      isRunning: false,
      seconds: 0,
      timerText: "00:00:00",
    };

    createTimerContainer($timerApp, this);
    createClockIcon({
      $timerApp,
      onClick: () => handleClockIconClick(this),
      isTimerOpen: this.state.isTimerOpen,
    });

    this.setState = (nextState) => {
      this.state = nextState;
    };

    this.init();
  }

  startPauseTimer() {}

  resetTimer() {}

  closeTimer() {}

  init() {
    try {
      this.setState({
        ...this.state,
      });
    } catch {
    } finally {
    }
  }
}

export default TimerApp;
