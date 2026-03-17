import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties
} from '../controllers/propertyController.js';

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/search/:term', searchProperties);
router.get('/:id', getPropertyById);

// Admin routes (we'll add auth middleware later)
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;