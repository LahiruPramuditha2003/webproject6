import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function load() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    load();
  }

  async function toggle(id, completed) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    load();
  }

  async function remove(id) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div
      style={{ maxWidth: 550, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h1>Web Project6 – Tasks</h1>
      <form onSubmit={addTask} style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: "none" }}>
        {tasks.map((t) => (
          <li
            key={t._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 0",
            }}
          >
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggle(t._id, t.completed)}
            />
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                flex: 1,
              }}
            >
              {t.title}
            </span>
            <button onClick={() => remove(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
