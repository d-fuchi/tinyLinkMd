// Define a type for the request object
interface ClipboardRequest {
  type: string;
}

// Define a type for the response object
interface ClipboardResponse {
  data?: string;
  error?: string;
}

chrome.runtime.onMessage.addListener(
  (request: ClipboardRequest, _sender: unknown, sendResponse: (response: ClipboardResponse) => void) => {
    if (request.type === "getClipboardData") {
      console.log("getClipboardDataに来た")
      navigator.clipboard
        .readText()
        .then((text) => sendResponse({ data: text }))
        .catch((err) => sendResponse({ error: err.message }));
      return true; // Will respond asynchronously
    }
  }
);
