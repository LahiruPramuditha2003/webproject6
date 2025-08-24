import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import taskRoutes from "./task.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.send("OK"));
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
