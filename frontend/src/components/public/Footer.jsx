import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { scrollToSection } from "../../utils/scrollUtils";
import pattern from "../../assets/images/footer-pattern.svg";
import useSettings from "../../hooks/useSettings";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const company = settings?.company || {};
  const socialMedia = company.socialMedia || {};
  const offices = settings?.offices || [];

  // SOCIAL LINK
  const socialLinks = [
    { key: "facebook", icon: <FaFacebookF />, label: "Facebook" },
    { key: "twitter", icon: <FaTwitter />, label: "Twitter" },
    { key: "instagram", icon: <FaInstagram />, label: "Instagram" },
    { key: "linkedin", icon: <FaLinkedin />, label: "LinkedIn" },
  ];

  // HOME LINKS
  const homeLinks = [
    { id: "hero", label: "Hero Section", sectionTitle: "Home" },
    { id: "features", label: "Featured Properties", sectionTitle: "Home" },
    { id: "why-choose-us", label: "Why Choose Us", sectionTitle: "Home" },
    { id: "services", label: "Our Services", sectionTitle: "Home" },
    { id: "how-it-works", label: "How It Works", sectionTitle: "Home" },
    { id: "testimonials", label: "Testimonials", sectionTitle: "Home" },
    { id: "faq", label: "FAQ's", sectionTitle: "Home" },
  ];

  // PROPERTIES LINKS
  const propertiesLinks = [
    {
      id: "categories",
      label: "Property Categories",
      path: "/properties#categories",
      sectionTitle: "Properties",
    },
    {
      id: "portfolio",
      label: "Our Portfolio",
      path: "/properties#portfolio",
      sectionTitle: "Properties",
    },
    {
      id: "works",
      label: "Recent Works",
      path: "/properties#works",
      sectionTitle: "Properties",
    },
    {
      id: "management",
      label: "Property Management",
      path: "/properties#management",
      sectionTitle: "Properties",
    },
  ];

  // ABOUT LINKS
  const aboutLinks = [
    {
      id: "story",
      label: "Our Story",
      path: "/about#story",
      sectionTitle: "About Us",
    },
    {
      id: "team",
      label: "Our Team",
      path: "/about#team",
      sectionTitle: "About Us",
    },
    {
      id: "clients",
      label: "Our Clients",
      path: "/about#clients",
      sectionTitle: "About Us",
    },
    {
      id: "values",
      label: "Our Values",
      path: "/about#values",
      sectionTitle: "About Us",
    },
  ];

  // CONTACT LINKS
  const contactLinks = [
    {
      id: "form",
      label: "Contact Form",
      path: "/contact#form",
      sectionTitle: "Contact",
    },
    {
      id: "offices",
      label: "Our Offices",
      path: "/contact#offices",
      sectionTitle: "Contact",
    },
    {
      id: "map",
      label: "Google Map",
      path: "/contact#location",
      sectionTitle: "Contact",
    },
    {
      id: "support",
      label: "24/7 Support",
      path: "/contact#support",
      sectionTitle: "Contact",
    },
    {
      id: "hours",
      label: "Business Hours",
      path: "/contact#hours",
      sectionTitle: "Contact",
    },
  ];

  const handleSectionClick = (e, link) => {
    e.preventDefault();

    // Determine which page to navigate to based on section title
    const getPageFromTitle = (title) => {
      switch (title) {
        case "About Us":
          return "/about";
        case "Properties":
          return "/properties";
        case "Contact":
          return "/contact";
        default:
          return "/";
      }
    };

    const targetPage = getPageFromTitle(link.sectionTitle);
    const sectionId = link.id || link.path?.split("#")[1];

    if (location.pathname !== targetPage) {
      // Navigate to the correct page
      navigate(targetPage);
      // Wait for navigation, then scroll to section
      setTimeout(() => {
        if (sectionId) {
          scrollToSection(sectionId);
        }
      }, 500);
    } else {
      // Already on correct page, scroll immediately
      if (sectionId) {
        scrollToSection(sectionId);
        console.log(sectionId);
      }
    }
  };

  const footerSections = [
    { title: "Home", links: homeLinks },
    { title: "Properties", links: propertiesLinks },
    { title: "About Us", links: aboutLinks },
    { title: "Contact", links: contactLinks },
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
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-secondary-600 via-secondary-400 to-secondary-600 shadow-lg shadow-secondary-500/50"></div>

      {/* Glow effect for the border */}
      <div className="absolute top-0 left-1/4 right-1/4 h-4 bg-secondary-500/20 blur-xl"></div>

      <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:w-1/2 space-y-6">
            {/* Logo */}
            <Link to="/" className="inline-block group">
              <div className="flex flex-col">
                <div className="flex items-center gap-0">
                  <span className="text-2xl font-black bg-linear-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                    Thikana
                  </span>
                  <span className="text-secondary-500 text-3xl font-black -mt-1.5 group-hover:rotate-12 transition-transform duration-300">
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
              {socialLinks.map((social, index) => {
                const link = socialMedia[social.key];

                if (!link) return null;

                return (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700/50 hover:bg-secondary-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>

            {/* Contact Badge */}
            <div className="pt-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-secondary-600/20 rounded-full flex items-center justify-center">
                  <span className="text-secondary-400 text-xl">📞</span>
                </div>
                <div>
                  <p className="text-gray-400">24/7 Support</p>
                  <p className="text-white font-semibold">{company.phone || "+1 (555) 123-4567"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="w-full">
            <div className="flex flex-row flex-wrap justify-between gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="w-max">
                  <h4 className="text-white font-semibold mb-4 ml-4 text-base relative inline-block">
                    {section.title}
                    <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-secondary-500 rounded-full"></span>
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.id || link.path}>
                        <button
                          onClick={(e) =>
                            handleSectionClick(e, {
                              ...link,
                              sectionTitle: section.title,
                            })
                          }
                          className="text-gray-400 hover:text-white transition-all duration-300 text-sm py-1 hover:translate-x-1 flex items-center gap-1 group/link w-full text-left"
                        >
                          <FiChevronRight className="text-secondary-500 opacity-0 group-hover/link:opacity-100 transition-all text-xs" />
                          {link.label}
                        </button>
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
              &copy; {new Date().getFullYear()}{" "}
              {company.name || "Thikana Real Estate"}. All rights reserved.
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
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-0 w-64 h-64 bg-secondary-600/5 rounded-full blur-3xl"></div>

      {/* Small floating dots */}
      <div className="absolute bottom-20 left-10 w-2 h-2 bg-secondary-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-secondary-500/20 rounded-full animate-pulse delay-700"></div>
    </footer>
  );
};

export default Footer;
