// Updated Mongoose Schema
const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  content: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const TodoSchema = new mongoose.Schema({
  user: { type: String, unique: true, required: true },
  text: [todoItemSchema] // array of todo objects with _id
});

module.exports = mongoose.model('Todo', TodoSchema);
