import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, completeTodo, removeTodo }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');

  const filteredTodos = todos.filter(todo => {
    switch(filter) {
      case 'active': return !todo.isCompleted;
      case 'completed': return todo.isCompleted;
      default: return true;
    }
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch(sort) {
      case 'date':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority':
        const priority = { high: 3, normal: 2, low: 1 };
        return priority[b.priority] - priority[a.priority];
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex justify-between mb-4 text-xs">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 rounded-md ${filter === 'all' ? 'bg-[#007AFF] text-white' : 'text-[#86868b]'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-2 py-1 rounded-md ${filter === 'active' ? 'bg-[#007AFF] text-white' : 'text-[#86868b]'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-2 py-1 rounded-md ${filter === 'completed' ? 'bg-[#007AFF] text-white' : 'text-[#86868b]'}`}
          >
            Completed
          </button>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-2 py-1 rounded-md border-0 bg-[#f5f5f7] text-[#86868b] focus:outline-none"
        >
          <option value="default">Default</option>
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="space-y-2">
        {sortedTodos.length === 0 ? (
          <p className="text-center text-xs text-gray-500 py-4">No tasks yet. Add one above!</p>
        ) : (
          sortedTodos.map((todo, index) => (
            <TodoItem
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;