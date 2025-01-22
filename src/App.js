import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './index.css'; // Ensure this imports your Tailwind styles

function App() {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData) => {
    const newTodos = [...todos, todoData];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-md font-bold text-[#1d1d1f] text-left mb-4">
            To-Do List
          </h1>
          <TodoForm addTodo={addTodo} />
          <TodoList 
            todos={todos} 
            completeTodo={completeTodo} 
            removeTodo={removeTodo} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;