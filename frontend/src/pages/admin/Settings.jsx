import React, { useState } from "react";
import {
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiGlobe,
  FiMapPin,
  FiDollarSign,
  FiGrid,
  FiClock,
  FiUsers,
  FiHelpCircle,
  FiAward,
  FiPlus,
  FiTrash2,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [activeSubTab, setActiveSubTab] = useState("company");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ========== PROFILE ==========
  const [profile, setProfile] = useState({
    name: "John Administrator",
    email: "john@thikana.com",
    phone: "+880 1712 345678",
    avatar: null,
  });

  // ========== COMPANY INFO ==========
  const [company, setCompany] = useState({
    name: "Thikana Real Estate",
    email: "info@thikana.com",
    phone: "+880 1712 345678",
    phone2: "+880 1912 345678",
    address: "123 Gulshan Avenue, Dhaka 1212, Bangladesh",
    currency: "BDT",
    currencySymbol: "৳",
    itemsPerPage: 12,
    socialMedia: {
      facebook: "https://facebook.com/thikana",
      twitter: "https://twitter.com/thikana",
      instagram: "https://instagram.com/thikana",
      linkedin: "https://linkedin.com/company/thikana",
    },
  });

  // ========== BUSINESS HOURS ==========
  const [businessHours, setBusinessHours] = useState([
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ]);

  // ========== OFFICE LOCATIONS ==========
  const [offices, setOffices] = useState([
    {
      id: 1,
      city: "Dhaka",
      address: "123 Gulshan Avenue, Dhaka 1212",
      phone: "+880 1712 345678",
      email: "dhaka@thikana.com",
      hours: "Mon-Fri: 9AM-7PM, Sat: 10AM-4PM",
      isHeadquarters: true,
    },
    {
      id: 2,
      city: "Chittagong",
      address: "456 Agrabad Commercial Area, Chattogram",
      phone: "+880 1812 345678",
      email: "ctg@thikana.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 9AM-2PM",
      isHeadquarters: false,
    },
  ]);

  // ========== TEAM MEMBERS ==========
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      bio: "Former luxury agent with 15+ years experience",
      image: null,
    },
    {
      id: 2,
      name: "James Wilson",
      role: "Head of Sales",
      bio: "Closed over $100M in transactions",
      image: null,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Property Manager",
      bio: "10+ years in property management",
      image: null,
    },
  ]);

  // ========== FAQ ==========
  const [faq, setFaq] = useState([
    {
      id: 1,
      question: "How do I start the process of buying a home?",
      answer: "Start by browsing our properties and saving your favorites. Then contact us to schedule viewings.",
    },
    {
      id: 2,
      question: "What are the costs involved in buying a property?",
      answer: "Costs include down payment (typically 5-20%), closing costs (2-5% of purchase price), home inspection, and moving expenses.",
    },
    {
      id: 3,
      question: "How long does it take to buy a home?",
      answer: "The average home buying process takes 30-45 days from offer acceptance to closing.",
    },
  ]);

  // ========== STATISTICS ==========
  const [statistics, setStatistics] = useState([
    { id: 1, label: "Properties Sold", value: "500+" },
    { id: 2, label: "Happy Clients", value: "1000+" },
    { id: 3, label: "Years Experience", value: "8" },
    { id: 4, label: "Awards Won", value: "15+" },
  ]);

  // ========== PASSWORD ==========
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const mainTabs = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "password", label: "Password", icon: <FiLock /> },
    { id: "site", label: "Site Settings", icon: <FiGlobe /> },
  ];

  const siteSubTabs = [
    { id: "company", label: "Company Info", icon: <FiMapPin /> },
    { id: "hours", label: "Business Hours", icon: <FiClock /> },
    { id: "offices", label: "Office Locations", icon: <FiMapPin /> },
    { id: "team", label: "Team Members", icon: <FiUsers /> },
    { id: "faq", label: "FAQ", icon: <FiHelpCircle /> },
    { id: "stats", label: "Statistics", icon: <FiAward /> },
  ];

  // ========== HANDLERS ==========

  // Profile
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Company
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const social = name.split(".")[1];
      setCompany({
        ...company,
        socialMedia: { ...company.socialMedia, [social]: value },
      });
    } else {
      setCompany({ ...company, [name]: value });
    }
  };

  // Business Hours
  const handleHourChange = (index, field, value) => {
    const updated = [...businessHours];
    updated[index][field] = value;
    setBusinessHours(updated);
  };

  const addBusinessHour = () => {
    setBusinessHours([...businessHours, { day: "New Day", hours: "9:00 AM - 5:00 PM" }]);
  };

  const removeBusinessHour = (index) => {
    if (businessHours.length > 1) {
      setBusinessHours(businessHours.filter((_, i) => i !== index));
    }
  };

  // Offices
  const handleOfficeChange = (index, field, value) => {
    const updated = [...offices];
    updated[index][field] = value;
    setOffices(updated);
  };

  const addOffice = () => {
    setOffices([
      ...offices,
      {
        id: Date.now(),
        city: "New Office",
        address: "",
        phone: "",
        email: "",
        hours: "",
        isHeadquarters: false,
      },
    ]);
  };

  const removeOffice = (index) => {
    if (offices.length > 1) {
      setOffices(offices.filter((_, i) => i !== index));
    }
  };

  // Team
  const handleTeamChange = (index, field, value) => {
    const updated = [...team];
    updated[index][field] = value;
    setTeam(updated);
  };

  const addTeamMember = () => {
    setTeam([
      ...team,
      {
        id: Date.now(),
        name: "New Member",
        role: "Role",
        bio: "Bio",
        image: null,
      },
    ]);
  };

  const removeTeamMember = (index) => {
    if (team.length > 1) {
      setTeam(team.filter((_, i) => i !== index));
    }
  };

  // FAQ
  const handleFaqChange = (index, field, value) => {
    const updated = [...faq];
    updated[index][field] = value;
    setFaq(updated);
  };

  const addFaq = () => {
    setFaq([
      ...faq,
      {
        id: Date.now(),
        question: "New Question",
        answer: "New answer",
      },
    ]);
  };

  const removeFaq = (index) => {
    if (faq.length > 1) {
      setFaq(faq.filter((_, i) => i !== index));
    }
  };

  // Statistics
  const handleStatChange = (index, field, value) => {
    const updated = [...statistics];
    updated[index][field] = value;
    setStatistics(updated);
  };

  // Password
  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setErrorMessage("All password fields are required");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setErrorMessage("New passwords don't match");
      return;
    }
    if (passwords.new.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  // Save All
  const handleSaveAll = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("All settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile and website content
        </p>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Main Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-4 text-sm font-medium flex items-center gap-2
                  border-b-2 transition-colors
                  ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold dark:text-white">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PASSWORD TAB */}
          {activeTab === "password" && (
            <div className="space-y-6 max-w-md">
              <h3 className="text-lg font-semibold dark:text-white">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SITE SETTINGS TAB */}
          {activeTab === "site" && (
            <div>
              {/* Sub-tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex flex-wrap gap-2">
                  {siteSubTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id)}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${
                          activeSubTab === tab.id
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Company Info Sub-tab */}
              {activeSubTab === "company" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold dark:text-white">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={company.name}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={company.email}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={company.phone}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Secondary Phone
                      </label>
                      <input
                        type="tel"
                        name="phone2"
                        value={company.phone2}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={company.address}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Currency
                      </label>
                      <select
                        name="currency"
                        value={company.currency}
                        onChange={(e) => {
                          const currency = e.target.value;
                          setCompany({
                            ...company,
                            currency,
                            currencySymbol: currency === "BDT" ? "৳" : "$",
                          });
                        }}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                      >
                        <option value="BDT">BDT (Bangladeshi Taka)</option>
                        <option value="USD">USD (US Dollar)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Items Per Page
                      </label>
                      <select
                        name="itemsPerPage"
                        value={company.itemsPerPage}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                      >
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                      </select>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h4 className="font-medium mb-3 dark:text-white">Social Media Links</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Facebook</label>
                        <input
                          type="url"
                          name="social.facebook"
                          value={company.socialMedia.facebook}
                          onChange={handleCompanyChange}
                          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Twitter</label>
                        <input
                          type="url"
                          name="social.twitter"
                          value={company.socialMedia.twitter}
                          onChange={handleCompanyChange}
                          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Instagram</label>
                        <input
                          type="url"
                          name="social.instagram"
                          value={company.socialMedia.instagram}
                          onChange={handleCompanyChange}
                          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">LinkedIn</label>
                        <input
                          type="url"
                          name="social.linkedin"
                          value={company.socialMedia.linkedin}
                          onChange={handleCompanyChange}
                          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Business Hours Sub-tab */}
              {activeSubTab === "hours" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold dark:text-white">Business Hours</h3>
                    <button
                      onClick={addBusinessHour}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FiPlus size={14} /> Add Day
                    </button>
                  </div>
                  <div className="space-y-3">
                    {businessHours.map((hour, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="text"
                          value={hour.day}
                          onChange={(e) => handleHourChange(index, "day", e.target.value)}
                          className="w-40 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                          placeholder="Day"
                        />
                        <input
                          type="text"
                          value={hour.hours}
                          onChange={(e) => handleHourChange(index, "hours", e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                          placeholder="Hours"
                        />
                        <button
                          onClick={() => removeBusinessHour(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Office Locations Sub-tab */}
              {activeSubTab === "offices" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold dark:text-white">Office Locations</h3>
                    <button
                      onClick={addOffice}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FiPlus size={14} /> Add Office
                    </button>
                  </div>
                  <div className="space-y-4">
                    {offices.map((office, index) => (
                      <div key={office.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <input
                            type="text"
                            value={office.city}
                            onChange={(e) => handleOfficeChange(index, "city", e.target.value)}
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 font-medium"
                            placeholder="City"
                          />
                          <button
                            onClick={() => removeOffice(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={office.address}
                            onChange={(e) => handleOfficeChange(index, "address", e.target.value)}
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Address"
                          />
                          <input
                            type="text"
                            value={office.phone}
                            onChange={(e) => handleOfficeChange(index, "phone", e.target.value)}
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Phone"
                          />
                          <input
                            type="email"
                            value={office.email}
                            onChange={(e) => handleOfficeChange(index, "email", e.target.value)}
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Email"
                          />
                          <input
                            type="text"
                            value={office.hours}
                            onChange={(e) => handleOfficeChange(index, "hours", e.target.value)}
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Hours"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members Sub-tab */}
              {activeSubTab === "team" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold dark:text-white">Team Members</h3>
                    <button
                      onClick={addTeamMember}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FiPlus size={14} /> Add Member
                    </button>
                  </div>
                  <div className="space-y-4">
                    {team.map((member, index) => (
                      <div key={member.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={() => removeTeamMember(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => handleTeamChange(index, "name", e.target.value)}
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Name"
                          />
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => handleTeamChange(index, "role", e.target.value)}
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Role"
                          />
                          <div className="md:col-span-2">
                            <textarea
                              value={member.bio}
                              onChange={(e) => handleTeamChange(index, "bio", e.target.value)}
                              rows="2"
                              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                              placeholder="Bio"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Sub-tab */}
              {activeSubTab === "faq" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold dark:text-white">Frequently Asked Questions</h3>
                    <button
                      onClick={addFaq}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FiPlus size={14} /> Add Question
                    </button>
                  </div>
                  <div className="space-y-4">
                    {faq.map((item, index) => (
                      <div key={item.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={() => removeFaq(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                          className="w-full px-3 py-2 mb-2 border rounded-lg bg-white dark:bg-gray-800"
                          placeholder="Question"
                        />
                        <textarea
                          value={item.answer}
                          onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                          rows="2"
                          className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                          placeholder="Answer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics Sub-tab */}
              {activeSubTab === "stats" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold dark:text-white">Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statistics.map((stat, index) => (
                      <div key={stat.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => handleStatChange(index, "label", e.target.value)}
                          className="w-full px-3 py-2 mb-2 border rounded-lg bg-white dark:bg-gray-800"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => handleStatChange(index, "value", e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                          placeholder="Value"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Save Button (for all tabs) */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-end">
            <button
              onClick={handleSaveAll}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FiSave /> {loading ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;