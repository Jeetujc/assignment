import express from 'express';
const router = express.Router();
import { RegisterUser, LoginUser, CurrentUser } from '../controllers/userController.js';
import validateToken from '../middlewares/validateTokenHandler.js';

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/current', validateToken, CurrentUser);

export default router;

