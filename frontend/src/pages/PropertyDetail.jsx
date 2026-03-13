import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <Link to="/properties" className="text-primary-600 hover:underline">
          Back to Properties
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return '$' + price.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/properties" className="text-primary-600 hover:underline mb-4 inline-block">
        ← Back to Properties
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-96 object-cover"
        />
        
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-3xl font-bold text-primary-600 mb-4">
                {formatPrice(property.price)}
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4 text-gray-600">
                  <span>🛏️ {property.bedrooms} Bedrooms</span>
                  <span>🛁 {property.bathrooms} Bathrooms</span>
                  <span>📐 {property.area} sqft</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <span className="text-lg">📍</span>
                  <span className="ml-1">{property.city}, {property.state}</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{property.description}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Interested in this property?</h3>
              <p className="text-gray-600 mb-4">
                Contact us today for more information or to schedule a viewing.
              </p>
              
              <div className="space-y-3">
                <button className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition font-semibold">
                  📞 Call Now
                </button>
                <button className="w-full border-2 border-primary-600 text-primary-600 px-4 py-3 rounded-lg hover:bg-primary-50 transition font-semibold">
                  ✉️ Email Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;