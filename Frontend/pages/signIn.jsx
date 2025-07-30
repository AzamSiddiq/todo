import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
     e.preventDefault(); //This prevents the page from refreshing
     console.log("enter")
    try {
      const res = await fetch('http://localhost:5000/api/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();  

      if (!res.ok) {
        alert(data.error || 'Login failed');
        return;
      }
      console.log("jhgfhgy")
      login(data.user); // assuming { user: { id, username, name, ... } }
      navigate('/todo');
    } catch (err) {
      alert('Error connecting to server');
      console.error(err);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In</h2>

      <form onSubmit={(e) => handleLogin(e)}>
        <div style={{ marginBottom: '15px' }}>
          <label>Username</label>
          <input
            type="text"
            required
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          Login
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <span>Don't have an account?</span><br />
        <button
          onClick={() => navigate('/signup')}
          style={{
            background: 'none',
            border: 'none',
            color: '#007BFF',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          Go to Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
