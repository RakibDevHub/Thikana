import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../../components/common/PropertyCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {
  FiSearch,
  FiHome,
  FiUsers,
  FiAward,
  FiMapPin,
  FiArrowRight,
  FiStar,
  FiTrendingUp,
  FiShield,
  FiClock,
} from "react-icons/fi";

import Hero from "../../assets/images/hero.webp";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      window.location.href = `/properties?location=${encodeURIComponent(searchLocation)}`;
    }
  };

  const stats = [
    {
      icon: <FiHome />,
      value: "500+",
      label: "Properties Sold",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <FiUsers />,
      value: "1000+",
      label: "Happy Clients",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <FiAward />,
      value: "15+",
      label: "Awards Won",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <FiMapPin />,
      value: "25+",
      label: "Cities Covered",
      color: "from-blue-400 to-blue-600",
    },
  ];

  const features = [
    {
      icon: "🏆",
      title: "Trusted Since 2024",
      description:
        "Hundreds of happy clients found their dream homes with us. Our reputation speaks for itself.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: "🔍",
      title: "Best Selection",
      description:
        "Curated properties in prime locations across the country. Quality over quantity, always.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: "🤝",
      title: "Expert Guidance",
      description:
        "Professional agents to help you every step of the way. Your success is our priority.",
      color: "from-blue-400 to-blue-600",
    },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950 text-white pt-10 lg:pt-12">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="container max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-fade-in">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium tracking-wide">
                  ✨ REAL ESTATE EXCELLENCE
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Find Your{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-300 via-blue-400 to-blue-500">
                  Dream Home
                </span>
                <br />
                <span className="relative">
                  with Thikana
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-blue-400 to-transparent rounded-full"></span>
                </span>
              </h1>

              <p className="text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover the perfect property for you and your family. We offer
                the best selection of homes in prime locations with unmatched
                expertise.
              </p>

              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="max-w-2xl mx-auto lg:mx-0"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20">
                    <div className="flex-1 relative">
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 text-xl" />
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="Enter city or location"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 text-white placeholder-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                      Search
                      <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-blue-500 border-2 border-white/20"
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-blue-200">
                    +500 happy clients
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FiStar
                        key={i}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-blue-200">5.0 rating</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative">
              <div className="relative z-10">
                {/* Main Image */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-blue-400 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <img
                    src={Hero}
                    alt="Luxury Home"
                    className="relative rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
                  />
                </div>

                {/* Floating Cards */}
                <div className="absolute -bottom-8 -left-8 animate-float">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-2xl backdrop-blur-sm bg-opacity-95">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                        ✓
                      </div>
                      <div>
                        <p className="text-gray-800 dark:text-white font-bold text-lg">
                          250+
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Properties Available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-8 -right-8 animate-float delay-1000">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-2xl backdrop-blur-sm bg-opacity-95">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                        ⭐
                      </div>
                      <div>
                        <p className="text-gray-800 dark:text-white font-bold text-lg">
                          4.9
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Client Rating
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 -right-6 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-blue-400/0 to-blue-600/0 group-hover:from-blue-400/10 group-hover:to-blue-600/10 rounded-2xl blur transition duration-300"></div>
                <div className="relative text-center p-6">
                  <div
                    className={`text-4xl bg-linear-to-r ${stat.color} bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-200 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="features" className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              ✨ Featured Listings
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 dark:text-white">
              Handpicked Properties
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explore our selection of the finest properties in the most
              desirable locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/properties"
              className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold group"
            >
              <span>View All Properties</span>
              <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-32 bg-white dark:bg-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              💎 Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 dark:text-white">
              The Thikana Advantage
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We go above and beyond to ensure you find the perfect property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-700 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-4xl text-white">{feature.icon}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 mt-6 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all"
                  >
                    Learn More
                    <FiArrowRight className="text-lg" />
                  </Link>
                </div>

                {/* Decorative Number */}
                <div className="absolute -bottom-8 -right-8 text-8xl font-bold text-gray-100 dark:text-gray-600 opacity-30 group-hover:opacity-40 transition-opacity">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-linear-to-r from-blue-600 to-blue-800 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Find Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-400">
              Dream Home
            </span>
            ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Let us help you take the first step towards your new property. Our
            experts are ready to assist you.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/properties"
              className="group relative px-10 py-5 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Browse Properties
                <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </Link>

            <Link
              to="/contact"
              className="group px-10 py-5 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <span>Contact Us</span>
              <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
            <div className="flex items-center gap-3 text-white/80">
              <FiShield className="text-2xl" />
              <span>Secure & Trusted</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <FiTrendingUp className="text-2xl" />
              <span>Best Market Rates</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <FiClock className="text-2xl" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
