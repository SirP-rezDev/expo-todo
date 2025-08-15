import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TextInput, Button, FlatList, View } from "react-native";

// Change this to your deployed Vercel API URL after deployment
// Example: "https://your-vercel-project.vercel.app"
const API_URL = "http://localhost:3000";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch todos from server
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add new task to server
  const addTodo = async () => {
    if (task.trim() === "") return;
    try {
      await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      setTask("");
      fetchTodos(); // refresh list after adding
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Load todos when app starts
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>My Todo List</Text>

      <TextInput
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 10,
          padding: 8,
          width: "80%",
          borderRadius: 5,
        }}
      />

      <Button title="Add Task" onPress={addTodo} />

      <View style={{ marginTop: 20, width: "80%" }}>
        <FlatList
          data={todos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 16, paddingVertical: 5 }}>• {item.task}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
