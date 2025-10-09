import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: "You are a smart farming assistant. Give crop, irrigation, and fertilizer advice." },
    { role: "user", content: "thank you" }
  ]
});
console.log(completion.choices[0].message.content);