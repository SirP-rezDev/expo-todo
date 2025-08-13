const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const DB_FILE = "data.json";

app.use(cors());
app.use(bodyParser.json());

// Ensure JSON file exists
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]));

// GET all data
app.get("/todos", (req, res) => {
  const todos = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(todos);
});

// POST new data
app.post("/todos", (req, res) => {
  const todos = JSON.parse(fs.readFileSync(DB_FILE));
  todos.push(req.body);
  fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
  res.json({ message: "Task added successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
