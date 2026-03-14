import React from 'react';
import { FiStar } from 'react-icons/fi';

const TestimonialCard = ({ testimonial = {} }) => {
  const {
    name = "",
    location = "",
    rating = 0,
    text = "",
    image = null,
    role = "",
  } = testimonial;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`text-lg ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic flex-1">
        "{text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        {/* Avatar */}
        <div className="relative shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white truncate">{name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{role} • {location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;