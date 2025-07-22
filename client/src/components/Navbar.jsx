import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Bell,
  Settings,
  Heart,
  Globe,
  Compass,
  ChevronDown,
  Search,
  Menu,
  X,
  LogOut,
  UserCircle,
  Calendar,
  MapPin,
  Plane,
  LogIn,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation items matching your routes
  const navigationItems = [
    { name: "Dashboard", href: "/", icon: Globe },
    { name: "Browse Trips", href: "/trips", icon: Plane },
    { name: "My Bookings", href: "/mybookings", icon: Calendar },
    { name: "Favorites", href: "/favorites", icon: Heart },
  ];

  const userMenuItems = [
    { name: "My Profile", href: "/profile", icon: UserCircle },
    { name: "My Bookings", href: "/mybookings", icon: Calendar },
    { name: "Favorites", href: "/favorites", icon: Heart },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Logout", href: "/logout", icon: LogOut, isAction: true },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleUserMenuClick = (item) => {
    if (item.isAction) {
      // Handle logout or other actions
      console.log("Logout clicked");
      // Add your logout logic here
    } else {
      navigate(item.href);
    }
    setIsUserMenuOpen(false);
  };

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <nav className="backdrop-blur-md bg-white/80 border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent">
              Tripzy
            </span>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isActiveRoute(item.href)
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-700 hover:text-blue-600 hover:bg-white/60 backdrop-blur-sm"
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="backdrop-blur-md bg-white/50 hover:bg-white/70 p-2 rounded-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 backdrop-blur-md bg-white/90 rounded-2xl shadow-2xl border border-white/20 p-4">
                  <form onSubmit={handleSearch} className="flex space-x-2">
                    <div className="flex-1 relative">
                      <MapPin
                        className="absolute left-3 top-3 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search destinations, trips..."
                        className="w-full pl-10 pr-4 py-2 backdrop-blur-md bg-white/80 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 backdrop-blur-md bg-white/50 hover:bg-white/70 p-2 rounded-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden sm:flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 backdrop-blur-md bg-white/90 rounded-2xl shadow-2xl border border-white/20 py-2">
                    <div className="px-4 py-3 border-b border-white/20">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {user.email}
                      </p>
                    </div>

                    {userMenuItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.name}
                          onClick={() => handleUserMenuClick(item)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-all duration-300 hover:bg-white/60 ${
                            item.isAction
                              ? "text-red-600 hover:text-red-700"
                              : "text-gray-700 hover:text-blue-600"
                          }`}
                        >
                          <IconComponent size={16} />
                          <span className="text-sm">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2 backdrop-blur-md bg-white/50 hover:bg-white/70 px-4 py-2 rounded-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg text-gray-700 hover:text-blue-600"
                >
                  <LogIn size={16} />
                  <span className="text-sm font-medium hidden sm:block">
                    Login
                  </span>
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <User size={16} />
                  <span className="text-sm font-medium hidden sm:block">
                    Sign Up
                  </span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden backdrop-blur-md bg-white/50 hover:bg-white/70 p-2 rounded-lg border border-white/20 transition-all duration-300 hover:scale-105"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden backdrop-blur-md bg-white/90 rounded-2xl mt-2 border border-white/20 shadow-2xl">
            <div className="px-4 py-3 space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActiveRoute(item.href)
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-700 hover:text-blue-600 hover:bg-white/60"
                    }`}
                  >
                    <IconComponent size={18} />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
