import expressAsyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";

export const createTask = expressAsyncHandler(async (req, res) => {
    const { title, description ,id} = req.body;
    if (!title || !description || !id) {
        res.status(400);
        throw new Error('Title and description are required');
    }
    const task = await Task.create({
        title,
        description,
        id
    });
    if (!task) {
        res.status(400);
        throw new Error('Task creation failed');
    }
    res.status(201).json(task);
});

export const getTasks = expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
});

export const updateTask = expressAsyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }
    if (task.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Forbidden: You do not have access to update this task');
    }
    task.title = title || task.title;
    task.description = description || task.description;
    const updatedTask = await task.save();
    res.json(updatedTask);
});
