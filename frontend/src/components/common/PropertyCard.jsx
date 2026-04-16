import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiMaximize, FiArrowRight } from "react-icons/fi";
import { FaBath, FaBed } from "react-icons/fa";

const PropertyCard = ({ property, variant = "grid" }) => {
  const formatPrice = (price) => {
    return "$" + price.toLocaleString();
  };

  // Get image URL with fallback logic
  const getImageUrl = () => {
    if (property.images && property.images[0]) {
      if (typeof property.images[0] === "object" && property.images[0].url) {
        return property.images[0].url;
      }
      if (typeof property.images[0] === "string") {
        return property.images[0];
      }
    }
    return "/images/property.webp";
  };

  // Grid View
  if (variant === "grid") {
    return (
      <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="h-56 relative overflow-hidden">
          <img
            src={getImageUrl()}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            loading="lazy"
            onError={(e) => {
              e.target.src = "/images/property.webp";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 bg-linear-to-r from-secondary-500 to-secondary-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Featured
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                {formatPrice(property.price)}
              </p>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-1 line-clamp-1">
                {property.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
            <FiMapPin className="text-secondary-500 shrink-0" />
            <span className="text-sm">
              {property.city}, {property.state}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col items-center">
              <FaBed className="text-secondary-500 text-xl mb-1" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {property.bedrooms} Beds
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-r border-gray-100 dark:border-gray-700">
              <FaBath className="text-secondary-500 text-xl mb-1" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {property.bathrooms} Baths
              </span>
            </div>
            <div className="flex flex-col items-center">
              <FiMaximize className="text-secondary-500 text-xl mb-1" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {property.area} sqft
              </span>
            </div>
          </div>

          <Link
            to={`/property/${property.id}`}
            className="mt-4 w-full bg-linear-to-r from-secondary-500 to-secondary-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <span className="abc" >View Details</span>
            <FiMaximize className="group-hover/btn:rotate-90 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row group">
      {/* Image Container */}
      <div className="md:w-1/3 h-48 md:h-62 relative overflow-hidden">
        <img
          src={getImageUrl()}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/images/property.webp";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 bg-linear-to-r from-secondary-500 to-secondary-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Featured
        </div>
      </div>

      {/* Content */}
      <div className="md:w-2/3 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {property.title}
        </h3>
        <p className="text-2xl font-bold text-secondary-600 mb-3">
          {formatPrice(property.price)}
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
          <span className="text-gray-500 dark:text-gray-500 flex items-center gap-1">
            <FiMapPin className="text-secondary-500" /> {property.city},{" "}
            {property.state}
          </span>
          <Link
            to={`/property/${property.id}`}
            className="flex items-center gap-2 bg-linear-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 group/btn"
          >
            <span>View Details</span>
            <FiMaximize className="group-hover/btn:rotate-90 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
