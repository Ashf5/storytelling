
import { Router } from "express";
import { login, refresh, register } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/verifyToken.js";

export const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

router.get('/', authenticateToken, (req, res) => res.json({msg: 'authorized'}))