import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
      >
        <span className="font-semibold text-gray-900 dark:text-white pr-8 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {question}
        </span>
        {isOpen ? (
          <FiChevronUp className="text-xl text-blue-500 shrink-0" />
        ) : (
          <FiChevronDown className="text-xl text-gray-500 shrink-0 group-hover:text-blue-500 transition-colors" />
        )}
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 py-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;