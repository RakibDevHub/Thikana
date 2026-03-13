import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import pattern from "../../assets/images/footer-pattern.svg";

const Footer = () => {
  const location = useLocation();

  const homeLinks = [
    { path: "/#hero", label: "Hero Section" },
    { path: "/#features", label: "Features Properties" },
    { path: "/#why-choose-us", label: "Why Choose Us" },
    { path: "/#testimonials", label: "Testimonials" },
    { path: "/#faq", label: "FAQ's" },
  ];

  const aboutLinks = [
    { path: "/about#story", label: "Our Story" },
    { path: "/about#team", label: "Our Team" },
    { path: "/about#offices", label: "Our Offices" },
    { path: "/about#clients", label: "Our Clients" },
  ];

  const propertiesLinks = [
    { path: "/properties#categories", label: "Categories" },
    { path: "/properties#portfolio", label: "Portfolio" },
    { path: "/properties#works", label: "Our Works" },
    { path: "/properties#management", label: "Property Management" },
  ];

  const servicesLinks = [
    { path: "/services#valuation", label: "Valuation Mastery" },
    { path: "/services#marketing", label: "Strategic Marketing" },
    { path: "/services#negotiation", label: "Negotiation Wizardry" },
    { path: "/services#closing", label: "Closing Success" },
  ];

  const contactLinks = [
    { path: "/contact#form", label: "Contact Form" },
    { path: "/contact#offices", label: "Our Offices" },
    { path: "/services#marketing", label: "Strategic Marketing" },
    { path: "/properties#management", label: "Property Management" },
  ];

  const footerSections = [
    { title: "Home", links: homeLinks },
    { title: "About Us", links: aboutLinks },
    { title: "Properties", links: propertiesLinks },
    { title: "Services", links: servicesLinks },
    { title: "Contact Us", links: contactLinks },
  ];

  return (
    <footer
      className="relative bg-gray-800 dark:bg-gray-950 text-white pt-16 pb-8 transition-colors duration-300 overflow-hidden"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Enhanced Decorative Top Border - Now Visible */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-blue-600 via-blue-400 to-blue-600 shadow-lg shadow-blue-500/50"></div>
      
      {/* Glow effect for the border */}
      <div className="absolute top-0 left-1/4 right-1/4 h-4 bg-blue-500/20 blur-xl"></div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {/* Brand Section - Takes less space */}
          <div className="lg:w-1/4 space-y-6">
            {/* Logo */}
            <Link to="/" className="inline-block group">
              <div className="flex flex-col">
                <div className="flex items-center gap-0">
                  <span className="text-2xl font-black bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                    Thikana
                  </span>
                  <span className="text-blue-500 text-3xl font-black -mt-1.5 group-hover:rotate-12 transition-transform duration-300">
                    .
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.2em] text-gray-500 mt-1">
                  REAL ESTATE
                </span>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed text-sm">
              Your trusted partner in finding the perfect property. We turn
              dreams into addresses with expertise and care.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {[
                { icon: <FaFacebookF />, href: "#", label: "Facebook" },
                { icon: <FaTwitter />, href: "#", label: "Twitter" },
                { icon: <FaInstagram />, href: "#", label: "Instagram" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-700/50 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Contact Badge */}
            <div className="pt-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 text-xl">📞</span>
                </div>
                <div>
                  <p className="text-gray-400">24/7 Support</p>
                  <p className="text-white font-semibold">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections - Takes more space */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-white font-semibold mb-4 text-base relative inline-block">
                    {section.title}
                    <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="text-gray-400 hover:text-white transition-all duration-300 text-sm block py-1 hover:translate-x-1 flex items-center gap-1 group/link"
                        >
                          <FiChevronRight className="text-blue-500 opacity-0 group-hover/link:opacity-100 transition-all text-xs" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Thikana Real Estate. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
      
      {/* Small floating dots */}
      <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-500/20 rounded-full animate-pulse delay-700"></div>
    </footer>
  );
};

export default Footer;