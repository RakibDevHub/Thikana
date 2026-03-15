import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiStar, FiChevronRight, FiFilter, FiX } from "react-icons/fi";
import TestimonialCard from "../../components/common/TestimonialCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Mock testimonials data - in real app, this would come from API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockTestimonials = [
        {
          id: 1,
          name: "Sarah Johnson",
          location: "Miami, FL",
          role: "First-time Home Buyer",
          rating: 5,
          text: "Thikana made my dream of owning a home come true! Their team guided me through every step, and I couldn't be happier with my new condo. The process was smooth, transparent, and stress-free.",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          date: "2024-02-15",
          featured: true,
        },
        {
          id: 2,
          name: "Michael Chen",
          location: "Austin, TX",
          role: "Real Estate Investor",
          rating: 5,
          text: "As an investor, I need a team that understands the market. Thikana exceeded my expectations and helped me find amazing investment properties. Their market analysis is spot-on.",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          date: "2024-02-10",
          featured: true,
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          location: "Denver, CO",
          role: "Family Home Buyer",
          rating: 4,
          text: "We found our perfect family home through Thikana. The process was smooth, and their agents were incredibly patient with all our questions. Highly recommended!",
          image: "https://randomuser.me/api/portraits/women/63.jpg",
          date: "2024-02-05",
          featured: false,
        },
        {
          id: 4,
          name: "David Thompson",
          location: "Seattle, WA",
          role: "Property Seller",
          rating: 5,
          text: "Sold my property in record time! Thikana's marketing strategy and negotiation skills got me an excellent deal. I couldn't have asked for a better experience.",
          image: "https://randomuser.me/api/portraits/men/75.jpg",
          date: "2024-01-28",
          featured: true,
        },
        {
          id: 5,
          name: "Lisa Anderson",
          location: "Chicago, IL",
          role: "Luxury Home Buyer",
          rating: 5,
          text: "When looking for a luxury property, you need an agency that understands quality. Thikana delivered beyond expectations. Their attention to detail is impressive.",
          image: "https://randomuser.me/api/portraits/women/90.jpg",
          date: "2024-01-20",
          featured: false,
        },
        {
          id: 6,
          name: "Robert Martinez",
          location: "Phoenix, AZ",
          role: "First-time Investor",
          rating: 4,
          text: "As a new investor, I was nervous. The team at Thikana guided me through my first purchase and helped me understand the market. Great experience!",
          image: "https://randomuser.me/api/portraits/men/52.jpg",
          date: "2024-01-15",
          featured: false,
        },
        {
          id: 7,
          name: "Jennifer Walsh",
          location: "Boston, MA",
          role: "Home Seller",
          rating: 5,
          text: "Thikana made selling my home easy. From staging to closing, everything was handled professionally. Got above asking price!",
          image: "https://randomuser.me/api/portraits/women/17.jpg",
          date: "2024-01-08",
          featured: false,
        },
        {
          id: 8,
          name: "William Taylor",
          location: "Portland, OR",
          role: "Property Manager",
          rating: 5,
          text: "Working with Thikana's property management team has been fantastic. They're responsive, professional, and really care about their clients.",
          image: "https://randomuser.me/api/portraits/men/22.jpg",
          date: "2024-01-02",
          featured: true,
        },
        {
          id: 9,
          name: "Amanda Foster",
          location: "Nashville, TN",
          role: "Relocation Buyer",
          rating: 4,
          text: "Moved from out of state and Thikana helped me find the perfect home remotely. The virtual tours and detailed information made all the difference.",
          image: "https://randomuser.me/api/portraits/women/55.jpg",
          date: "2023-12-20",
          featured: false,
        },
      ];
      
      setTestimonials(mockTestimonials);
      setFilteredTestimonials(mockTestimonials);
      setLoading(false);
    }, 800);
  }, []);

  // Filter by rating
  useEffect(() => {
    if (selectedRating === "all") {
      setFilteredTestimonials(testimonials);
    } else {
      const filtered = testimonials.filter(t => t.rating === parseInt(selectedRating));
      setFilteredTestimonials(filtered);
    }
  }, [selectedRating, testimonials]);

  const featuredTestimonials = testimonials.filter(t => t.featured).slice(0, 3);

  const ratingCounts = {
    5: testimonials.filter(t => t.rating === 5).length,
    4: testimonials.filter(t => t.rating === 4).length,
    3: testimonials.filter(t => t.rating === 3).length,
    2: testimonials.filter(t => t.rating === 2).length,
    1: testimonials.filter(t => t.rating === 1).length,
  };

  const averageRating = (
    testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length || 0
  ).toFixed(1);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Client Testimonials
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Real stories from happy homeowners and investors
          </p>
        </div>
      </section>

      {/* Overall Rating Summary */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">
                  Overall Rating
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-bold text-blue-600">
                    {averageRating}
                  </span>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar
                          key={star}
                          className={`text-2xl ${
                            star <= Math.round(averageRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Based on {testimonials.length} reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 max-w-md">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 mb-2">
                    <span className="text-sm w-12">{rating} stars</span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${
                            (ratingCounts[rating] / testimonials.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                      {ratingCounts[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16">
          <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 dark:text-white">
              Featured Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials with Filter */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold dark:text-white">
              All Testimonials
            </h2>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <FiFilter /> Filter by Rating
            </button>

            {/* Rating Filter */}
            <div className={`flex gap-2 ${showFilters ? 'flex-wrap' : 'hidden sm:flex'}`}>
              <button
                onClick={() => setSelectedRating("all")}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedRating === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating.toString())}
                  className={`px-4 py-2 rounded-lg transition flex items-center gap-1 ${
                    selectedRating === rating.toString()
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {rating} <FiStar className="text-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-blue-600">{filteredTestimonials.length}</span> testimonials
          </p>

          {/* Testimonials Grid */}
          {filteredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                No testimonials found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No testimonials match the selected rating
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Testimonial CTA */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Share Your Experience
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Have you worked with us? We'd love to hear about your experience.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 group"
          >
            Submit Your Testimonial
            <FiChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;