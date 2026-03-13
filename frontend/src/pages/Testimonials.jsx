import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    const mockTestimonials = [
      {
        id: 1,
        clientName: "Sarah Johnson",
        clientLocation: "Miami, FL",
        rating: 5,
        content: "Thikana helped us find our dream home! The process was smooth and their team was incredibly helpful.",
        clientImage: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: 2,
        clientName: "Michael Chen",
        clientLocation: "Austin, TX",
        rating: 5,
        content: "As a first-time home buyer, I was nervous. The team guided me through every step. Highly recommended!",
        clientImage: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 3,
        clientName: "Emily Rodriguez",
        clientLocation: "Denver, CO",
        rating: 4,
        content: "Great selection of properties and very responsive agents. Found our perfect home in just 2 weeks!",
        clientImage: "https://randomuser.me/api/portraits/women/63.jpg"
      }
    ];
    
    setTestimonials(mockTestimonials);
    setLoading(false);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Client Testimonials</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={testimonial.clientImage} 
                alt={testimonial.clientName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{testimonial.clientName}</h3>
                <p className="text-gray-600 text-sm">{testimonial.clientLocation}</p>
              </div>
            </div>
            
            <div className="mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-2xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            
            <p className="text-gray-700 italic">"{testimonial.content}"</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">Share Your Experience</h2>
        <p className="text-gray-600 mb-6">
          Have you worked with us? We'd love to hear about your experience!
        </p>
        <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold">
          Submit Your Testimonial
        </button>
      </div>
    </div>
  );
};

export default Testimonials;