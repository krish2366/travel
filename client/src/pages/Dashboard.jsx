import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Plane, 
  Hotel, 
  Car, 
  Train, 
  Package, 
  Star, 
  User, 
  Bell, 
  Settings,
  TrendingUp,
  Clock,
  Heart,
  Camera,
  Globe,
  Compass,
  Sun,
  Mountain,
  Waves,
  TreePine,
  Building,
  Users,
  CreditCard,
  Shield,
  ChevronRight,
  Filter,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/useAuthStore';

export default function Dashboard() {

  const {user} = useAuthStore();
  console.log(user);
  const [activeTab, setActiveTab] = useState('flights');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1 Adult',
    class: 'Economy'
  });

  const quickBookingTabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'cars', label: 'Cars', icon: Car },
    { id: 'packages', label: 'Packages', icon: Package }
  ];

  const trendingDestinations = [
    { 
      name: 'Maldives', 
      country: 'Indian Ocean',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      price: '₹45,000',
      rating: 4.8,
      type: 'Beach Paradise',
      icon: Waves
    },
    { 
      name: 'Switzerland', 
      country: 'Europe',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      price: '₹65,000',
      rating: 4.9,
      type: 'Mountain Adventure',
      icon: Mountain
    },
    { 
      name: 'Dubai', 
      country: 'UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
      price: '₹35,000',
      rating: 4.7,
      type: 'City Experience',
      icon: Building
    },
    { 
      name: 'Bali', 
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&q=80',
      price: '₹40,000',
      rating: 4.6,
      type: 'Cultural Journey',
      icon: TreePine
    }
  ];

  const recentBookings = [
    {
      id: 1,
      type: 'Flight',
      destination: 'Mumbai → Delhi',
      date: '2025-08-15',
      status: 'Confirmed',
      price: '₹8,500',
      icon: Plane
    },
    {
      id: 2,
      type: 'Hotel',
      destination: 'The Taj Mahal Hotel, Mumbai',
      date: '2025-08-15 - 2025-08-18',
      status: 'Confirmed',
      price: '₹12,000',
      icon: Hotel
    },
    {
      id: 3,
      type: 'Package',
      destination: 'Goa Beach Package',
      date: '2025-09-01 - 2025-09-05',
      status: 'Pending',
      price: '₹25,000',
      icon: Package
    }
  ];

  const quickActions = [
    { label: 'Check-in', icon: Plane, color: 'bg-blue-500' },
    { label: 'Manage Booking', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Travel Insurance', icon: Shield, color: 'bg-green-500' },
    { label: 'Support', icon: Users, color: 'bg-orange-500' }
  ];

  const offers = [
    {
      title: 'Flat 20% OFF',
      subtitle: 'On International Flights',
      code: 'INTL20',
      color: 'from-blue-500 to-purple-600',
      icon: Plane
    },
    {
      title: 'Up to 40% OFF',
      subtitle: 'On Hotels Worldwide',
      code: 'HOTEL40',
      color: 'from-purple-500 to-pink-600',
      icon: Hotel
    },
    {
      title: 'Cashback ₹2000',
      subtitle: 'On Holiday Packages',
      code: 'HOLIDAY2K',
      color: 'from-green-500 to-teal-600',
      icon: Package
    }
  ];

  return (
    <div className="min-h-screen w-[99vw] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navbar/>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, John! 🌟</h1>
              <p className="text-xl opacity-90 mb-6">Ready for your next adventure? Let's explore the world together.</p>
              <div className="flex flex-wrap gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`${action.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-white px-6 py-3 rounded-xl flex items-center space-x-2`}
                  >
                    <action.icon className="w-5 h-5" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Quick Booking Widget */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Booking</h2>
          
          {/* Tabs */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {quickBookingTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Delhi"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70"
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Mumbai"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70"
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70"
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3 Adults</option>
                  <option>4 Adults</option>
                </select>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
            <Search className="w-5 h-5 inline mr-2" />
            Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trending Destinations */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Trending Destinations</h2>
                <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingDestinations.map((destination, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl cursor-pointer">
                    <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-xl overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                          <destination.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-sm font-medium">{destination.type}</span>
                      </div>
                      <h3 className="text-white font-bold text-lg">{destination.name}</h3>
                      <p className="text-white/80 text-sm">{destination.country}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-white font-semibold">{destination.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{destination.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Offers */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Special Offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {offers.map((offer, index) => (
                  <div key={index} className={`bg-gradient-to-r ${offer.color} rounded-xl p-6 text-white relative overflow-hidden`}>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                    <offer.icon className="w-8 h-8 mb-4" />
                    <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{offer.subtitle}</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium inline-block">
                      Code: {offer.code}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Bookings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <booking.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{booking.type}</h3>
                      <p className="text-sm text-gray-600">{booking.destination}</p>
                      <p className="text-xs text-gray-500">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{booking.price}</p>
                      <p className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 flex items-center justify-center space-x-2 py-3 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                <span>View All Bookings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Travel Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Travel Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Plane className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Total Flights</p>
                      <p className="text-sm text-gray-600">This year</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">24</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Globe className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Countries Visited</p>
                      <p className="text-sm text-gray-600">Lifetime</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">12</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Total Savings</p>
                      <p className="text-sm text-gray-600">With offers</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-600">₹45K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}