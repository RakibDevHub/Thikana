import express from 'express';
import { SITE_CONFIG } from '../config/constants.js';

const router = express.Router();

// Public route - no auth needed
router.get('/site-config', (req, res) => {
  res.json({
    success: true,
    data: SITE_CONFIG
  });
});

export default router;