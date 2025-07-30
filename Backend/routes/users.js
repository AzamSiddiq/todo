// const express = require('express');
// const bcrypt = require('bcryptjs');
// const router = express.Router();
// const User = require('../models/user');

// // POST /api/users/signup
// router.post('/signup', async (req, res) => {
//   const { name, email, collegeName, username, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       collegeName,
//       username,
//       password: hashedPassword
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     console.error('Signup error:', err);
//     res.status(500).json({ error: 'Signup failed' });
//   }
// });

// // POST /api/users/signin
// router.post('/signin', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Send full user info (excluding password)
//     res.json({
//       username: user.username,
//       name: user.name,
//       email: user.email,
//       collegeName: user.collegeName
//     });

//   } catch (err) {
//     console.error('Signin error:', err);
//     res.status(500).json({ error: 'Signin failed' });
//   }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../services/db/neon');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, collegeName, username, password } = req.body;
  try {
    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      'INSERT INTO users (name, email, college_name, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, collegeName, username, hashedPassword]
    );

    res.status(201).json({ message: 'User created', user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (user.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        collegeName: user.rows[0].college_name,
        username: user.rows[0].username
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Signin failed' });
  }
});


module.exports = router;
