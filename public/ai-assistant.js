// ai-assistant.js
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const actionButtons = document.querySelectorAll(".action-btn");

function addMessage(message, sender = "user") {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // scroll to bottom
}

async function sendMessageToServer(message) {
  addMessage(message, "user");
  userInput.value = "";

  // Show loading message
  const loadingMsg = document.createElement("div");
  loadingMsg.classList.add("bot-message");
  loadingMsg.textContent = "🤖 Thinking...";
  chatBox.appendChild(loadingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("http://localhost:3000/api/chat", {
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
    sendMessageToServer(question);
  });
});
