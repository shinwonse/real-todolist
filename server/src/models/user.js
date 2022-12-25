const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  toDos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

const User = mongoose.model('User', userSchema);
module.exports = { User };
