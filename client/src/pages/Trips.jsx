import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Star, Users, Camera, Mountain, Waves, Sun, Snowflake, Heart } from 'lucide-react';

export default function Trips() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Sample trip data
  const allTrips = [
    {
      "_id": "64f16c3a1a92c3b4baf8a51c",
      "title": "Manali Adventure Getaway",
      "location": "Manali, Himachal Pradesh",
      "price": 12999,
      "duration": "5 Days / 4 Nights",
      "imageUrls": [
        {
          "url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
          "public_id": "travel-app/trip1"
        }
      ],
      "category": ["Adventure", "Winter"],
      "rating": 4.8,
      "reviews": 234,
      "groupSize": "2-12 people"
    },
    {
      "_id": "64f16c3a1a92c3b4baf8a52d",
      "title": "Goa Beach Paradise",
      "location": "Goa, India",
      "price": 8999,
      "duration": "4 Days / 3 Nights",
      "imageUrls": [
        {
          "url": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
          "public_id": "travel-app/trip2"
        }
      ],
      "category": ["Beach", "Relaxation"],
      "rating": 4.6,
      "reviews": 189,
      "groupSize": "2-8 people"
    },
    {
      "_id": "64f16c3a1a92c3b4baf8a53e",
      "title": "Rajasthan Royal Heritage",
      "location": "Jaipur, Rajasthan",
      "price": 15999,
      "duration": "6 Days / 5 Nights",
      "imageUrls": [
        {
          "url": "https://images.unsplash.com/photo-1599661046827-dacde6976549?w=800&q=80",
          "public_id": "travel-app/trip3"
        }
      ],
      "category": ["Heritage", "Culture"],
      "rating": 4.9,
      "reviews": 312,
      "groupSize": "2-15 people"
    },
    {
      "_id": "64f16c3a1a92c3b4baf8a54f",
      "title": "Kerala Backwaters Cruise",
      "location": "Alleppey, Kerala",
      "price": 11999,
      "duration": "3 Days / 2 Nights",
      "imageUrls": [
        {
          "url": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
          "public_id": "travel-app/trip4"
        }
      ],
      "category": ["Nature", "Relaxation"],
      "rating": 4.7,
      "reviews": 156,
      "groupSize": "2-6 people"
    },
    {
      "_id": "64f16c3a1a92c3b4baf8a560",
      "title": "Leh Ladakh Expedition",
      "location": "Leh, Ladakh",
      "price": 22999,
      "duration": "8 Days / 7 Nights",
      "imageUrls": [
        {
          "url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
          "public_id": "travel-app/trip5"
        }
      ],
      "category": ["Adventure", "Mountain"],
      "rating": 4.9,
      "reviews": 89,
      "groupSize": "4-10 people"
    },
    {
      "_id": "64f16c3a1a92c3b4baf8a571",
      "title": "Andaman Island Escape",
      "location": "Port Blair, Andaman",
      "price": 18999,
      "duration": "5 Days / 4 Nights",
      "imageUrls": [
        {
          "url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
          "public_id": "travel-app/trip6"
        }
      ],
      "category": ["Beach", "Adventure"],
      "rating": 4.8,
      "reviews": 278,
      "groupSize": "2-12 people"
    }
  ];

  // Filter trips based on search and filters
  const filteredTrips = allTrips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
                           trip.category.some(cat => cat === selectedCategory);
    
    const matchesPrice = priceRange === 'All' ||
                        (priceRange === 'Under 10k' && trip.price < 10000) ||
                        (priceRange === '10k-15k' && trip.price >= 10000 && trip.price <= 15000) ||
                        (priceRange === '15k-20k' && trip.price > 15000 && trip.price <= 20000) ||
                        (priceRange === 'Above 20k' && trip.price > 20000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort trips
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return b.reviews - a.reviews; // popular
    }
  });

  const toggleFavorite = (tripId) => {
    setFavorites(prev => 
      prev.includes(tripId) 
        ? prev.filter(id => id !== tripId)
        : [...prev, tripId]
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Adventure: Mountain,
      Beach: Waves,
      Heritage: Camera,
      Culture: Camera,
      Nature: Sun,
      Winter: Snowflake,
      Mountain: Mountain,
      Relaxation: Sun
    };
    return icons[category] || Sun;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Amazing Trips</h1>
              <p className="text-gray-600 mt-1">Find your perfect adventure from our curated collection</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-blue-100 px-4 py-2 rounded-full">
                <span className="text-blue-800 font-medium">{sortedTrips.length} trips found</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations, places, or trip names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Quick Filters */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Adventure">Adventure</option>
              <option value="Beach">Beach</option>
              <option value="Heritage">Heritage</option>
              <option value="Culture">Culture</option>
              <option value="Nature">Nature</option>
              <option value="Winter">Winter</option>
              <option value="Mountain">Mountain</option>
              <option value="Relaxation">Relaxation</option>
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Prices</option>
              <option value="Under 10k">Under ₹10,000</option>
              <option value="10k-15k">₹10,000 - ₹15,000</option>
              <option value="15k-20k">₹15,000 - ₹20,000</option>
              <option value="Above 20k">Above ₹20,000</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        {/* Trip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTrips.map((trip) => (
            <div key={trip._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={trip.imageUrls[0].url}
                  alt={trip.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {trip.duration}
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(trip._id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.includes(trip._id) ? 'text-red-500 fill-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2">
                    {trip.category.map((cat, index) => {
                      const IconComponent = getCategoryIcon(cat);
                      return (
                        <div key={index} className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center space-x-1">
                          <IconComponent className="w-3 h-3" />
                          <span>{cat}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                    {trip.title}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{trip.price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{trip.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{trip.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{trip.reviews} reviews</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{trip.groupSize}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedTrip(trip)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View Details
                  </button>
                  <button className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedTrips.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No trips found matching your criteria</div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setPriceRange('All');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Trip Detail Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative h-64">
              <img
                src={selectedTrip.imageUrls[0].url}
                alt={selectedTrip.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedTrip(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedTrip.title}</h2>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedTrip.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">₹{selectedTrip.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{selectedTrip.duration}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{selectedTrip.rating}</span>
                  <span className="text-gray-600">({selectedTrip.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{selectedTrip.groupSize}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTrip.category.map((cat, index) => {
                    const IconComponent = getCategoryIcon(cat);
                    return (
                      <div key={index} className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm flex items-center space-x-1">
                        <IconComponent className="w-3 h-3" />
                        <span>{cat}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Book Now
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}