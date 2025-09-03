
import { Router } from "express";
import { login, refresh, register } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/verifyToken.js";
import { getAuthorsStories, getStories } from "../controllers/storyController.js";

export const router = Router();

// auth endpoints
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// story endpoints
router.get('/stories', authenticateToken, getStories);
router.get('/stories/me', authenticateToken, getAuthorsStories);


// test endpoints
router.get('/', authenticateToken, (req, res) => res.json({msg: 'authorized'}))