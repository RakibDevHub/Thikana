import Property from "../models/Property.js";
import Settings from "../models/Settings.js";

export const seedProperties = async () => {
  try {
    // Check if properties already exist
    const count = await Property.countDocuments();

    if (count === 0) {
      console.log("🌱 Seeding database with sample properties...");

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
          images: [
            {
              url: "https://images.unsplash.com/photo-1613977257363-707ba9348228?w=600",
            },
          ],
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
          images: [
            {
              url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
            },
          ],
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
          images: [
            {
              url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600",
            },
          ],
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
          images: [
            {
              url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600",
            },
          ],
        },
      ];

      await Property.insertMany(sampleProperties);
      console.log("✅ Sample properties added to database");
    } else {
      console.log(`📊 Database already has ${count} properties`);
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

// Seed Settings
export const seedSettings = async () => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      console.log("🌱 Creating default settings...");

      const defaultSettings = {
        company: {
          name: "Thikana Real Estate",
          email: "info@thikana.com",
          phone: "+880 1712 345678",
          phone2: "+880 1912 345678",
          address: "123 Gulshan Avenue, Dhaka 1212, Bangladesh",
          website: "www.thikana.com",
          logo: null,
          currency: "BDT",
          currencySymbol: "৳",
          itemsPerPage: 12,
          socialMedia: {
            facebook: "https://facebook.com/thikana",
            twitter: "https://twitter.com/thikana",
            instagram: "https://instagram.com/thikana",
            linkedin: "https://linkedin.com/company/thikana",
          },
        },
        businessHours: [
          { id: 1, day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
          { id: 2, day: "Saturday", hours: "10:00 AM - 4:00 PM" },
          { id: 3, day: "Sunday", hours: "Closed" },
        ],
        offices: [
          {
            id: 1,
            city: "Dhaka",
            address: "123 Gulshan Avenue, Dhaka 1212",
            phone: "+880 1712 345678",
            email: "dhaka@thikana.com",
            hours: "Mon-Fri: 9AM-7PM, Sat: 10AM-4PM",
            image: null,
            isHeadquarters: true,
            location: { lat: 23.8103, lng: 90.4125 },
          },
          {
            id: 2,
            city: "Chittagong",
            address: "456 Agrabad Commercial Area, Chattogram",
            phone: "+880 1812 345678",
            email: "ctg@thikana.com",
            hours: "Mon-Fri: 9AM-6PM, Sat: 9AM-2PM",
            image: null,
            isHeadquarters: false,
            location: { lat: 22.3569, lng: 91.7832 },
          },
        ],
        team: [
          {
            id: 1,
            name: "Sarah Mitchell",
            role: "Founder & CEO",
            bio: "Former luxury agent with 15+ years experience",
          },
          {
            id: 2,
            name: "James Wilson",
            role: "Head of Sales",
            bio: "Closed over $100M in transactions",
          },
          {
            id: 3,
            name: "Elena Rodriguez",
            role: "Property Manager",
            bio: "10+ years in property management",
          },
        ],
        faq: [
          {
            id: 1,
            question: "How do I start the process of buying a home?",
            answer:
              "Start by browsing our properties and saving your favorites. Then contact us to schedule viewings.",
          },
          {
            id: 2,
            question: "What are the costs involved in buying a property?",
            answer:
              "Costs include down payment (typically 5-20%), closing costs (2-5% of purchase price), home inspection, and moving expenses.",
          },
          {
            id: 3,
            question: "How long does it take to buy a home?",
            answer:
              "The average home buying process takes 30-45 days from offer acceptance to closing.",
          },
        ],
        statistics: [
          { id: 1, label: "Properties Sold", value: "500+" },
          { id: 2, label: "Happy Clients", value: "1000+" },
          { id: 3, label: "Years Experience", value: "8" },
          { id: 4, label: "Awards Won", value: "15+" },
        ],
      };

      await Settings.create(defaultSettings);
      console.log("✅ Default settings created");
    } else {
      console.log("📊 Settings already exist");
    }
  } catch (error) {
    console.error("❌ Error seeding settings:", error);
  }
};

// Main seed function
export const seedDatabase = async () => {
  console.log("🌱 Starting database seeding...");
  await seedProperties();
  await seedSettings();
  console.log("✅ Database seeding complete");
};
