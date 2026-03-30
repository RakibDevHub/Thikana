import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollUtils";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMessageSquare,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import useSettings from "../../hooks/useSettings";

const Contact = () => {
  const location = useLocation();
  const { settings } = useSettings();

  const company = settings?.company || {};
  const offices = settings?.offices || [];
  const businessHours = settings?.businessHours || [];
  const socialMedia = company.socialMedia || {};

  // SOCIAL LINK
  const socialLinks = [
    { key: "facebook", icon: <FaFacebookF />, label: "Facebook" },
    { key: "twitter", icon: <FaTwitter />, label: "Twitter" },
    { key: "instagram", icon: <FaInstagram />, label: "Instagram" },
    { key: "linkedin", icon: <FaLinkedin />, label: "LinkedIn" },
  ];

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        scrollToSection(location.state.scrollTo);
      }, 500);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setLoading(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1000);
  };

  // const offices = [
  //   {
  //     city: "New York",
  //     address: "123 Real Estate Avenue, Manhattan, NY 10001",
  //     phone: "+1 (212) 555-1234",
  //     email: "nyc@thikana.com",
  //     hours: "Mon-Fri: 9AM - 7PM, Sat: 10AM - 4PM",
  //   },
  //   {
  //     city: "Los Angeles",
  //     address: "456 Sunset Boulevard, Beverly Hills, CA 90210",
  //     phone: "+1 (310) 555-5678",
  //     email: "la@thikana.com",
  //     hours: "Mon-Fri: 8AM - 6PM, Sat: 10AM - 3PM",
  //   },
  //   {
  //     city: "Miami",
  //     address: "789 Ocean Drive, Miami Beach, FL 33139",
  //     phone: "+1 (305) 555-9012",
  //     email: "miami@thikana.com",
  //     hours: "Mon-Fri: 9AM - 6PM, Sat: 9AM - 2PM",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section id="form" className="py-16">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Send Us a Message
              </h2>

              {formSubmitted ? (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-8 rounded-xl text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-green-600 dark:text-green-300">
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message <FiSend className="text-lg" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                    <FiPhone className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2 dark:text-white">
                    Call Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    24/7 Support
                  </p>
                  <a
                    href="tel:+15551234567"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {company.phone || "+1 (555) 123-4567"}
                  </a>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                    <FiMail className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2 dark:text-white">
                    Email Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    General Inquiries
                  </p>
                  <a
                    href="mailto:info@thikana.com"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {company.email || "info@thikana.com"}
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div
                id="hours"
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FiClock className="text-2xl text-blue-600" />
                  <h2 className="text-xl font-bold dark:text-white">
                    Business Hours
                  </h2>
                </div>

                <div className="space-y-3">
                  {businessHours.length > 0 ? (
                    businessHours.map((hour) => (
                      <div
                        key={hour.id}
                        className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <span className="text-gray-600 dark:text-gray-400">
                          {hour.day}
                        </span>
                        <span className="font-semibold dark:text-white">
                          {hour.hours}
                        </span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Monday - Friday
                        </span>
                        <span className="font-semibold dark:text-white">
                          9:00 AM - 7:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Saturday
                        </span>
                        <span className="font-semibold dark:text-white">
                          10:00 AM - 4:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          Sunday
                        </span>
                        <span className="font-semibold dark:text-white">
                          Closed
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    <span className="font-bold">24/7 Support:</span> For
                    emergencies, call our hotline anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Offices Section */}
      <section id="offices" className="py-16 bg-white dark:bg-gray-800">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              📍 Our Locations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 dark:text-white">
              Visit Our Offices
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We have offices in major cities to serve you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FiMapPin className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  {office.city}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {office.address}
                </p>
                <div className="space-y-2 mb-4">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
                  >
                    <FiPhone className="text-xs" /> {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
                  >
                    <FiMail className="text-xs" /> {office.email}
                  </a>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiClock className="text-xs" /> {office.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section id="map" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Our Location
            </h2>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <FiMapPin className="text-4xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  Map integration coming soon
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Headquarters: 123 Real Estate Avenue, New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Support Section */}
      <section
        id="support"
        className="py-16 bg-linear-to-r from-blue-600 to-blue-800 text-white"
      >
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            24/7 Customer Support
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Need help right now? Our support team is available around the clock.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              <FiPhone className="text-xl" /> Call Us Now
            </a>
            <a
              href="https://wa.me/15551234567?text=Hello%20Thikana%2C%20I%20need%20assistance%20with%20a%20property"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaWhatsapp className="text-xl" /> WhatsApp Chat
            </a>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Quick response via WhatsApp within minutes
          </p>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Connect With Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Follow us on social media for updates and new properties
          </p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => {
              const link = socialMedia[social.key];

              if (!link) return null;

              return (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
