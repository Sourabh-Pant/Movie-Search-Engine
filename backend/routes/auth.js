import express from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser
} from '../controllers/authController.js';

import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// 🔐 Auth Routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// 🔐 Persistent Login Route
router.get('/me', verifyToken, getCurrentUser); // ✅ Now using controller, not inline function

export default router;
