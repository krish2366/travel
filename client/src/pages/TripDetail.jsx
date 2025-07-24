import React, { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Star,
  Calendar,
  Users,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plane,
  Globe,
} from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TripDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [tripData, setTripData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === tripData.imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? tripData.imageUrls.length - 1 : prev - 1
    );
  };

  const handleBooking = (id) =>{
    navigate(`/booking/${id}`);
  }

  // Enhanced Loading Component
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
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-full mx-5 px-4 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-gray-300 hover:text-blue-500 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to trips
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full ${
                  isLiked
                    ? "text-red-400 bg-red-50"
                    : "text-gray-500 hover:text-red-400"
                } hover:bg-red-50 transition-all`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={tripData.imageUrls[currentImageIndex].url}
                  alt={tripData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all shadow-lg"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {tripData.imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Trip Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 border border-gray-200">
              <div className="flex flex-wrap gap-2 mb-4">
                {tripData.category.map((cat, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {tripData.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                <span className="text-lg">{tripData.location}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-indigo-300 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Duration</span>
                    <p className="font-semibold text-gray-700">{`${tripData.duration[0]} Days / ${tripData.duration[3]} Nights`}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Rating</span>
                    <p className="font-semibold text-gray-700">
                      4.8 (124 reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Itinerary
              </h2>

              <div className="space-y-6">
                {tripData.itinerary.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                      <span className="text-white font-bold">{item.day}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg sticky top-24 border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  ₹{tripData.price.toLocaleString()}
                </div>
                <div className="text-gray-500">per person</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-indigo-100 transition-colors">
                    <div className="text-sm text-gray-500">Check-in</div>
                    <div className="font-semibold text-gray-700">
                      Select date
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-indigo-100 transition-colors">
                    <div className="text-sm text-gray-500">Check-out</div>
                    <div className="font-semibold text-gray-700">
                      Select date
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-indigo-100 transition-colors">
                  <div className="text-sm text-gray-500">Guests</div>
                  <div className="font-semibold text-gray-700">2 guests</div>
                </div>
              </div>

              <button onClick={() => handleBooking(tripData._id)} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg transform hover:scale-105 mb-4">
                Book Now
              </button>

              <div className="text-center text-sm text-gray-500 mb-4">
                You won't be charged yet
              </div>

              <div className="border-t border-gray-300 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>₹{tripData.price.toLocaleString()} x 2 guests</span>
                    <span>₹{(tripData.price * 2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Service fee</span>
                    <span>₹1,200</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-300 text-gray-900">
                    <span>Total</span>
                    <span>₹{(tripData.price * 2 + 1200).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;