import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    collegeName: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Signup failed');
      return;
    }

    alert('User registered!');
    navigate('/signin');
  } catch (err) {
    alert('Error connecting to server');
    console.error(err);
  }
};

  return (
    <div style={{
      maxWidth: '500px',
      margin: '50px auto',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>College Name</label>
          <input
            type="text"
            value={form.collegeName}
            onChange={e => setForm({ ...form, collegeName: e.target.value })}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Username</label>
          <input
            type="text"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
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
          Sign Up
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <span>Already have an account?</span><br />
        <button
          onClick={() => navigate('/signin')}
          style={{
            background: 'none',
            border: 'none',
            color: '#007BFF',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
