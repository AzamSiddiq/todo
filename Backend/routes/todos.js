const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const mongoose = require('mongoose');
router.post('/add-todo', async (req, res) => {
  try {
    const { user, content } = req.body;
    if (!user || !content) return res.status(400).json({ error: 'User and content required' });

    const todoItem = {
      _id: new mongoose.Types.ObjectId(),
      content,
      completed: false
    };

    const existing = await Todo.findOne({ user });

    if (existing) {
      existing.text.push(todoItem);
      await existing.save();
      return res.json(todoItem);
    } else {
      const newTodo = new Todo({ user, text: [todoItem] });
      await newTodo.save();
      console.log(newTodo)
      return res.json(todoItem);
    }
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Error creating todo', details: err.message });
  }
});

router.get('/:username', async (req, res) => {
  try {
    const userData = await Todo.findOne({ user: req.params.username });
    if (!userData) return res.json([]);
    res.json(userData.text);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

router.put('/:username/:todoId', async (req, res) => {
  try {
    const { username, todoId } = req.params;
    const result = await Todo.findOneAndUpdate(
      { user: username },
      { $pull: { text: { _id: todoId } } },
      { new: true }
    );

    if (!result) return res.status(404).json({ error: 'User or todo not found' });
    res.json({ message: 'Todo deleted successfully', todos: result.text });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
});
// // ✅ Update completed status of a todo item by _id
router.put('/toggle-completed', async (req, res) => {
  try {
    const { user, todoId, completed } = req.body;

    if (!user || !todoId) {
      return res.status(400).json({ error: 'User and todoId are required' });
    }

    const updated = await Todo.findOneAndUpdate(
      { user, 'text._id': todoId },
      { $set: { 'text.$.completed': completed } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Todo item not found' });
    }

    res.json({ message: 'Status updated', updated });
  } catch (err) {
    console.error('Error updating completed status:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
