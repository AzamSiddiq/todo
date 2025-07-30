import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete }) => {
  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TodoList;
