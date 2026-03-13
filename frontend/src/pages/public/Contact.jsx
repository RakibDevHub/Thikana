import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Thank you for your message! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-600"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-600"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-600"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-600"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
        
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl">📍</div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">123 Real Estate Avenue, New York, NY 10001</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-2xl">📞</div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-2xl">✉️</div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">info@thikana.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-2xl">🕒</div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;