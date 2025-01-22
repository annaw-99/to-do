import React from 'react';

function TodoItem({ todo, index, completeTodo, removeTodo }) {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-500';
      case 'low': return 'text-green-500';
      default: return 'text-orange-500';
    }
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <div className="flex items-center justify-between px-4 py-1 mb-3 bg-[#f5f5f7] rounded-md hover:bg-[#ebebeb] transition-colors duration-200">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => completeTodo(index)}
          className="w-3 h-3 rounded-full border-[#000002] text-[#0066cc] focus:ring-[#000002] focus:ring-offset-2"
        />
        <div className="flex flex-col">
          <span className={`${todo.isCompleted ? 'line-through text-[#86868b]' : 'text-[#1d1d1f]'} text-xs`}>
            {todo.text}
          </span>
          <div className="flex gap-2 items-center">
            {todo.dueDate && (
              <span className={`text-[10px] ${isOverdue ? 'text-red-500' : 'text-[#86868b]'}`}>
                Due: {new Date(todo.dueDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            )}
            {todo.priority !== 'normal' && (
              <span className={`text-[10px] ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
            )}
          </div>
        </div>

      </div>
      <button
        onClick={() => removeTodo(index)}
        className="p-2 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-white/50 transition-colors duration-200"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default TodoItem;