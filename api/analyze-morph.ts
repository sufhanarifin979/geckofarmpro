import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  // pastikan hanya POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = req.body?.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
  config: {
    systemInstruction: `
Kamu adalah pakar genetika reptil profesional (Herpeticulture Geneticist) spesialis Leopard Gecko.

TUGAS:
Buat laporan intelijen breeder tingkat tinggi, strategis, dan tajam.

GAYA WAJIB:
- Bahasa Indonesia
- Analitis, bukan penjelasan akademik dasar
- Tidak boleh menjelaskan Punnett square atau teori sekolah
- Fokus pada insight breeder, bukan kalkulasi textbook
- Gunakan istilah: lineage, outcross, holdback, F1, F2, selective breeding

FORMAT WAJIB:

### 1. ANALISIS STRATEGI BREEDER
### 2. POTENSI GENETIK & HOLD BACK
### 3. PENGEMBANGAN PROYEK MASA DEPAN
### 4. ANALISIS KOMERSIAL & PASAR
### 5. PERINGATAN KRITIS & RISIKO

ATURAN:
- setiap morph harus Bold (**contoh**)
- tidak boleh menjelaskan langkah matematika genetika
- tidak boleh tabel Punnett square
- langsung ke interpretasi breeder level
`
  }
});