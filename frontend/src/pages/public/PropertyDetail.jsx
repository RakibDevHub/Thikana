import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiMaximize,
  FiShare2,
  FiPrinter,
  FiCheck,
  FiMail,
  FiPhone,
  FiUser,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaBath, FaBed } from "react-icons/fa";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PropertyCard from "../../components/common/PropertyCard";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);

  // Mock property images gallery (in real app, these would come from API)
  const generateGalleryImages = (mainImage) => {
    return [
      mainImage,
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600",
    ];
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Fetch property details
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Property not found");
        }
        return res.json();
      })
      .then((data) => {
        setProperty({
          ...data,
          galleryImages: generateGalleryImages(data.image),
          fullDescription:
            data.description ||
            "This stunning property offers the perfect blend of luxury and comfort. Featuring high-end finishes, spacious rooms, and an abundance of natural light throughout. The open floor plan is ideal for both daily living and entertaining guests. The gourmet kitchen is equipped with top-of-the-line appliances, custom cabinetry, and a large center island. The master suite boasts a spa-like bathroom and walk-in closet. Outside, you'll find a beautifully landscaped yard with a patio area, perfect for outdoor dining and relaxation.",
          features: [
            "Swimming Pool",
            "Garage Parking",
            "Central AC",
            "Garden",
            "Security System",
            "Hardwood Floors",
            "Granite Countertops",
            "Stainless Steel Appliances",
            "Walk-in Closets",
            "Fireplace",
          ],
          yearBuilt: 2020,
          lotSize: 5200,
          monthlyHoa: 150,
          parkingSpaces: 2,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });

    // Fetch similar properties
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        // Filter out current property and get 3 random ones
        const similar = data
          .filter((p) => p.id !== parseInt(id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setSimilarProperties(similar);
      })
      .catch((err) => console.error("Error fetching similar:", err));
  }, [id]);

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form to your backend
    console.log("Contact form submitted:", { ...contactForm, propertyId: id });
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === property.galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? property.galleryImages.length - 1 : prev - 1,
    );
  };

  if (loading) return <LoadingSpinner />;

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold dark:text-white mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            <FiArrowLeft /> Back to Properties
          </Link>
        </div>
      </div>
    );
  }

// container max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FiArrowLeft /> Back
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                title="Share"
              >
                <FiShare2 className="text-gray-600 dark:text-gray-300" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                title="Print"
                onClick={() => window.print()}
              >
                <FiPrinter className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Image Gallery */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-96 md:h-125 bg-gray-100 dark:bg-gray-900">
              <img
                src={property.galleryImages[selectedImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition shadow-lg"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition shadow-lg"
              >
                <FiChevronRight className="text-xl" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {property.galleryImages.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 p-4 overflow-x-auto">
              {property.galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index
                      ? "ring-2 ring-blue-600 opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Price */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold dark:text-white mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FiMapPin className="text-blue-600" />
                    <span>
                      {property.city}, {property.state}{" "}
                      {property.address?.zip || ""}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl md:text-4xl font-bold text-blue-600">
                    ${property.price.toLocaleString()}
                  </p>
                  {property.purpose === "rent" && (
                    <p className="text-sm text-gray-500">per month</p>
                  )}
                </div>
              </div>
            </div>

            {/* Key Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Key Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FaBed className="text-2xl text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="text-xl font-bold dark:text-white">
                    {property.bedrooms}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FaBath className="text-2xl text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="text-xl font-bold dark:text-white">
                    {property.bathrooms}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FiMaximize className="text-2xl text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="text-xl font-bold dark:text-white">
                    {property.area} sqft
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FiMapPin className="text-2xl text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Year Built</p>
                  <p className="text-xl font-bold dark:text-white">
                    {property.yearBuilt}
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Lot Size</p>
                  <p className="font-semibold dark:text-white">
                    {property.lotSize} sqft
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Parking Spaces</p>
                  <p className="font-semibold dark:text-white">
                    {property.parkingSpaces}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly HOA</p>
                  <p className="font-semibold dark:text-white">
                    ${property.monthlyHoa}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Property Type</p>
                  <p className="font-semibold dark:text-white capitalize">
                    {property.propertyType}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {property.fullDescription}
              </p>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FiCheck className="text-green-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Location
              </h2>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <p className="text-gray-500">Map integration coming soon</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Agent */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 dark:text-white">
                Contact Agent
              </h2>

              {formSubmitted ? (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-xl text-center">
                  <FiCheck className="text-3xl mx-auto mb-2" />
                  <p className="font-semibold">Message Sent!</p>
                  <p className="text-sm mt-1">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message *
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        required
                        rows="4"
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="I'm interested in this property..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Send Message
                  </button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Or call us directly
                </p>
                <a
                  href="tel:+15551234567"
                  className="flex items-center justify-center gap-2 mt-2 text-blue-600 font-semibold hover:underline"
                >
                  <FiPhone /> +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="my-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;
