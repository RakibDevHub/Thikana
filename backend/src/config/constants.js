export const SITE_CONFIG = {
  company: {
    name: process.env.COMPANY_NAME || "Thikana Real Estate",
    email: process.env.COMPANY_EMAIL || "info@thikana.com",
    phone: process.env.COMPANY_PHONE || "+880 1712 345678",
    address: process.env.COMPANY_ADDRESS || "123 Gulshan Avenue, Dhaka",
  },

  businessHours: [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  stats: [
    { value: "500+", label: "Properties Sold", iconName: "FiBriefcase" },
    { value: "1000+", label: "Happy Clients", iconName: "FiUsers" },
    { value: "15+", label: "Awards Won", iconName: "FiAward" },
    { value: "8", label: "Years Experience", iconName: "FiCheckCircle" },
  ],

  values: [
    {
      icon: "🤝",
      title: "Integrity First",
      description:
        "We believe in transparent, honest dealings with every client, every time.",
    },
    {
      icon: "⭐",
      title: "Excellence Always",
      description:
        "We strive for excellence in every aspect of our service, no exceptions.",
    },
    {
      icon: "❤️",
      title: "Client-Centered",
      description:
        "Your goals become our goals. We're committed to your success.",
    },
    {
      icon: "🌱",
      title: "Continuous Growth",
      description:
        "We constantly learn, adapt, and improve to serve you better.",
    },
  ],

  team: [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      experience: "15+ years in real estate",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Former luxury agent turned entrepreneur, Sarah founded Thikana with a vision to make property dreams accessible to all.",
    },
    {
      name: "James Wilson",
      role: "Head of Sales",
      experience: "12+ years experience",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "James has closed over $100M in transactions and leads our sales team with passion and expertise.",
    },
    {
      name: "Elena Rodriguez",
      role: "Property Manager",
      experience: "10+ years in management",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      bio: "Elena ensures every property in our portfolio is maintained to the highest standards.",
    },
    {
      name: "Michael Chen",
      role: "Investment Advisor",
      experience: "8+ years consulting",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "Michael specializes in helping investors build wealth through strategic property investments.",
    },
  ],

  clients: [
    { name: "First National Bank", logo: "🏦" },
    { name: "Global Investments Inc", logo: "📊" },
    { name: "Luxury Estates Group", logo: "🏰" },
    { name: "City Development Corp", logo: "🏗️" },
    { name: "Retail Trust Fund", logo: "💰" },
    { name: "International Holdings", logo: "🌍" },
  ],

  faq: [{ question: "How to buy a home?", answer: "..." }],
};
