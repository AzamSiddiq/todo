const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const todoRoutes = require('./routes/todos');
const connectDB = require('./services/db/mongo');
require('dotenv').config();
const app = express();

app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "delete"],
    credentials: true
}));
app.use(express.json());
connectDB()
// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Todo App API!');
});

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
