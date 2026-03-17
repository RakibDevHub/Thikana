import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropertyCard from "../../components/common/PropertyCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiChevronDown,
  FiGrid,
  FiList,
  FiMapPin,
  FiHome,
  FiMaximize,
  FiDollarSign,
  FiArrowRight,
} from "react-icons/fi";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    sortBy: "newest",
  });

  const location = useLocation();

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locationParam = params.get("location");
    if (locationParam) {
      setFilters((prev) => ({ ...prev, location: locationParam }));
    }
  }, [location]);

  // Fetch properties
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((response) => {
        // Check if response has data array
        if (response.success && Array.isArray(response.data)) {
          setProperties(response.data);
          setFilteredProperties(response.data);
        } else {
          console.error("Unexpected API response:", response);
          setProperties([]);
          setFilteredProperties([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setProperties([]);
        setFilteredProperties([]);
        setLoading(false);
      });
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    let result = [...properties];

    if (filters.location) {
      result = result.filter(
        (p) =>
          p.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.state.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    if (filters.propertyType) {
      result = result.filter((p) => p.propertyType === filters.propertyType);
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= parseInt(filters.maxPrice));
    }

    if (filters.bedrooms) {
      result = result.filter((p) => p.bedrooms >= parseInt(filters.bedrooms));
    }

    if (filters.bathrooms) {
      result = result.filter((p) => p.bathrooms >= parseInt(filters.bathrooms));
    }

    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    setFilteredProperties(result);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      sortBy: "newest",
    });
  };

  const propertyTypes = [
    { value: "", label: "All Types" },
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "villa", label: "Villa" },
    { value: "townhouse", label: "Townhouse" },
    { value: "land", label: "Land" },
    { value: "commercial", label: "Commercial" },
  ];

  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
  ];

  const bathroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Properties</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Discover your perfect property from our extensive collection
          </p>
        </div>
      </section>

      <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full mb-6 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-between"
        >
          <span className="flex items-center gap-2 font-semibold">
            <FiFilter /> Filters & Sorting
          </span>
          <FiChevronDown
            className={`text-xl transition-transform ${showFilters ? "rotate-180" : ""}`}
          />
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`
            lg:w-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit sticky top-28 
            ${showFilters ? "block" : "hidden lg:block"}
          `}
          >
            {/* filter sidebar content */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                <FiFilter className="text-blue-600" /> Filters
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center gap-1"
              >
                <FiX /> Clear
              </button>
            </div>

            {/* Location Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City or state"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type
              </label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-full pl-8 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-full pl-8 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bedrooms
                </label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {bedroomOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bathrooms
                </label>
                <select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {bathroomOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Summary */}
            {(filters.location ||
              filters.propertyType ||
              filters.minPrice ||
              filters.maxPrice ||
              filters.bedrooms ||
              filters.bathrooms) && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Active Filters:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filters.location && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm flex items-center gap-1">
                      📍 {filters.location}
                    </span>
                  )}
                  {filters.propertyType && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                      🏠{" "}
                      {
                        propertyTypes.find(
                          (t) => t.value === filters.propertyType,
                        )?.label
                      }
                    </span>
                  )}
                  {(filters.minPrice || filters.maxPrice) && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                      💰 {filters.minPrice && `$${filters.minPrice}`}
                      {filters.minPrice && filters.maxPrice && " - "}
                      {filters.maxPrice && `$${filters.maxPrice}`}
                    </span>
                  )}
                  {filters.bedrooms && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                      🛏️ {filters.bedrooms}+ beds
                    </span>
                  )}
                  {filters.bathrooms && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                      🛁 {filters.bathrooms}+ baths
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Properties Grid/List */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {filteredProperties.length}
                  </span>{" "}
                  properties found
                </p>

                <div className="flex items-center gap-4">
                  <select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "grid"
                          ? "bg-blue-600 text-white"
                          : "text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      }`}
                    >
                      <FiGrid />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "list"
                          ? "bg-blue-600 text-white"
                          : "text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      }`}
                    >
                      <FiList />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Display */}
            {filteredProperties.length > 0 ? (
              <div
                className={`
                ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              `}
              >
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {viewMode === "grid" ? (
                      <PropertyCard property={property} />
                    ) : (
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-62 relative">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {property.title}
                          </h3>
                          <p className="text-2xl font-bold text-blue-600 mb-3">
                            ${property.price.toLocaleString()}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {property.description ||
                              "Beautiful property in prime location with amazing features."}
                          </p>
                          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                            <span className="flex items-center gap-1">
                              🛏️ {property.bedrooms} beds
                            </span>
                            <span className="flex items-center gap-1">
                              🛁 {property.bathrooms} baths
                            </span>
                            <span className="flex items-center gap-1">
                              📐 {property.area} sqft
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-500">
                              📍 {property.city}, {property.state}
                            </span>
                            <Link
                              to={`/property/${property.id}`}
                              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                              View Details <FiArrowRight />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-2xl font-bold dark:text-white mb-2">
                  No Properties Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Property Categories Section */}
        <section
          id="categories"
          className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              📋 Property Types
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 dark:text-white">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find properties based on your preferred type
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { type: "House", icon: "🏠", count: "24" },
              { type: "Apartment", icon: "🏢", count: "18" },
              { type: "Condo", icon: "🏙️", count: "15" },
              { type: "Villa", icon: "🏡", count: "12" },
              { type: "Townhouse", icon: "🏘️", count: "8" },
              { type: "Land", icon: "🌲", count: "6" },
              { type: "Commercial", icon: "🏬", count: "10" },
              { type: "Luxury", icon: "👑", count: "7" },
            ].map((category) => (
              <button
                key={category.type}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    propertyType: category.type.toLowerCase(),
                  }))
                }
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {category.type}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.count} properties
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section
          id="portfolio"
          className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              🖼️ Our Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Some of our best work and successful projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-2xl shadow-lg h-64"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    item === 1
                      ? "1613977257363-707ba9348228"
                      : item === 2
                        ? "1545324418-cc1a3fa10c00"
                        : "1568605114967-8130f3a36994"
                  }?w=600`}
                  alt={`Project ${item}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold">
                      Luxury{" "}
                      {item === 1
                        ? "Villa"
                        : item === 2
                          ? "Apartment"
                          : "Family Home"}
                    </h3>
                    <p className="text-gray-200 text-sm">Completed 2024</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Works Section */}
        <section
          id="works"
          className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              ⚙️ How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 dark:text-white">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A seamless experience from search to closing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Search",
                desc: "Find properties that match your criteria",
              },
              {
                step: "02",
                title: "View",
                desc: "Schedule visits to your shortlisted properties",
              },
              {
                step: "03",
                title: "Negotiate",
                desc: "Get the best price with our expert negotiators",
              },
              {
                step: "04",
                title: "Close",
                desc: "Smooth closing process with full support",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md relative overflow-hidden group hover:shadow-xl transition"
              >
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full"></div>
                <span className="text-4xl font-bold text-blue-200 dark:text-blue-800/30 mb-4 block">
                  #{item.step}
                </span>
                <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Property Management Section */}
        <section
          id="management"
          className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-700 mb-16"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4 inline-block">
                🔑 Property Management
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
                Full-Service Property Management
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Let us handle the day-to-day operations of your investment
                properties. From tenant screening to maintenance, we've got you
                covered.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Tenant screening and placement",
                  "24/7 maintenance support",
                  "Rent collection and financial reporting",
                  "Regular property inspections",
                  "Legal compliance and documentation",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Get Management Quote
                <FiArrowRight />
              </Link>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600"
                alt="Property Management"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Properties;
