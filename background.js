function executeCommand(command) {
  console.log("command", command);
  debugger;
  let scriptToExecute =
    command === "run_code"
      ? "content.js"
      : command === "submit_answer"
      ? "submit.js"
      : null;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length) {
      const url = tabs[0].url;
      if (url && url.startsWith("https://school.programmers.co.kr")) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: [scriptToExecute],
        });
      }
    }
  });
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "run_code") {
    executeCommand("run_code");
  } else if (command === "submit_answer") {
    executeCommand("submit_answer");
  }
});
