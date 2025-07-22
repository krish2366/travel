import React, { useState } from 'react';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  Upload, 
  X, 
  Plus, 
  Save, 
  ArrowLeft,
  Clock,
  Users,
  Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTrip = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    duration: '',
    category: [],
  });

  const [imageUrls, setImageUrls] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableCategories = [
    'Adventure', 'Beach', 'Cultural', 'Mountain', 'Urban', 'Nature', 
    'Food', 'Wildlife', 'Historical', 'Luxury', 'Budget', 'Family',
    'Romance', 'Solo', 'Group', 'Photography', 'Spiritual', 'Festival'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = []

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push({
          url: reader.result, // for preview on the client-side
          file: file // for uploading to cloudinary
        });

        if(newImages.length === files.length){
          setImageUrls(prev => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addItineraryDay = () => {
    const newDay = {
      day: itinerary.length + 1,
      title: '',
      details: ''
    };
    setItinerary(prev => [...prev, newDay]);
  };

  const updateItineraryDay = (index, field, value) => {
    setItinerary(prev => prev.map((day, i) => 
      i === index ? { ...day, [field]: value } : day
    ));
  };

  const removeItineraryDay = (index) => {
    setItinerary(prev => prev.filter((_, i) => i !== index).map((day, i) => ({
      ...day,
      day: i + 1
    })));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (formData.category.length === 0) newErrors.category = 'At least one category is required';
    if (imageUrls.length === 0) newErrors.images = 'At least one image is required';

    itinerary.forEach((day, index) => {
      if (!day.title.trim()) {
        newErrors[`itinerary_title_${index}`] = `Day ${day.day} title is required`;
      }
      if (!day.details.trim()) {
        newErrors[`itinerary_details_${index}`] = `Day ${day.day} details are required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {

      const tripData = new FormData();
      tripData.append('title', formData.title);
      tripData.append('location', formData.location);
      tripData.append('price', parseFloat(formData.price));
      tripData.append('duration', formData.duration);
      tripData.append('itinerary', JSON.stringify(itinerary));

      tripData.append('category',(formData.category));
      imageUrls.forEach(img => tripData.append("imageUrls", img.file));
      

      console.log('Trip data to submit:', tripData);
      const token = localStorage.getItem("accessToken");

      const res = await axios.post("http://localhost:5000/trips", tripData, {
        headers: {
          'Content-Type' : 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
      console.log('Trip created successfully:', res);
      alert('Trip created successfully!');
      
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Error creating trip. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[99vw] min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-300 p-10">
      {/* Header */}
      <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 mb-8 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent mb-2">
              Add New Trip
            </h1>
            <p className="text-gray-600">Create an amazing travel experience</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="backdrop-blur-md bg-white/50 hover:bg-white/70 p-3 rounded-lg border border-white/20 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="text-gray-600" size={24} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MapPin className="text-blue-500 mr-3" size={24} />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                placeholder="e.g., Magical Bali Adventure"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                placeholder="e.g., Bali, Indonesia"
              />
              {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  placeholder="1200"
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 text-yellow-400" size={18} />
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 7D/6N"
                />
              </div>
              {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration}</p>}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Users className="text-purple-500 mr-3" size={24} />
            Categories *
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {availableCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  formData.category.includes(category)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                    : 'backdrop-blur-md bg-white/50 border-white/20 text-gray-700 hover:bg-white/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {errors.category && <p className="text-red-400 text-sm mt-2">{errors.category}</p>}
        </div>

        {/* Images */}
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Camera className="text-indigo-500 mr-3" size={24} />
            Images *
          </h2>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="block">
              <div className="backdrop-blur-md bg-white/50 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:bg-white/70 transition-all duration-300 cursor-pointer">
                <Upload className="mx-auto text-blue-500 mb-4" size={32} />
                <p className="text-gray-600 mb-2">Click to upload images</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Image Preview Grid */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imageUrls.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.images && <p className="text-red-400 text-sm mt-2">{errors.images}</p>}
        </div>

        {/* Simplified Itinerary */}
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Clock className="text-yellow-400 mr-3" size={24} />
              Itinerary
            </h2>
            <button
              type="button"
              onClick={addItineraryDay}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105"
            >
              <Plus size={16} />
              <span>Add Day</span>
            </button>
          </div>

          <div className="space-y-4">
            {itinerary.map((day, index) => (
              <div key={index} className="backdrop-blur-md bg-white/50 rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Day {day.day}</h3>
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(index)}
                    className="text-red-400 hover:text-red-600 transition-colors duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Day Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day Title *
                    </label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                      className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., Arrival & City Tour"
                    />
                    {errors[`itinerary_title_${index}`] && 
                      <p className="text-red-400 text-sm mt-1">{errors[`itinerary_title_${index}`]}</p>
                    }
                  </div>
                  {/* Day Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Details *
                    </label>
                    <textarea
                      value={day.details}
                      onChange={(e) => updateItineraryDay(index, 'details', e.target.value)}
                      className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                      rows="4"
                      placeholder="Describe the day's activities, places to visit, meals included, etc..."
                    />
                    {errors[`itinerary_details_${index}`] && 
                      <p className="text-red-400 text-sm mt-1">{errors[`itinerary_details_${index}`]}</p>
                    }
                  </div>
                </div>
              </div>
            ))}

            {itinerary.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg">No itinerary added yet</p>
                <p className="text-sm">Click "Add Day" to start planning the trip schedule</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-12 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-3 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save size={20} />
              <span>{isSubmitting ? 'Creating Trip...' : 'Create Trip'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTrip;
