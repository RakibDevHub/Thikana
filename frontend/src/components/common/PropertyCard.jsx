import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiMaximize } from "react-icons/fi";
import { FaBath, FaBed } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return "$" + price.toLocaleString();
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <img
          loading="lazy"
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Featured Badge */}
        <div className="absolute top-4 right-4 bg-linear-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Featured
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price and Title */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(property.price)}
            </p>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-1 line-clamp-1">
              {property.title}
            </h3>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
          <FiMapPin className="text-blue-500 shrink-0" />
          <span className="text-sm">
            {property.city}, {property.state}
          </span>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col items-center">
            <FaBed className="text-blue-500 text-xl mb-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {property.bedrooms} Beds
            </span>
          </div>
          <div className="flex flex-col items-center border-l border-r border-gray-100 dark:border-gray-700">
            <FaBath className="text-blue-500 text-xl mb-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {property.bathrooms} Baths
            </span>
          </div>
          <div className="flex flex-col items-center">
            <FiMaximize className="text-blue-500 text-xl mb-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {property.area} sqft
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/property/${property.id}`}
          className="mt-4 w-full bg-linear-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          <span>View Details</span>
          <FiMaximize className="group-hover/btn:rotate-90 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
