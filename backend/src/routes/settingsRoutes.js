import express from 'express';
import {
  getSettings,
  updateSettings,
  updateCompany,
  updateBusinessHours,
  updateOffices,
  updateTeam,
  updateFaq,
  updateStatistics,
  resetSettings
} from '../controllers/settingsController.js';
// import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route (no auth needed for frontend to read settings)
router.get('/', getSettings);

// // Protected routes (admin only)
// router.put('/', protect, authorize('super_admin'), updateSettings);
// router.put('/company', protect, authorize('super_admin'), updateCompany);
// router.put('/hours', protect, authorize('super_admin'), updateBusinessHours);
// router.put('/offices', protect, authorize('super_admin'), updateOffices);
// router.put('/team', protect, authorize('super_admin'), updateTeam);
// router.put('/faq', protect, authorize('super_admin'), updateFaq);
// router.put('/statistics', protect, authorize('super_admin'), updateStatistics);
// router.post('/reset', protect, authorize('super_admin'), resetSettings);

// Temporarily remove auth protection until we implement it
router.put('/', updateSettings);
router.put('/company', updateCompany);
router.put('/hours', updateBusinessHours);
router.put('/offices', updateOffices);
router.put('/team', updateTeam);
router.put('/faq', updateFaq);
router.put('/statistics', updateStatistics);
router.post('/reset', resetSettings);

export default router;