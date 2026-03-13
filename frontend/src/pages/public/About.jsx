import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Thikana</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600" 
            alt="About Us"
            className="rounded-lg shadow-lg"
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Trusted Real Estate Partner</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2024, Thikana has quickly become one of the most trusted names in real estate. 
            We specialize in helping people find their dream homes and investment properties.
          </p>
          <p className="text-gray-600 mb-4">
            Our team of experienced professionals understands that buying or selling a property is 
            one of the most important decisions in your life. That's why we're committed to providing 
            personalized service and expert guidance every step of the way.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-600">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;