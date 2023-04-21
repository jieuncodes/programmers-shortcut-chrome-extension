chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      if (command === 'run_code') {
        runCode(tabs[0].id);
      } else if (command === 'submit_code') {
        submitAnswer(tabs[0].id);
      }
    }
  });
});

function runCode(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['runCode.js']
  });
}

function submitAnswer(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['submitAnswer.js']
  });
}
