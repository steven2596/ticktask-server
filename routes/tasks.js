import express from 'express';

import Task from '../models/taskModel.js';

const router = express.Router();

//Get a list of tasks from database
router.get('/', (req, res) => {
    Task.find({})
        .then(tasks => res.send(tasks))
});

//Add a new task to database
router.post('/', (req, res, next) => {
    //create task data using Task model and req.body data and save to DB
    Task.create(req.body)
        .then(task => res.send(task))
        .catch(next)
});

//Update a task in the database
router.put('/:id', (req, res) => {
    Task.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            Task.findOne({ _id: req.params.id })
                .then(task => res.send(task))
        })
});

//Delete task from database
router.delete('/:id', (req, res) => {
    Task.findByIdAndRemove({ _id: req.params.id })
        .then(task => res.send(task))
});


export default router;