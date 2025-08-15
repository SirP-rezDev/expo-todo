// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let todos = [];

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/todos", (req, res) => {
  if (!req.body.task || req.body.task.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty" });
  }
  todos.push({ task: req.body.task });
  res.json({ message: "Task added successfully", todos });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
