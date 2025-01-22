import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo({
      text: value,
      dueDate: dueDate ? dueDate + 'T00:00:00' : '',
      priority,
      isCompleted: false
    });
    setValue('');
    setDueDate('');
    setPriority('normal');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2 text-xs">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a new reminder..."
            className="flex-1 px-4 py-3 text-xs rounded-md border-0 bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#007AFF] placeholder-[#86868b]"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-2 rounded-md border-0 bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 rounded-md border-0 bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2 text-xs bg-[#007AFF] text-white rounded-md hover:bg-[#0256ac] transition-colors duration-200"
          >
            Add
          </button>
        </div>
    </form>
  );
}

export default TodoForm;