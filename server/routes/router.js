
import { Router } from "express";
import { login, refresh, register } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/verifyToken.js";
import { createStory, deleteStory, getAuthoredAndContrib, getAuthorsStories, getStories, updateStory } from "../controllers/storyController.js";
import { addContributor, deleteContributor, getContributors } from "../controllers/contributorController.js";

export const router = Router();

// auth endpoints
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// story endpoints
router.get('/stories', authenticateToken, getStories);
router.get('/stories/me', authenticateToken, getAuthorsStories);
router.post('/stories', authenticateToken, createStory);
router.patch('/stories/:id', authenticateToken, updateStory);
router.delete('/stories/:id', authenticateToken, deleteStory);
router.get('/stories/permission', authenticateToken, getAuthoredAndContrib);

// contributor endpoints
router.post('/contributors', authenticateToken, addContributor); 
router.get('/contributors/:story_id', authenticateToken, getContributors);
router.delete('/contributors/:id', authenticateToken, deleteContributor);

