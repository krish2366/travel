import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Linkedin,
  Send,
  Heart,
  Plane,
  Globe,
  Shield,
  Award,
  Users,
  Calendar
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Trips', href: '/trips' },
    { name: 'My Bookings', href: '/mybookings' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const tripCategories = [
    { name: 'Adventure Tours', href: '/trips?category=adventure' },
    { name: 'Beach Holidays', href: '/trips?category=beach' },
    { name: 'Cultural Trips', href: '/trips?category=cultural' },
    { name: 'Mountain Expeditions', href: '/trips?category=mountain' },
    { name: 'City Breaks', href: '/trips?category=urban' },
    { name: 'Wildlife Safari', href: '/trips?category=wildlife' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Booking Terms', href: '/booking-terms' },
    { name: 'Cancellation Policy', href: '/cancellation' },
    { name: 'Travel Insurance', href: '/insurance' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-sky-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-500' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log('Newsletter subscription:', email);
    // Handle newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="relative bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-300 mt-16">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 opacity-5">
          <Plane size={120} className="text-blue-600 animate-pulse" />
        </div>
        <div className="absolute top-20 right-20 opacity-5">
          <Globe size={100} className="text-purple-600 animate-bounce" />
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-5">
          <MapPin size={80} className="text-indigo-600" />
        </div>
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <div className="backdrop-blur-md bg-white/20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent mb-4">
                Stay Updated with Amazing Deals
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about exclusive travel offers, 
                new destinations, and insider travel tips.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>Subscribe</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="backdrop-blur-md bg-white/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Company Info */}
              <div className="lg:col-span-1">
                <div className="backdrop-blur-md bg-white/50 rounded-2xl p-6 border border-white/20 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                      <Plane className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent">
                      Tripzy
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Your trusted travel partner for unforgettable adventures around the world. 
                    We create memories that last a lifetime.
                  </p>
                  
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="text-blue-500 mr-3" size={16} />
                      <span className="text-sm">123 Travel Street, Adventure City, AC 12345</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="text-blue-500 mr-3" size={16} />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="text-blue-500 mr-3" size={16} />
                      <span className="text-sm">hello@Tripzy.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <div className="backdrop-blur-md bg-white/50 rounded-2xl p-6 border border-white/20 h-full">
                  <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                    <Globe className="text-purple-500 mr-2" size={20} />
                    Quick Links
                  </h4>
                  <ul className="space-y-3">
                    {quickLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Trip Categories */}
              <div>
                <div className="backdrop-blur-md bg-white/50 rounded-2xl p-6 border border-white/20 h-full">
                  <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                    <Calendar className="text-yellow-400 mr-2" size={20} />
                    Trip Categories
                  </h4>
                  <ul className="space-y-3">
                    {tripCategories.map((category) => (
                      <li key={category.name}>
                        <a
                          href={category.href}
                          className="text-gray-600 hover:text-purple-600 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                        >
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Support & Legal */}
              <div>
                <div className="backdrop-blur-md bg-white/50 rounded-2xl p-6 border border-white/20 h-full">
                  <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                    <Shield className="text-indigo-500 mr-2" size={20} />
                    Support & Legal
                  </h4>
                  <ul className="space-y-3">
                    {supportLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 backdrop-blur-md bg-white/50 rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full mb-2">
                    <Award className="text-white" size={24} />
                  </div>
                  <span className="text-sm text-gray-600">Award Winning</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full mb-2">
                    <Shield className="text-white" size={24} />
                  </div>
                  <span className="text-sm text-gray-600">Secure Booking</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full mb-2">
                    <Users className="text-white" size={24} />
                  </div>
                  <span className="text-sm text-gray-600">50K+ Travelers</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full mb-2">
                    <Globe className="text-white" size={24} />
                  </div>
                  <span className="text-sm text-gray-600">100+ Destinations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="backdrop-blur-md bg-white/40 py-8 border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              
              {/* Social Links */}
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <span className="text-gray-600 font-medium">Follow Us:</span>
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`backdrop-blur-md bg-white/50 p-2 rounded-lg border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>

              {/* Copyright */}
              <div className="flex items-center text-gray-600 text-sm">
                <span>© {currentYear} Tripzy. Made with </span>
                <Heart className="text-red-500 mx-1" size={16} />
                <span>for travelers worldwide.</span>
              </div>
            </div>

            {/* Additional Legal Links */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                <a href="/accessibility" className="hover:text-gray-700 transition-colors">Accessibility</a>
                <a href="/sitemap" className="hover:text-gray-700 transition-colors">Sitemap</a>
                <a href="/careers" className="hover:text-gray-700 transition-colors">Careers</a>
                <a href="/press" className="hover:text-gray-700 transition-colors">Press</a>
                <a href="/affiliates" className="hover:text-gray-700 transition-colors">Affiliate Program</a>
                <a href="/sustainability" className="hover:text-gray-700 transition-colors">Sustainability</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
