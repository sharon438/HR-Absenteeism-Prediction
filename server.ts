import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // HR Prediction API
  app.post("/api/predict", (req, res) => {
    const {
      age,
      yearsAtCompany,
      monthlyIncome,
      distanceFromHome,
      workSatisfaction,
      healthScore,
      previousAbsences,
      stressLevel,
      overtimeHours
    } = req.body;

    // Simple heuristic-based scoring model (simulating a trained ML model)
    // Weights derived from typical HR absenteeism patterns
    let score = 0;

    // Previous absences is a strong predictor
    score += (previousAbsences || 0) * 0.15;
    
    // Low satisfaction increases risk
    score += (5 - (workSatisfaction || 3)) * 0.1;

    // High stress increases risk
    score += (stressLevel || 5) * 0.08;

    // Poor health increases risk
    score += (100 - (healthScore || 70)) * 0.005;

    // Long commute increases risk
    score += (distanceFromHome || 10) * 0.005;

    // Overtime increases burnout risk
    score += (overtimeHours || 0) * 0.01;

    // Age factor (younger employees sometimes have higher turnover/absenteeism in some datasets)
    if (age < 30) score += 0.1;

    // Threshold for "Likely to be absent"
    // In a real scenario, this would be the output of a sigmoid function in Logistic Regression
    const probability = Math.min(Math.max(score / 5, 0), 1);
    const prediction = probability > 0.5 ? "Yes" : "No";

    res.json({
      prediction,
      probability: Math.round(probability * 100),
      factors: {
        burnoutRisk: stressLevel > 7 || overtimeHours > 20,
        healthRisk: healthScore < 60,
        satisfactionRisk: workSatisfaction < 2
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
