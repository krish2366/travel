import React from 'react'

import {
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
  Filter
} from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TravelPro</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Flights</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Hotels</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Packages</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Trains</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Cars</a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
