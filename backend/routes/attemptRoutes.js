import express from 'express';
import {
  submitAttempt,
  selfRateAttempt,
  getDashboardStats,
  getHistory
} from '../controllers/attemptController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/submit', protect, submitAttempt);
router.patch('/rate', protect, selfRateAttempt);
router.get('/dashboard', protect, getDashboardStats);
router.get('/history', protect, getHistory);

export default router;