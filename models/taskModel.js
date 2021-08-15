import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title: {
        type: String
    },
    details: {
        type: String,
        default: ''
    },
    priority: {
        type: Number,
        default: 3
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('task', taskSchema);

export default Task;