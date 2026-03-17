import Settings from "../models/Settings.js";

// @desc    Get all settings
// @route   GET /api/settings
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // If no settings exist, return 404 - frontend should handle this
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found. Please run database seed.",
      });
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update all settings
// @route   PUT /api/settings
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found. Please run database seed first.",
      });
    }

    // Update each section
    if (req.body.company)
      settings.company = { ...settings.company, ...req.body.company };
    if (req.body.businessHours) settings.businessHours = req.body.businessHours;
    if (req.body.offices) settings.offices = req.body.offices;
    if (req.body.team) settings.team = req.body.team;
    if (req.body.faq) settings.faq = req.body.faq;
    if (req.body.statistics) settings.statistics = req.body.statistics;

    await settings.save();

    res.json({
      success: true,
      data: settings,
      message: "Settings updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update company info
// @route   PUT /api/settings/company
export const updateCompany = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res
        .status(404)
        .json({ success: false, message: "Settings not found" });
    }

    settings.company = { ...settings.company, ...req.body };
    await settings.save();

    res.json({
      success: true,
      data: settings.company,
      message: "Company info updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update business hours
// @route   PUT /api/settings/hours
export const updateBusinessHours = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res
        .status(404)
        .json({ success: false, message: "Settings not found" });
    }

    settings.businessHours = req.body;
    await settings.save();

    res.json({
      success: true,
      data: settings.businessHours,
      message: "Business hours updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update offices
// @route   PUT /api/settings/offices
export const updateOffices = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res
        .status(404)
        .json({ success: false, message: "Settings not found" });
    }

    settings.offices = req.body;
    await settings.save();

    res.json({
      success: true,
      data: settings.offices,
      message: "Offices updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update team members
// @route   PUT /api/settings/team
export const updateTeam = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res
        .status(404)
        .json({ success: false, message: "Settings not found" });
    }

    settings.team = req.body;
    await settings.save();

    res.json({
      success: true,
      data: settings.team,
      message: "Team updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update FAQ
// @route   PUT /api/settings/faq
export const updateFaq = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res
        .status(404)
        .json({ success: false, message: "Settings not found" });
    }

    settings.faq = req.body;
    await settings.save();

    res.json({
      success: true,
      data: settings.faq,
      message: "FAQ updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update statistics
// @route   PUT /api/settings/statistics
export const updateStatistics = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res
        .status(404)
        .json({ success: false, message: "Settings not found" });
    }

    settings.statistics = req.body;
    await settings.save();

    res.json({
      success: true,
      data: settings.statistics,
      message: "Statistics updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reset settings to default (using seed data)
// @route   POST /api/settings/reset
export const resetSettings = async (req, res) => {
  try {
    await Settings.deleteMany({});

    // Re-create using your seed defaults
    const defaultSettings = {
      company: {
        name: "Thikana Real Estate",
        email: "info@thikana.com",
        phone: "+880 1712 345678",
        phone2: "+880 1912 345678",
        address: "123 Gulshan Avenue, Dhaka 1212, Bangladesh",
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

    const settings = await Settings.create(defaultSettings);

    res.json({
      success: true,
      data: settings,
      message: "Settings reset to default",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
