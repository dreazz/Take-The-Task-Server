const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const taskSchema = new Schema({
  title: String,
  body: String,
  category: String,
  status:{type:String, required:true, default:'todo'},
  owner_id: { type: ObjectId, ref: 'User' }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;