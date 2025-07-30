const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  collegeName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});


module.exports = mongoose.model('User', UserSchema);
