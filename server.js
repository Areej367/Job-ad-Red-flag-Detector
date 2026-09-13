// server.ts
import express from "express";
import path from "path";
import dotenv from "dotenv";

// api/analyze-job.ts
import { GoogleGenAI, Type } from "@google/genai";
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in your environment.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
async function handler(req, res) {
  if (res.setHeader) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  if (req.method === "OPTIONS") {
    if (res.status) return res.status(200).end();
    res.statusCode = 200;
    return res.end();
  }
  const sendJson = (statusCode, data) => {
    if (res.status && res.json) {
      return res.status(statusCode).json(data);
    }
    res.statusCode = statusCode;
    if (res.setHeader) {
      res.setHeader("Content-Type", "application/json");
    }
    return res.end(JSON.stringify(data));
  };
  if (req.method !== "POST") {
    return sendJson(405, { error: "Method not allowed. Please use POST." });
  }
  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
      }
    }
    body = body || {};
    const { jobText, image } = body;
    const hasText = typeof jobText === "string" && jobText.trim().length > 0;
    const hasImage = image && typeof image.base64 === "string" && image.base64.length > 0;
    if (!hasText && !hasImage) {
      return sendJson(400, {
        error: "Please paste a job posting or upload an ad poster/image to analyze."
      });
    }
    if (hasText && !hasImage && jobText.trim().length < 15) {
      return sendJson(400, {
        error: "The provided job text is too brief to analyze. Please paste the full job posting description."
      });
    }
    const ai = getGeminiClient();
    const systemPrompt = `You are a certified employment fraud and job scam prevention analyst specifically focused on the Pakistani job market.
Your job is to thoroughly analyze the provided job posting (which may be provided as text, an image/poster/flyer of the job ad, or both) and determine if it shows signs of fraud, scam, identity theft, exploitation, or if it appears legitimate.
If an image or poster is provided, examine all visible text, design cues, phone numbers (e.g. WhatsApp numbers), company logos, salary claims, and conditions thoroughly.

Pakistani job market scam indicators to look for:
1. Upfront Payment / Fee Requests: Asking for registration fees, training fees, courier charges, badge fees, or security deposits (especially asking for payment via JazzCash, EasyPaisa, Nayapay, SadaPay, or Raast). Legitimate employers never ask applicants to pay to work.
2. Unrealistic Salaries / Effort-to-Pay Mismatch: Offering PKR 70,000 to PKR 250,000+ per month for unskilled simple tasks (e.g. data entry, SMS sending, captcha typing, ad watching, WhatsApp forwarding) with "no experience required".
3. Vague Company Identity: No verified company name, no registered physical office address in Pakistan (e.g. Karachi, Lahore, Islamabad/Rawalpindi), no official website, or impersonating famous multinationals with a free Gmail/Yahoo email.
4. WhatsApp / Telegram Only Contact: Asking candidates to contact only a personal WhatsApp number (+92 3xx...) or Telegram group, without an official company email address (@companyname.com) or official career portal.
5. Premature Sensitive Data Requests: Asking for clear CNIC (Computerized National Identity Card) front/back photos, parent's CNIC, bank account login/PIN, or ATM card photos before any interview or verified contract.
6. Urgency & Pressure Tactics: "Urgent hiring today", "Only 2 seats left", "Hurry up contact now", "Guaranteed daily payout".
7. Chat-Only "Interviews": Promising hiring immediately over WhatsApp chat or Telegram without a phone call, video call, or physical in-office interview.
8. Poor Professional Quality: Excessive emojis (\u{1F525}\u{1F4B0}\u{1F4B5}), erratic capitalization, broken English or Urdu romanization, generic copy-pasted templates.

Legitimate signals (green flags) to check:
1. Professional company domain email (e.g. careers@company.com) or ATS link (LinkedIn, Rozee.pk, Indeed).
2. Verifiable company name and physical office location in Pakistan.
3. Realistic, market-aligned job requirements, skills, qualifications, and compensation.
4. Transparent multi-stage interview process mentioned (e.g. HR screening, technical evaluation, manager round).
5. Standard employment benefits noted (e.g. EOBI, provident fund, health insurance, leave policy).

Risk Classification:
- "high": Clear scam indicators (upfront fees, CNIC theft, WhatsApp-only SMS typing jobs, fake company).
- "medium": Suspicious claims, lacks verifiable company details, ambiguous requirements, or potential exploitation/unpaid trial traps.
- "low": Professional, authentic job advertisement with standard recruitment practices.

Provide:
- risk_level: "low" | "medium" | "high"
- red_flags: Array of objects with "flag" (short title) and "why" (contextual explanation of why it's a concern in Pakistan). If none, empty array.
- green_flags: Array of strings representing legitimate, reassuring signals found. If none, empty array.
- verdict: A crisp 1-2 sentence plain-language verdict summary.`;
    const userParts = [];
    if (hasImage) {
      userParts.push({
        inlineData: {
          mimeType: image.mimeType || "image/jpeg",
          data: image.base64
        }
      });
    }
    if (hasText) {
      userParts.push({
        text: `Job posting details / text:

${jobText.trim()}`
      });
    } else {
      userParts.push({
        text: `Please analyze this attached Pakistani job advertisement poster / flyer image. Carefully read all visible text, headers, contact numbers, salary figures, and requirements to determine if it is a scam or legitimate opportunity.`
      });
    }
    const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let response = null;
    let lastError = null;
    for (const model of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: [
            {
              role: "user",
              parts: userParts
            }
          ],
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                risk_level: {
                  type: Type.STRING,
                  enum: ["low", "medium", "high"],
                  description: "Overall scam risk level of the job posting"
                },
                red_flags: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      flag: {
                        type: Type.STRING,
                        description: "Title of the red flag (e.g., 'Upfront Registration Fee Requested')"
                      },
                      why: {
                        type: Type.STRING,
                        description: "Clear explanation why this is a warning sign in Pakistan"
                      }
                    },
                    required: ["flag", "why"]
                  },
                  description: "List of warning signs and suspicious patterns"
                },
                green_flags: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING
                  },
                  description: "List of legitimate or reassuring elements in the job posting"
                },
                verdict: {
                  type: Type.STRING,
                  description: "1-2 sentence plain-language summary of the overall assessment"
                }
              },
              required: ["risk_level", "red_flags", "green_flags", "verdict"]
            }
          }
        });
        if (response?.text) break;
      } catch (err) {
        console.warn(`Model ${model} call failed, trying fallback if available:`, err?.message || err);
        lastError = err;
      }
    }
    if (!response || !response.text) {
      throw lastError || new Error("No response received from AI model.");
    }
    const responseText = response.text;
    const parsedData = JSON.parse(responseText);
    return sendJson(200, parsedData);
  } catch (error) {
    console.error("Error analyzing job ad:", error?.message || error);
    const errorMessage = error?.message?.includes("GEMINI_API_KEY") ? "Gemini API key is not configured. Please add GEMINI_API_KEY in your Vercel Project Environment Variables." : "Failed to analyze the job posting. The AI service may be temporarily busy. Please retry in a moment.";
    return sendJson(500, { error: errorMessage });
  }
}

// api/health.ts
function handler2(_req, res) {
  if (res.setHeader) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
  }
  if (res.status && res.json) {
    return res.status(200).json({ status: "ok" });
  }
  res.statusCode = 200;
  return res.end(JSON.stringify({ status: "ok" }));
}

// server.ts
dotenv.config();
var app = express();
var isAiStudioSandbox = Boolean(process.env.DEFAULT_APP_PORT && process.env.CONTROL_PLANE_PORT);
var PORT = isAiStudioSandbox ? parseInt(process.env.DEFAULT_APP_PORT || "3000", 10) : process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.use(express.json({ limit: "15mb" }));
app.all(["/api/analyze-job", "/api/analyze-job/"], handler);
app.all(["/api/health", "/api/health/"], handler2);
app.all("/api/*", (req, res) => {
  res.status(404).json({
    error: `API route ${req.method} ${req.path} not found on this server.`
  });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.use(
    (err, _req, res, _next) => {
      console.error("Unhandled server error:", err);
      const status = typeof err.status === "number" ? err.status : 500;
      res.status(status).json({
        error: err.message || "Internal server error occurred."
      });
    }
  );
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.js.map
