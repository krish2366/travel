import React, { useEffect, useState } from 'react';
import { ChevronLeft, MapPin, Calendar, Users, Phone, Mail, User, FileText, CreditCard, Plane, Globe } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
  // Sample trip data (would be passed as props or fetched based on trip ID)
  // const tripData = {
  //   "_id": "64f16c3a1a92c3b4baf8a51c",
  //   "title": "Manali Adventure Getaway",
  //   "location": "Manali, Himachal Pradesh",
  //   "price": 12999,
  //   "duration": "5 Days / 4 Nights",
  //   "imageUrls": [
  //     {
  //       "url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  //       "public_id": "travel-app/trip1"
  //     }
  //   ]
  // };
  const { id } = useParams();
  const [tripData, setTripData] = useState({});
  useEffect(() =>{
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/trips/${id}`);
        console.log(response.data.trip);
        setTripData(response.data.trip);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };
    fetchTripDetails();
  },[id]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    numberOfTravelers: 2,
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (formData.numberOfTravelers < 1) {
      newErrors.numberOfTravelers = 'At least 1 traveler is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validateForm();

    const payload = {
      trip: tripData._id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      travellers: formData.numberOfTravelers,
      notes: formData.notes,
      cost: calculateTotal(),
      startDate: formData.startDate
    }
    
    if (Object.keys(newErrors).length === 0) {
      // Proceed with booking
      console.log('Booking data:', payload);
      try {
        const res = await axios.post(`http://localhost:5000/bookings/book`,
        payload,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('accessToken')}`
          }
        });  
        alert('Proceeding to payment...');
        console.log(res.data);
        
      } catch (error) {
        console.error("Error during booking:", error);
        alert('An error occurred while processing your booking. Please try again later.');
        return;
      }

    } else {
      setErrors(newErrors);
    }
  };

  const calculateSubtotal = () => {
    return tripData.price * formData.numberOfTravelers;
  };

  const calculateServiceFee = () => {
    return Math.round(calculateSubtotal() * 0.05); // 5% service fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceFee();
  };

  if (!tripData || Object.keys(tripData).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-300 flex items-center justify-center p-4">
        <div className="backdrop-blur-md bg-white/80 rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full text-center">
          {/* Animated Travel Icons */}
          <div className="flex justify-center space-x-4 mb-6">
            <div className="animate-bounce">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <Plane className="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-full">
                <Globe className="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Loading Spinner */}
          <div className="mb-6">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent mb-2">
              Loading Trip Details
            </h2>
            <p className="text-gray-600 animate-pulse">
              Preparing your amazing journey...
            </p>
          </div>

          {/* Loading Progress Bar */}
          <div className="w-full bg-white/50 rounded-full h-2 mb-4 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full animate-pulse"></div>
          </div>

          {/* Fun Loading Messages */}
          <div className="text-sm text-gray-500 animate-pulse">
            <p>✈️ Exploring destinations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[99vw] bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-300">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-5 px-4 py-4">
          <div className="flex items-center justify-start">
            <button className="flex items-center text-gray-300 hover:text-blue-500 mr-4 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to trip
            </button>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent">Complete your booking</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Trip Summary */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Trip Summary</h2>
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img 
                      src={tripData.imageUrls[0].url} 
                      alt={tripData.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{tripData.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                      <span className="text-sm">{tripData.location}</span>
                    </div>
                    <div className="text-sm text-gray-600">{tripData.duration}</div>
                    <div className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mt-2">
                      ₹{tripData.price.toLocaleString()} per person
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1 text-blue-500" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all ${
                        errors.name ? 'border-red-400' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1 text-blue-500" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all ${
                        errors.email ? 'border-red-400' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1 text-blue-500" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all ${
                        errors.phone ? 'border-red-400' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1 text-yellow-400" />
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all ${
                        errors.startDate ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {errors.startDate && <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1 text-purple-500" />
                    Number of Travelers *
                  </label>
                  <select
                    name="numberOfTravelers"
                    value={formData.numberOfTravelers}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all ${
                      errors.numberOfTravelers ? 'border-red-400' : 'border-gray-300'
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Traveler' : 'Travelers'}
                      </option>
                    ))}
                  </select>
                  {errors.numberOfTravelers && <p className="text-red-400 text-sm mt-1">{errors.numberOfTravelers}</p>}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1 text-indigo-300" />
                    Special Notes <span className="text-gray-500 font-normal">(will be considered if possible)</span>
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 resize-none bg-white/80 backdrop-blur-sm transition-all"
                    placeholder="Any special requests, dietary requirements, or additional information..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Price Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-600">
                    ₹{tripData.price.toLocaleString()} × {formData.numberOfTravelers} travelers
                  </span>
                  <span className="font-semibold text-gray-900">₹{calculateSubtotal().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-semibold text-gray-900">₹{calculateServiceFee().toLocaleString()}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold p-4 bg-gradient-to-r from-blue-50 to-purple-300 rounded-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                By clicking "Proceed to Payment", you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;