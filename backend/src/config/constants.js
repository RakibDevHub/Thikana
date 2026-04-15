export const SITE_CONFIG = {
  // COMPANY INFO
  company: {
    name: process.env.COMPANY_NAME || "Thikana Real Estate",
    email: process.env.COMPANY_EMAIL || "info@thikana.com",
    phone: process.env.COMPANY_PHONE || "+880 1712 345678",
    address: process.env.COMPANY_ADDRESS || "123 Gulshan Avenue, Dhaka",
    website: process.env.COMPANY_WEBSITE || "www.thikana.com",
  },

  // BUSINESS HOURS
  businessHours: [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  // SOCIAL MEDIA
  socialMedia: {
    facebook: "https://facebook.com/thikana",
    twitter: "https://twitter.com/thikana",
    instagram: "https://instagram.com/thikana",
    linkedin: "https://linkedin.com/company/thikana",
  },

  // STATISTICS
  stats: [
    { value: "500+", label: "Properties Sold", iconName: "FiBriefcase" },
    { value: "1000+", label: "Happy Clients", iconName: "FiUsers" },
    { value: "15+", label: "Awards Won", iconName: "FiAward" },
    { value: "8", label: "Years Experience", iconName: "FiCheckCircle" },
  ],

  // FEATURES (Why Choose Us)
  features: [
    {
      icon: "🏆",
      title: "Trusted Since 2024",
      description:
        "Hundreds of happy clients found their dream homes with us. Our reputation speaks for itself.",
    },
    {
      icon: "🔍",
      title: "Best Selection",
      description:
        "Curated properties in prime locations across the country. Quality over quantity, always.",
    },
    {
      icon: "🤝",
      title: "Expert Guidance",
      description:
        "Professional agents to help you every step of the way. Your success is our priority.",
    },
  ],

  // SERVICES
  services: [
    {
      iconName: "FiDollarSign",
      title: "Valuation Mastery",
      description:
        "Accurate property valuations using market data and expert analysis to ensure you get the best price.",
      color: "from-blue-400 to-blue-500",
    },
    {
      iconName: "FiTrendingUp",
      title: "Strategic Marketing",
      description:
        "Multi-channel marketing campaigns that reach the right buyers through digital and traditional platforms.",
      color: "from-blue-500 to-blue-600",
    },
    {
      iconName: "FiUsers",
      title: "Negotiation Wizardry",
      description:
        "Skilled negotiation to get you the best deal, whether you're buying or selling your property.",
      color: "from-blue-600 to-blue-700",
    },
    {
      iconName: "FiFileText",
      title: "Closing Success",
      description:
        "Hassle-free closing process with expert guidance through all paperwork and legal requirements.",
      color: "from-blue-700 to-blue-800",
    },
  ],

  // CORE VALUES
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

  // TEAM MEMBERS
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

  // CLIENTS / PARTNERS
  clients: [
    { name: "First National Bank", logo: "🏦" },
    { name: "Global Investments Inc", logo: "📊" },
    { name: "Luxury Estates Group", logo: "🏰" },
    { name: "City Development Corp", logo: "🏗️" },
    { name: "Retail Trust Fund", logo: "💰" },
    { name: "International Holdings", logo: "🌍" },
  ],

  // FAQ
  faq: [
    {
      question: "How do I start the process of buying a home?",
      answer:
        "Start by browsing our properties and saving your favorites. Then contact us to schedule viewings. Our agents will guide you through financing options and the entire purchasing process.",
    },
    {
      question: "What are the costs involved in buying a property?",
      answer:
        "Costs include down payment (typically 5-20%), closing costs (2-5% of purchase price), home inspection, appraisal, and moving expenses. We'll provide a detailed breakdown.",
    },
    {
      question: "How long does it take to buy a home?",
      answer:
        "The average home buying process takes 30-45 days from offer acceptance to closing. This includes inspection, appraisal, loan processing, and final paperwork.",
    },
    {
      question: "Do I need a pre-approval before viewing homes?",
      answer:
        "While not always required, getting pre-approved strengthens your position and shows sellers you're a serious buyer. It also helps you understand your budget.",
    },
    {
      question: "Can you help me sell my property?",
      answer:
        "Absolutely! Our comprehensive selling service includes market analysis, professional photography, staging advice, marketing, and negotiation to get you the best price.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We currently serve major metropolitan areas including Miami, Austin, Denver, Seattle, New York, and Los Angeles. Contact us for specific location availability.",
    },
  ],
};