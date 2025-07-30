import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const TodoPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User:", user);

    if (user?.username) {
      axios
        .get(`http://localhost:5000/api/todos/${user.username}`)
        .then(res => {
          console.log("Fetched todos:", res.data);
          setTodos(res.data);
        })
        .catch(err => console.error('Fetch error:', err));
    }
  }, [user]); // 👈 Important: Add 'user' to the dependency array


const toggleCompleted = async (todoId, currentStatus) => {
  try {
    await axios.put('http://localhost:5000/api/todos/toggle-completed', {
      user: user.username,
      todoId,
      completed: !currentStatus
    });
    // Reload updated todos
    const updated = await axios.get(`http://localhost:5000/api/todos/${user.username}`);
    setTodos(updated.data);
  } catch (err) {
    console.error('Toggle error:', err);
  }
};




  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post('http://localhost:5000/api/todos/add-todo', {
        user: user.username,
        content: text
      });

      // Refresh the entire list after adding
      const updated = await axios.get(`http://localhost:5000/api/todos/${user.username}`);
      setTodos(updated.data);
      setText('');
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${user.username}/${todoId}`);
      const updated = await axios.get(`http://localhost:5000/api/todos/${user.username}`);
      setTodos(updated.data);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
        <div className="space-y-2 text-gray-700 text-sm">
          <p><span className="font-medium">Name:</span> {user?.name}</p>
          <p><span className="font-medium">Email:</span> {user?.email}</p>
          <p><span className="font-medium">Username:</span> {user?.username}</p>
          <p><span className="font-medium">College:</span> {user?.collegeName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6">My Todos</h2>

        {/* Add Todo */}
        <div className="flex mb-6">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add a todo"
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="ml-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map(todo => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo._id, todo.completed)}
              />

              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.content}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </main>
    </div>
  );
};

export default TodoPage;
