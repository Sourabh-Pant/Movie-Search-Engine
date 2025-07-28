import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// 🔥 Add this route
router.get('/me', verifyToken, (req, res) => {
  res.json(req.user);
});

export default router;
