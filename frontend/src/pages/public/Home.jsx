import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../../components/common/PropertyCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary-600 to-primary-800 text-gray-800 dark:text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            Discover the perfect property for you and your family
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-2 flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter city or location"
              className="flex-1 px-4 py-3 text-gray-800 dark:text-gray-200 bg-transparent rounded-lg focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button className="bg-primary-600 dark:text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Featured Properties
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Why Choose Thikana
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Trusted Since 2024
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hundreds of happy clients found their dream homes with us
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Best Selection
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Curated properties in prime locations across the country
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Expert Guidance
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional agents to help you every step of the way
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
