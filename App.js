import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TextInput, Button, FlatList } from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from server
  const loadTodos = async () => {
    const res = await fetch("http://10.245.94.253:3000/todos"); // change to your PC's IP
    const data = await res.json();
    setTodos(data);
  };

  // Add new task
  const addTodo = async () => {
    await fetch("http://10.245.94.253:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    setTask("");
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Add Task" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>- {item.task}</Text>}
      />
    </SafeAreaView>
  );
}
