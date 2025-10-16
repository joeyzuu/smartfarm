// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from public
app.use(express.static(path.join(__dirname, "public")));

// CORS configuration: if ALLOWED_ORIGINS is set (comma-separated) only allow those origins.
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : null;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser clients
      if (!allowedOrigins) return callback(null, true); // allow all when not configured
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS origin not allowed"));
    },
  })
);

// Accept larger JSON payloads if needed
app.use(express.json({ limit: "256kb" }));

// Require GEMINI_API_KEY in environment on startup (set this in Render's Environment settings)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error(
    "FATAL: GEMINI_API_KEY environment variable is not set. Please add it to your hosting environment."
  );
  process.exit(1);
}

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
      GEMINI_API_KEY
    )}`;

    // timeout for upstream call
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("Upstream API error", response.status, response.statusText, body);
      return res.status(502).json({ error: "Upstream API error", details: body });
    }

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
    return res.json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err && err.stack ? err.stack : err);
    if (err.name === "AbortError") return res.status(504).json({ error: "Upstream request timed out" });
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// SPA fallback: serve index.html when available, otherwise ai-assistant.html
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  const assistantPath = path.join(__dirname, "public", "ai-assistant.html");
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  if (fs.existsSync(assistantPath)) return res.sendFile(assistantPath);
  return res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT} (port ${PORT})`));
