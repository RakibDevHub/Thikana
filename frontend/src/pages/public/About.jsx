import React from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiAward,
  FiCheckCircle,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";
import useSiteConfig from "../../hooks/useSiteConfig";

export const iconMap = {
  FiBriefcase: <FiBriefcase />,
  FiUsers: <FiUsers />,
  FiAward: <FiAward />,
  FiCheckCircle: <FiCheckCircle />
};

const About = () => {
  const { config } = useSiteConfig();

  const stats = config?.stats || [];
  const values = config?.values || [];
  const team = config?.team || [];
  const clients = config?.clients || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Thikana</h1>
          <p className="text-xl text-blue-100">
            Your trusted partner in real estate, turning dreams into addresses
            since 2016.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-700">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="text-3xl text-blue-600 mb-3 flex justify-center">
                  {stat.iconName && iconMap[stat.iconName] ? iconMap[stat.iconName] : <FiCheckCircle />}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4 inline-block">
                📖 Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                From Dream to Reality
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Founded in 2016, Thikana began with a simple mission: to make
                  the property journey transparent, enjoyable, and successful
                  for every client. What started as a small team of passionate
                  agents has grown into a trusted real estate platform serving
                  thousands.
                </p>
                <p>
                  Over the years, we've helped over 500 families find their
                  dream homes and assisted countless investors in building their
                  portfolios. Our growth comes from one thing: putting our
                  clients first, always.
                </p>
                <p>
                  Today, we're proud to be one of the most trusted names in real
                  estate, with offices in major cities and a team of dedicated
                  professionals ready to serve you.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link
                  to="/properties"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Browse Properties <FiArrowRight />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600"
                alt="Office"
                className="rounded-2xl shadow-lg h-64 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://blocks.astratic.com/img/general-img-landscape.png";
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                alt="Team Meeting"
                className="rounded-2xl shadow-lg h-64 object-cover mt-8"
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://blocks.astratic.com/img/general-img-landscape.png";
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"
                alt="Handshake"
                className="rounded-2xl shadow-lg h-64 object-cover col-span-2"
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://blocks.astratic.com/img/general-img-landscape.png";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section id="values" className="py-20 bg-white dark:bg-gray-800">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4 inline-block">
              💎 Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              What Drives Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our core principles guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-20">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4 inline-block">
              👥 Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Meet the Experts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Dedicated professionals committed to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://blocks.astratic.com/img/user-img-big.png";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {member.experience}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section id="clients" className="py-20 bg-white dark:bg-gray-800">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4 inline-block">
              🤝 Our Clients
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Trusted By Industry Leaders
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We're proud to work with amazing organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center hover:shadow-lg transition group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition">
                  {client.logo}
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's start your property journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Browse Properties <FiArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
