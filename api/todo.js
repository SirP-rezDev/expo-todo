// api/todos.js
let todos = []; // In-memory storage

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return all todos
    res.status(200).json(todos);
  } 
  else if (req.method === "POST") {
    const { task } = req.body;
    if (!task || task.trim() === "") {
      return res.status(400).json({ error: "Task cannot be empty" });
    }
    todos.push({ task });
    res.status(200).json({ message: "Task added successfully", todos });
  } 
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
