import React from 'react';

const SectionHeading = ({ badge, title, description, alignment = 'center' }) => {
  const alignmentClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto'
  };

  return (
    <div className={`max-w-3xl ${alignmentClasses[alignment]} mb-16`}>
      {badge && (
        <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;