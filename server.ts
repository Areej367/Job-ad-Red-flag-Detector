import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// In development within AI Studio sandbox, nginx proxies port 8080 -> 3000 (DEFAULT_APP_PORT).
// In deployed Cloud Run or production containers, the server MUST listen on process.env.PORT (typically 8080).
const isAiStudioSandbox = Boolean(process.env.DEFAULT_APP_PORT && process.env.CONTROL_PLANE_PORT);
const PORT = isAiStudioSandbox
  ? parseInt(process.env.DEFAULT_APP_PORT || "3000", 10)
  : (process.env.PORT ? parseInt(process.env.PORT, 10) : 3000);

app.use(express.json({ limit: "15mb" }));

import analyzeJobHandler from "./api/analyze-job.js";
import healthHandler from "./api/health.js";

// API routes FIRST
app.all(["/api/analyze-job", "/api/analyze-job/"], analyzeJobHandler);
app.all(["/api/health", "/api/health/"], healthHandler);

// Any unmatched /api route returns JSON error, preventing HTML 404 page
app.all("/api/*", (req, res) => {
  res.status(404).json({
    error: `API route ${req.method} ${req.path} not found on this server.`,
  });
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global unhandled error handler middleware - always returns JSON, never HTML
  app.use(
    (
      err: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error("Unhandled server error:", err);
      const status = typeof err.status === "number" ? err.status : 500;
      res.status(status).json({
        error: err.message || "Internal server error occurred.",
      });
    }
  );

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
