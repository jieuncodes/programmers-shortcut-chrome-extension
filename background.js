chrome.commands.onCommand.addListener(async (command) => {
  console.log("Command received:", command);
  if (command === "run_code") {
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs.length) {
      const url = tabs[0].url;
      console.log("URL:", url);
      if (url && url.startsWith("https://school.programmers.co.kr")) {
        console.log("Executing content script");
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        });
      }
    }
  }
});
