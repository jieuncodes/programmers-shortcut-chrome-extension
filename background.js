chrome.commands.onCommand.addListener(async (command) => {
  console.log("Command received:", command);
  let scriptToExecute = (command === "run_code") ? "content.js" : (command === "submit_code") ? "submit.js": null;

  let tabs = await chrome.tabs.query({ active: true, currentWindow: true });

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
