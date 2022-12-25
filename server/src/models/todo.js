const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

todoSchema.methods.addTodo = () => {};

const Todo = mongoose.model('Todo', todoSchema);
module.exports = { Todo };
