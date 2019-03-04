const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  task_id: [{ type: ObjectId, ref: 'Task' }]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  });

const User = mongoose.model('User', userSchema);

module.exports = User;