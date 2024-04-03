// TodoList.js
import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get("http://localhost:8080/api/v1/todos/"); // Replace with your API endpoint
      console.log(response.data);
      setTodos(response.data);
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/todos/${id}`); // Replace with your API endpoint
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleCompleted = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    todoToUpdate.completed = !todoToUpdate.completed;
    await axios.put(`http://localhost:8080/api/v1/todos/${id}`, todoToUpdate); // Replace with your API endpoint
    setTodos([...todos]);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggleCompleted={handleToggleCompleted}
        />
      ))}
    </ul>
  );
};

export default TodoList;
