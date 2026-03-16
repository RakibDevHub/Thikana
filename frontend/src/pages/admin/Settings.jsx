import React, { useState, useRef } from "react";
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
  FiCamera,
  FiImage,
} from "react-icons/fi";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [activeSubTab, setActiveSubTab] = useState("company");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // File input refs
  const profileImageInput = useRef(null);

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
    website: "www.thikana.com",
    currency: "BDT",
    currencySymbol: "৳",
    itemsPerPage: 12,
    logo: null,
  });

  // ========== BUSINESS HOURS ==========
  const [businessHours, setBusinessHours] = useState([
    { id: 1, day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { id: 2, day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { id: 3, day: "Sunday", hours: "Closed" },
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
      image: null,
      isHeadquarters: true,
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

  // ========== IMAGE UPLOAD HANDLERS ==========

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTeamImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedTeam = [...team];
        updatedTeam[index].image = reader.result;
        setTeam(updatedTeam);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOfficeImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedOffices = [...offices];
        updatedOffices[index].image = reader.result;
        setOffices(updatedOffices);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompany({ ...company, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ========== HANDLERS ==========

  // Profile
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Company
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  // Business Hours
  const handleHourChange = (id, field, value) => {
    const updated = businessHours.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setBusinessHours(updated);
  };

  const addBusinessHour = () => {
    const newId = Math.max(...businessHours.map((h) => h.id), 0) + 1;
    setBusinessHours([
      ...businessHours,
      { id: newId, day: "New Day", hours: "9:00 AM - 5:00 PM" },
    ]);
  };

  const removeBusinessHour = (id) => {
    if (businessHours.length > 1) {
      setBusinessHours(businessHours.filter((item) => item.id !== id));
    }
  };

  // Offices
  const handleOfficeChange = (id, field, value) => {
    const updated = offices.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setOffices(updated);
  };

  const addOffice = () => {
    const newId = Math.max(...offices.map((o) => o.id), 0) + 1;
    setOffices([
      ...offices,
      {
        id: newId,
        city: "New Office",
        address: "",
        phone: "",
        email: "",
        hours: "",
        image: null,
        isHeadquarters: false,
      },
    ]);
  };

  const removeOffice = (id) => {
    if (offices.length > 1) {
      setOffices(offices.filter((item) => item.id !== id));
    }
  };

  // Team
  const handleTeamChange = (id, field, value) => {
    const updated = team.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setTeam(updated);
  };

  const addTeamMember = () => {
    const newId = Math.max(...team.map((t) => t.id), 0) + 1;
    setTeam([
      ...team,
      {
        id: newId,
        name: "New Member",
        role: "Role",
        bio: "Bio",
        image: null,
      },
    ]);
  };

  const removeTeamMember = (id) => {
    if (team.length > 1) {
      setTeam(team.filter((item) => item.id !== id));
    }
  };

  // FAQ
  const handleFaqChange = (id, field, value) => {
    const updated = faq.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setFaq(updated);
  };

  const addFaq = () => {
    const newId = Math.max(...faq.map((f) => f.id), 0) + 1;
    setFaq([
      ...faq,
      {
        id: newId,
        question: "New Question",
        answer: "New answer",
      },
    ]);
  };

  const removeFaq = (id) => {
    if (faq.length > 1) {
      setFaq(faq.filter((item) => item.id !== id));
    }
  };

  // Statistics
  const handleStatChange = (id, field, value) => {
    const updated = statistics.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
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
              <h3 className="text-lg font-semibold dark:text-white">
                Profile Information
              </h3>

              {/* Profile Image Upload */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      profile.name.charAt(0)
                    )}
                  </div>
                  <button
                    onClick={() => profileImageInput.current.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition border-2 border-white dark:border-gray-800"
                  >
                    <FiCamera size={14} />
                  </button>
                  <input
                    type="file"
                    ref={profileImageInput}
                    onChange={handleProfileImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Upload a profile photo (JPG, PNG, max 2MB)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Recommended: Square image, at least 200x200px
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value="••••••••"
                      disabled
                      className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500"
                    />
                    <button
                      onClick={() => {
                        /* Handle password change */
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      Change
                    </button>
                  </div>
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
                  <h3 className="text-lg font-semibold dark:text-white">
                    Company Information
                  </h3>

                  {/* Company Logo */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiImage size={30} />
                        )}
                      </div>
                      <button
                        onClick={() =>
                          document.getElementById("company-logo-upload").click()
                        }
                        className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 border-2 border-white dark:border-gray-800"
                      >
                        <FiCamera size={10} />
                      </button>
                      <input
                        id="company-logo-upload"
                        type="file"
                        onChange={handleCompanyLogoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Company logo (appears in header/footer)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
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
                </div>
              )}

              {/* Business Hours Sub-tab */}
              {activeSubTab === "hours" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold dark:text-white">
                      Business Hours
                    </h3>
                    <button
                      onClick={addBusinessHour}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FiPlus size={14} /> Add Day
                    </button>
                  </div>
                  <div className="space-y-3">
                    {businessHours.map((hour) => (
                      <div
                        key={hour.id}
                        className="flex items-center gap-3 group"
                      >
                        <input
                          type="text"
                          value={hour.day}
                          onChange={(e) =>
                            handleHourChange(hour.id, "day", e.target.value)
                          }
                          className="w-40 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                          placeholder="Day"
                        />
                        <input
                          type="text"
                          value={hour.hours}
                          onChange={(e) =>
                            handleHourChange(hour.id, "hours", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
                          placeholder="Hours"
                        />
                        <button
                          onClick={() => removeBusinessHour(hour.id)}
                          className="p-2 text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove"
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
                    <h3 className="text-lg font-semibold dark:text-white">
                      Office Locations
                    </h3>
                    <button
                      onClick={addOffice}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FiPlus size={14} /> Add Office
                    </button>
                  </div>
                  <div className="space-y-4">
                    {offices.map((office) => (
                      <div
                        key={office.id}
                        className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg relative"
                      >
                        {/* Delete button - top right corner */}
                        <button
                          onClick={() => removeOffice(office.id)}
                          className="absolute top-1 right-1 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                          title="Remove Office"
                        >
                          <FiTrash2 size={18} />
                        </button>
                        <div className="flex items-end gap-4 mb-4">
                          {/* Office Image */}
                          <div className="relative">
                            <div className="w-20 h-20 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                              {office.image ? (
                                <img
                                  src={office.image}
                                  alt={office.city}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FiImage size={24} />
                              )}
                            </div>
                            <button
                              onClick={() =>
                                document
                                  .getElementById(`office-image-${office.id}`)
                                  .click()
                              }
                              className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 border-2 border-white dark:border-gray-800"
                            >
                              <FiCamera size={10} />
                            </button>
                            <input
                              id={`office-image-${office.id}`}
                              type="file"
                              onChange={(e) =>
                                handleOfficeImageUpload(
                                  offices.findIndex((o) => o.id === office.id),
                                  e,
                                )
                              }
                              accept="image/*"
                              className="hidden"
                            />
                          </div>

                          <div className="flex-1">
                            <input
                              type="text"
                              value={office.city}
                              onChange={(e) =>
                                handleOfficeChange(
                                  office.id,
                                  "city",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 font-medium"
                              placeholder="City"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={office.address}
                            onChange={(e) =>
                              handleOfficeChange(
                                office.id,
                                "address",
                                e.target.value,
                              )
                            }
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Address"
                          />
                          <input
                            type="text"
                            value={office.phone}
                            onChange={(e) =>
                              handleOfficeChange(
                                office.id,
                                "phone",
                                e.target.value,
                              )
                            }
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Phone"
                          />
                          <input
                            type="email"
                            value={office.email}
                            onChange={(e) =>
                              handleOfficeChange(
                                office.id,
                                "email",
                                e.target.value,
                              )
                            }
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Email"
                          />
                          <input
                            type="text"
                            value={office.hours}
                            onChange={(e) =>
                              handleOfficeChange(
                                office.id,
                                "hours",
                                e.target.value,
                              )
                            }
                            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            placeholder="Hours"
                          />
                        </div>

                        <div className="mt-3">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={office.isHeadquarters}
                              onChange={(e) =>
                                handleOfficeChange(
                                  office.id,
                                  "isHeadquarters",
                                  e.target.checked,
                                )
                              }
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              This is the headquarters
                            </span>
                          </label>
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
                    <h3 className="text-lg font-semibold dark:text-white">
                      Team Members
                    </h3>
                    <button
                      onClick={addTeamMember}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FiPlus size={14} /> Add Member
                    </button>
                  </div>
                  <div className="space-y-4">
                    {team.map((member, index) => (
                      <div
                        key={member.id}
                        className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg relative"
                      >
                        {/* Delete button - top right corner */}
                        <button
                          onClick={() => removeTeamMember(member.id)}
                          className="absolute top-1 right-1 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                          title="Remove Member"
                        >
                          <FiTrash2 size={18} />
                        </button>
                        <div className="flex items-end gap-4 mb-4">
                          {/* Member Image */}
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                member.name.charAt(0)
                              )}
                            </div>
                            <button
                              onClick={() =>
                                document
                                  .getElementById(`team-image-${member.id}`)
                                  .click()
                              }
                              className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 border-2 border-white dark:border-gray-800"
                            >
                              <FiCamera size={10} />
                            </button>
                            <input
                              id={`team-image-${member.id}`}
                              type="file"
                              onChange={(e) => handleTeamImageUpload(index, e)}
                              accept="image/*"
                              className="hidden"
                            />
                          </div>

                          <div className="flex-1 flex flex-row gap-3">
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) =>
                                handleTeamChange(
                                  member.id,
                                  "name",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 font-medium"
                              placeholder="Name"
                            />
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) =>
                                handleTeamChange(
                                  member.id,
                                  "role",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                              placeholder="Role"
                            />
                          </div>
                        </div>

                        <textarea
                          value={member.bio}
                          onChange={(e) =>
                            handleTeamChange(member.id, "bio", e.target.value)
                          }
                          rows="2"
                          className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                          placeholder="Bio"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Sub-tab */}
              {activeSubTab === "faq" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold dark:text-white">
                      Frequently Asked Questions
                    </h3>
                    <button
                      onClick={addFaq}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FiPlus size={14} /> Add Question
                    </button>
                  </div>
                  <div className="space-y-4">
                    {faq.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 dark:bg-gray-900 p-4 my-8  rounded-lg relative"
                      >
                        <button
                          onClick={() => removeFaq(item.id)}
                          className="absolute -top-3.75 -right-3.75 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                          title="Remove Question"
                        >
                          <FiTrash2 size={18} />
                        </button>
                          <input
                            type="text"
                            value={item.question}
                            onChange={(e) =>
                              handleFaqChange(
                                item.id,
                                "question",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 mb-3"
                            placeholder="Question"
                          />
                        <textarea
                          value={item.answer}
                          onChange={(e) =>
                            handleFaqChange(item.id, "answer", e.target.value)
                          }
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
                  <h3 className="text-lg font-semibold dark:text-white">
                    Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statistics.map((stat) => (
                      <div
                        key={stat.id}
                        className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                      >
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) =>
                            handleStatChange(stat.id, "label", e.target.value)
                          }
                          className="w-full px-3 py-2 mb-2 border rounded-lg bg-white dark:bg-gray-800"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) =>
                            handleStatChange(stat.id, "value", e.target.value)
                          }
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

        {/* Save Button */}
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
