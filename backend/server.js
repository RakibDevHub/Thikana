const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample properties data
const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    description: "Beautiful villa with pool and garden",
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    city: "Miami",
    state: "FL",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348228?w=600"
  },
  {
    id: 2,
    title: "Downtown Apartment",
    description: "Modern apartment in city center",
    price: 350000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    city: "Austin",
    state: "TX",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"
  },
  {
    id: 3,
    title: "Suburban Family Home",
    description: "Perfect for families, great school district",
    price: 450000,
    bedrooms: 4,
    bathrooms: 2.5,
    area: 2400,
    city: "Denver",
    state: "CO",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600"
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Thikana API is running!" });
});

// Get all properties
app.get('/api/properties', (req, res) => {
  res.json(properties);
});

// Get single property
app.get('/api/properties/:id', (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.id));
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});