import { Router } from "express";
import { Task } from "./task.model.js";

const router = Router();

// Create
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({ title: req.body.title });
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Read (all)
router.get("/", async (_req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: "Not found" });
    res.json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
