// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files (ai-assistant.html, ai-assistant.js, css, etc.)
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());

// Use environment variable for API key in production; don't hardcode secrets
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "⚠️ GEMINI_API_KEY not set in env. Using fallback value — do NOT commit real keys to repo."
  );
}

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // Use query param key (works for API key) — you may switch to Authorization: Bearer <KEY> if required
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    res.json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fallback: serve ai-assistant.html for unknown routes (SPA-friendly)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ai-assistant.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT} (port ${PORT})`)
);
