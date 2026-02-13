import express from 'express';
const router = express.Router();
import { createTask, updateTask, getTasks } from '../controllers/taskController.js';
import validateToken from '../middlewares/validateTokenHandler.js';
import authorizeRoles from '../middlewares/roleHandles.js';


/**
 * @swagger
 * /api/task/assign-task:
 *   post:
 *     summary: Assign a new task to a user (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               assignedTo:
 *                 type: string
 *             example:
 *               title: "Complete project documentation"
 *               description: "Finalize and submit the project documentation by end of the week."
 *               dueDate: "2024-07-01T17:00:00Z"
 *               assignedTo: "60d0fe4f5311236168a109ca"
 *     responses:
 *       201:
 *         description: Task created successfully
 */

router.post('/assign-task', validateToken, authorizeRoles('admin'), createTask);

/**
 * @swagger
 * /api/task/update-task/{id}:
 *   post:
 *     summary: Update an existing task (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ["pending", "in-progress", "completed"]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               assignedTo:
 *                 type: string
 *             example:
 *               title: "Update project documentation"
 *               description: "Revise and update the project documentation based on feedback."
 *               status: "in-progress"
 *               dueDate: "2024-07-05T17:00:00Z"
 *               assignedTo: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Task updated successfully
 */


router.post('/update-task/:id', validateToken, authorizeRoles('admin'), updateTask);

/**
 * @swagger
 * /api/task/tasks:
 *   get:
 *     summary: Get all tasks (Admin and User)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.get('/tasks', validateToken, authorizeRoles('admin', 'user'), getTasks);

export default router;
