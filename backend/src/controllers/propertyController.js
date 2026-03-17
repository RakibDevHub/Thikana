import Property from '../models/Property.js';

// @desc    Get all properties with filters
// @route   GET /api/properties
export const getProperties = async (req, res) => {
  try {
    const { type, city, minPrice, maxPrice, bedrooms, sortBy } = req.query;
    
    // Build filter object
    const filter = {};
    if (type) filter.propertyType = type;
    if (city) filter.city = new RegExp(city, 'i');
    if (bedrooms) filter.bedrooms = { $gte: parseInt(bedrooms) };
    
    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    
    // Build sort object
    let sort = { createdAt: -1 }; // default: newest first
    if (sortBy === 'price-low') sort = { price: 1 };
    if (sortBy === 'price-high') sort = { price: -1 };
    if (sortBy === 'oldest') sort = { createdAt: 1 };
    
    const properties = await Property.find(filter).sort(sort);
    
    res.json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    // Increment view count
    property.views += 1;
    await property.save();
    
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new property
// @route   POST /api/properties
export const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Search properties
// @route   GET /api/properties/search/:term
export const searchProperties = async (req, res) => {
  try {
    const searchTerm = req.params.term;
    
    const properties = await Property.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { city: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    
    res.json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};