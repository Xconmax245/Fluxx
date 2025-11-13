// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Replace with your Gemini / OpenRouter API key
const API_KEY = "AIzaSyDR_Q4TbXsTVeN1uUdmcIUiOhhgpgMnv5U";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "qwen/qwen3-coder:free",
        messages,
      }),
    });

    const data = await response.json();
    console.log("AI Response:", JSON.stringify(data, null, 2));

    // ✅ Extract AI response properly
    const aiText = data.results?.[0]?.message?.content || "⚠️ No response from AI.";
    res.json({ text: aiText });

  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).json({ text: "⚠️ Error fetching AI response." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
