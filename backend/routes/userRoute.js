import express from 'express';
const router = express.Router();
import { RegisterUser, LoginUser, CurrentUser ,RegisterAdmin} from '../controllers/userController.js';
import validateToken from '../middlewares/validateTokenHandler.js';
import authorizeRoles from '../middlewares/roleHandles.js';

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', RegisterUser);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', LoginUser);

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 */
router.get('/current', validateToken, CurrentUser);

/**
 * @swagger
 * /api/users/register-admin:
 *   get:
 *     summary: Register an admin user
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: Admin registered successfully
 */
router.get('/register-admin', RegisterAdmin);


export default router;

