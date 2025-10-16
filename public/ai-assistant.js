// ai-assistant.js
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const actionButtons = document.querySelectorAll(".action-btn");

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[s];
  });
}

function markdownToHtml(md) {
  if (!md) return "";
  // escape incoming text first to avoid XSS
  let text = escapeHtml(md);

  // code blocks ```...```
  text = text.replace(/```([\s\S]*?)```/g, (m, p1) =>
    `<pre><code>${p1.replace(/</g, "&lt;")}</code></pre>`
  );

  // inline code `code`
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

  // headers
  text = text.replace(/^###### (.*)$/gm, "<h6>$1</h6>");
  text = text.replace(/^##### (.*)$/gm, "<h5>$1</h5>");
  text = text.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
  text = text.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  text = text.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // bold and italic
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/(^|[^*])\*([^*][\s\S]*?)\*(?!\*)/g, "$1<em>$2</em>");

  // unordered lists (consecutive - or * lines)
  text = text.replace(/(^((?:[-*] .+\n?)+))/gm, (m, p1) => {
    const items = p1.trim().split(/\n+/).map((l) => l.replace(/^[-*] /, "").trim());
    return "<ul>" + items.map((i) => `<li>${i}</li>`).join("") + "</ul>\n";
  });

  // ordered lists (consecutive 1. 2. lines)
  text = text.replace(/(^((?:\d+\. .+\n?)+))/gm, (m, p1) => {
    const items = p1.trim().split(/\n+/).map((l) => l.replace(/^\d+\. /, "").trim());
    return "<ol>" + items.map((i) => `<li>${i}</li>`).join("") + "</ol>\n";
  });

  // paragraphs: split on double newlines, but don't wrap already-block HTML
  const blocks = text.split(/\n{2,}/).map((block) => {
    const t = block.trim();
    if (!t) return "";
    if (/^<(h[1-6]|ul|ol|pre|blockquote)/i.test(t)) return t;
    return `<p>${t.replace(/\n/g, "<br>")}</p>`;
  });

  return blocks.join("\n");
}

function addMessage(message, sender = "user") {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

  if (sender === "bot") {
    // convert reply text (Markdown-like) into sanitized HTML for presentation
    msgDiv.innerHTML = markdownToHtml(message);
  } else {
    // user messages remain plain text
    msgDiv.textContent = message;
  }

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // scroll to bottom
}

async function sendMessageToServer(message) {
  addMessage(message, "user");
  userInput.value = "";

  // Show loading message
  const loadingMsg = document.createElement("div");
  loadingMsg.classList.add("bot-message");
  loadingMsg.innerHTML = "<em>🤖 Thinking...</em>";
  chatBox.appendChild(loadingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    // Use relative API path so requests go to the same origin when deployed
    const API_URL = '/api/chat';
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message }),
    });

    const data = await response.json();
    loadingMsg.remove();

    if (data.reply) {
      addMessage(data.reply, "bot");
    } else {
      addMessage("⚠️ Error: No reply from AI.", "bot");
    }
  } catch (err) {
    loadingMsg.remove();
    addMessage("❌ Network error. Please try again.", "bot");
    console.error(err);
  }
}

sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) sendMessageToServer(message);
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// Handle predefined action buttons
actionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const question = btn.dataset.question;
    if (!question) return;
    // populate the input for user visibility
    if (userInput) {
      userInput.value = question;
      userInput.focus();
    }
  });
});
