import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/common/PropertyCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    if (filters.type && property.propertyType !== filters.type) return false;
    if (
      filters.city &&
      !property.city.toLowerCase().includes(filters.city.toLowerCase())
    )
      return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice))
      return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice))
      return false;
    return true;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Properties</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-600"
          />

          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-600"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
          </select>

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-600"
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-600"
          />
        </div>
      </div>

      {/* Results */}
      <p className="mb-4 text-gray-600">
        Found {filteredProperties.length} properties
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Properties;
