import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';  // Using ES module imports

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;