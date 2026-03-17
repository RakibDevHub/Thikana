import Property from '../models/Property.js';

export const seedDatabase = async () => {
  try {
    // Check if properties already exist
    const count = await Property.countDocuments();
    
    if (count === 0) {
      console.log('🌱 Seeding database with sample properties...');
      
      const sampleProperties = [
        {
          title: "Modern Luxury Villa",
          description: "Beautiful villa with pool and garden in prime location",
          price: 850000,
          bedrooms: 4,
          bathrooms: 3,
          area: 3200,
          propertyType: "villa",
          purpose: "sale",
          status: "available",
          city: "Miami",
          state: "FL",
          address: "123 Palm Street, Miami, FL",
          features: ["Pool", "Garden", "Garage", "Security System"],
          images: [{ url: "https://images.unsplash.com/photo-1613977257363-707ba9348228?w=600" }]
        },
        {
          title: "Downtown Apartment",
          description: "Modern apartment in city center with amazing views",
          price: 350000,
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          propertyType: "apartment",
          purpose: "sale",
          status: "available",
          city: "Austin",
          state: "TX",
          address: "456 Main St, Austin, TX",
          features: ["Gym", "Parking", "Elevator", "Doorman"],
          images: [{ url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600" }]
        },
        {
          title: "Suburban Family Home",
          description: "Perfect for families, great school district",
          price: 450000,
          bedrooms: 4,
          bathrooms: 2.5,
          area: 2400,
          propertyType: "house",
          purpose: "sale",
          status: "available",
          city: "Denver",
          state: "CO",
          address: "789 Oak Avenue, Denver, CO",
          features: ["Backyard", "Garage", "Fireplace", "Basement"],
          images: [{ url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600" }]
        },
        {
          title: "Beachfront Condo",
          description: "Amazing ocean views, direct beach access",
          price: 650000,
          bedrooms: 3,
          bathrooms: 2,
          area: 1800,
          propertyType: "condo",
          purpose: "sale",
          status: "available",
          city: "San Diego",
          state: "CA",
          address: "321 Beach Blvd, San Diego, CA",
          features: ["Beach Access", "Pool", "Fitness Center", "Spa"],
          images: [{ url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600" }]
        }
      ];
      
      await Property.insertMany(sampleProperties);
      console.log('✅ Sample properties added to database');
    } else {
      console.log(`📊 Database already has ${count} properties`);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};