// TodoList.js
import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/todos/");
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleToggleCompleted = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/todos/${id}`,
        {
          completed: !todos.find((todo) => todo.id === id).completed,
        }
      );
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={handleToggleCompleted}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
