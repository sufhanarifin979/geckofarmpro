import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
}