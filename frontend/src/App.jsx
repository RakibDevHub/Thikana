import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from your backend
    fetch('http://localhost:5000/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching:', err);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    return '$' + price.toLocaleString();
  };

  if (loading) return <div className="loading">Loading properties...</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>🏠 Thikana Real Estate</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Find Your Dream Home</h2>
          <p>Discover the perfect property for you and your family</p>
        </section>

        <section className="properties">
          <h2>Featured Properties</h2>
          <div className="property-grid">
            {properties.map(property => (
              <div key={property.id} className="property-card">
                <img src={property.image} alt={property.title} />
                <h3>{property.title}</h3>
                <p className="price">{formatPrice(property.price)}</p>
                <p>📍 {property.city}, {property.state}</p>
                <p>🛏️ {property.bedrooms} beds • 🛁 {property.bathrooms} baths • 📐 {property.area} sqft</p>
                <button>View Details</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;