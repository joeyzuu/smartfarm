const API_URL = "/api/chat";

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const predefinedBtns = document.querySelectorAll(".action-btn");

async function sendMessage(message) {
  if (!message.trim()) return;

  appendMessage("user", message);
  userInput.value = "";

  const body = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "No response.";
    appendMessage("bot", reply);
  } catch (err) {
    appendMessage("bot", "⚠️ Error fetching response.");
    console.error(err);
  }
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add(sender === "user" ? "user-message" : "bot-message");
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => sendMessage(userInput.value));
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage(userInput.value);
});

predefinedBtns.forEach((btn) => {
  btn.addEventListener("click", () => sendMessage(btn.dataset.question));
});
