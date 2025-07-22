import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, Users, FileText, MapPin, Clock, CheckCircle, XCircle, Star } from 'lucide-react';

const MyBookings = () => {
  // Updated dummy data based on your correct trip schema
  const [bookings] = useState([
    {
      _id: '1',
      trip: {
        _id: 'trip1',
        title: 'Magical Bali Adventure',
        location: 'Bali, Indonesia',
        price: 1200,
        duration: '7D/6N',
        imageUrls: [
          {
            url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
            public_id: 'bali_main_1'
          }
        ],
        category: ['Beach', 'Adventure', 'Cultural'],
        rating: 4.8,
        reviewsCount: 142,
        createdBy: 'user123'
      },
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
      travellers: '2 Adults',
      notes: 'Honeymoon trip, please arrange romantic dinner',
      isPaid: true,
      paymentId: 'pay_1234567890',
      startDate: new Date('2024-03-15'),
      createdAt: new Date('2024-02-01')
    },
    {
      _id: '2',
      trip: {
        _id: 'trip2',
        title: 'Swiss Alps Expedition',
        location: 'Interlaken, Switzerland',
        price: 1800,
        duration: '5D/4N',
        imageUrls: [
          {
            url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400',
            public_id: 'swiss_alps_main_1'
          }
        ],
        category: ['Mountain', 'Adventure', 'Nature'],
        rating: 4.9,
        reviewsCount: 89,
        createdBy: 'user456'
      },
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1-555-0456',
      travellers: '1 Adult, 1 Child',
      notes: 'Vegetarian meals preferred',
      isPaid: false,
      paymentId: null,
      startDate: new Date('2024-05-20'),
      createdAt: new Date('2024-02-10')
    },
    {
      _id: '3',
      trip: {
        _id: 'trip3',
        title: 'Tokyo Culture Discovery',
        location: 'Tokyo, Japan',
        price: 1500,
        duration: '6D/5N',
        imageUrls: [
          {
            url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
            public_id: 'tokyo_main_1'
          }
        ],
        category: ['Cultural', 'Urban', 'Food'],
        rating: 4.7,
        reviewsCount: 203,
        createdBy: 'user789'
      },
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1-555-0789',
      travellers: '4 Adults',
      notes: 'Group booking for friends trip',
      isPaid: true,
      paymentId: 'pay_0987654321',
      startDate: new Date('2024-04-10'),
      createdAt: new Date('2024-01-25')
    }
  ]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalBookings = bookings.length;
  const paidBookings = bookings.filter(booking => booking.isPaid).length;
  const pendingBookings = totalBookings - paidBookings;
  const totalValue = bookings.reduce((sum, booking) => sum + booking.trip.price, 0);

  return (
    <div className="w-[99vw] min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-300 p-4">
      {/* Header */}
      <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 mb-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent mb-2">
          My Bookings
        </h1>
        <p className="text-gray-600">Manage and track all your travel bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="backdrop-blur-md bg-white/80 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
              <p className="text-3xl font-bold text-blue-600">{totalBookings}</p>
            </div>
            <Calendar className="text-yellow-400" size={32} />
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/80 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Paid</p>
              <p className="text-3xl font-bold text-green-600">{paidBookings}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/80 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-orange-600">{pendingBookings}</p>
            </div>
            <Clock className="text-orange-400" size={32} />
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/80 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Value</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                ${totalValue.toLocaleString()}
              </p>
            </div>
            <MapPin className="text-blue-500" size={32} />
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20 hover:bg-white/90 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trip Info */}
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <img 
                      src={booking.trip.imageUrls[0].url} 
                      alt={booking.trip.title}
                      className="w-full sm:w-32 h-32 object-cover rounded-xl"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center">
                      <Star className="text-yellow-400 fill-yellow-400" size={12} />
                      <span className="text-xs font-medium ml-1">{booking.trip.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{booking.trip.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.isPaid 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {booking.isPaid ? 'Paid' : 'Pending Payment'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="text-blue-500 mr-2" size={16} />
                      <span>{booking.trip.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar className="text-yellow-400 mr-2" size={16} />
                      <span>{formatDate(booking.startDate)} • {booking.trip.duration}</span>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {booking.trip.category.map((cat, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        ${booking.trip.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.trip.reviewsCount} reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-gradient-to-br from-white/80 to-blue-50/80 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Booking Details</h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <User className="text-blue-500 mr-2" size={14} />
                    <span className="text-gray-600">{booking.name}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="text-blue-500 mr-2" size={14} />
                    <span className="text-gray-600">{booking.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="text-blue-500 mr-2" size={14} />
                    <span className="text-gray-600">{booking.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="text-purple-500 mr-2" size={14} />
                    <span className="text-gray-600">{booking.travellers}</span>
                  </div>
                  
                  {booking.notes && (
                    <div className="flex items-start">
                      <FileText className="text-indigo-300 mr-2 mt-0.5" size={14} />
                      <span className="text-gray-600 text-xs">{booking.notes}</span>
                    </div>
                  )}
                  
                  {booking.paymentId && (
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-500">Payment ID: {booking.paymentId}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    View Details
                  </button>
                  {!booking.isPaid && (
                    <button className="px-4 py-2 bg-white/50 hover:bg-white/80 text-gray-700 rounded-lg text-sm font-medium transition-all duration-300 border border-white/20">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-12 text-center border border-white/20">
          <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Yet</h3>
          <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Explore Trips
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
