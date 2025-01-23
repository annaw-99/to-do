import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './index.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

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
    <div className="bg-[#f5f5f7] p-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-xl font-semibold text-[#1d1d1f] text-left mb-6">
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