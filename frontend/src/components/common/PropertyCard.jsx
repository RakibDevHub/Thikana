import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return '$' + price.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="relative overflow-hidden h-48">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Featured
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{property.title}</h3>
        <p className="text-2xl font-bold text-primary-600 mb-3">
          {formatPrice(property.price)}
        </p>
        
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span className="flex items-center gap-1">🛏️ {property.bedrooms} beds</span>
          <span className="flex items-center gap-1">🛁 {property.bathrooms} baths</span>
          <span className="flex items-center gap-1">📐 {property.area} sqft</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <span className="text-lg">📍</span>
          <span className="ml-1">{property.city}, {property.state}</span>
        </div>
        
        <Link 
          to={`/property/${property.id}`}
          className="block text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;