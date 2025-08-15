import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TextInput, Button, FlatList, View } from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const API_URL = "https://expo-todo-nine.vercel.app/api/todos";

  // Fetch todos when app loads
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  // Add new task to server
  const addTodo = () => {
    if (task.trim() === "") return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    })
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos); // Update list with server data
        setTask("");
      })
      .catch(err => console.error("Error adding todo:", err));
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
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
          borderRadius: 5
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
