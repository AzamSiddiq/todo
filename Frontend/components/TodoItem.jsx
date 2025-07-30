import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete }) => {
  const [checked, setChecked] = useState(false);

  return (
    <li className="flex items-center justify-between bg-gray-100 p-3 rounded shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <span className={`text-gray-800 ${checked ? 'line-through text-gray-500' : ''}`}>
          {todo.text} 
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 font-semibold"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
