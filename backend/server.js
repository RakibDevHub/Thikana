import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/databse.js';
import propertyRoutes from './src/routes/propertyRoutes.js';
import settingsRoutes from './src/routes/settingsRoutes.js';
import { seedDatabase } from './src/utils/seedData.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to database
await connectDB();

// Seed database with sample data (only if empty)
setTimeout(() => seedDatabase(), 1000);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: "Thikana API is running!",
    version: "1.0.0",
    database: 'connected'
  });
});

app.use('/api/properties', propertyRoutes);
app.use('/api/settings', settingsRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/properties`);
});