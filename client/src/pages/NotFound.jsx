import React, { useState, useEffect } from 'react';
import { Home, Search, MapPin, Compass, ArrowLeft, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [floatingElements, setFloatingElements] = useState([]);

  // Create floating elements for background animation
  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 6; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      });
    }
    setFloatingElements(elements);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleExploreTrips = () => {
    navigate('/trips');
  };

  return (
    <div className="w-[99vw] min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-300 relative overflow-hidden flex items-center justify-center py-8">
      {/* Animated Background Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute opacity-10"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`
          }}
        >
          <div className="animate-bounce">
            {element.id % 3 === 0 && <Plane size={24} className="text-blue-400" />}
            {element.id % 3 === 1 && <MapPin size={20} className="text-purple-400" />}
            {element.id % 3 === 2 && <Compass size={28} className="text-indigo-400" />}
          </div>
        </div>
      ))}

      {/* Main Content */}
      <div className="backdrop-blur-md bg-white/30 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-2xl w-full text-center animate-fade-in-up">
        {/* 404 Number with Gradient */}
        <div className="mb-8 animate-pulse">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent leading-none animate-bounce-slow">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-delay-1">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2 animate-fade-in-delay-2">
            Looks like you've wandered off the beaten path! 🗺️
          </p>
          <p className="text-gray-500 animate-fade-in-delay-3">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Animated Travel Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="animate-float-1">
            <div className="backdrop-blur-md bg-white/50 p-4 rounded-full border border-white/30">
              <Plane className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="animate-float-2">
            <div className="backdrop-blur-md bg-white/50 p-4 rounded-full border border-white/30">
              <MapPin className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="animate-float-3">
            <div className="backdrop-blur-md bg-white/50 p-4 rounded-full border border-white/30">
              <Compass className="text-indigo-500" size={24} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center animate-fade-in-delay-4">
          <button
            onClick={handleGoHome}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group"
          >
            <Home size={20} className="group-hover:animate-bounce" />
            <span>Go Home</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full md:w-auto backdrop-blur-md bg-white/50 hover:bg-white/70 text-gray-700 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 border border-white/20 flex items-center justify-center space-x-2 group"
          >
            <ArrowLeft size={20} className="group-hover:animate-pulse" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Additional Navigation */}
        <div className="mt-8 pt-6 border-t border-white/20 animate-fade-in-delay-5">
          <p className="text-gray-600 mb-4">Or explore these options:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={handleExploreTrips}
              className="backdrop-blur-md bg-white/40 hover:bg-white/60 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-1 group"
            >
              <Search size={14} className="group-hover:animate-spin" />
              <span>Explore Trips</span>
            </button>
            
            <button
              onClick={() => navigate('/contact')}
              className="backdrop-blur-md bg-white/40 hover:bg-white/60 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              Contact Support
            </button>
            
            <button
              onClick={() => navigate('/about')}
              className="backdrop-blur-md bg-white/40 hover:bg-white/60 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              About Us
            </button>
          </div>
        </div>

        {/* Fun Travel Quote */}
        <div className="mt-8 animate-fade-in-delay-6">
          <blockquote className="text-gray-600 italic">
            "Not all those who wander are lost... but this page sure is! 🧳"
          </blockquote>
        </div>
      </div>

      {/* CSS Styles for Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 2.5s ease-in-out infinite 0.5s;
        }

        .animate-float-3 {
          animation: float-3 2.8s ease-in-out infinite 1s;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in-up 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in-up 0.8s ease-out 0.6s both;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in-up 0.8s ease-out 0.8s both;
        }

        .animate-fade-in-delay-5 {
          animation: fade-in-up 0.8s ease-out 1s both;
        }

        .animate-fade-in-delay-6 {
          animation: fade-in-up 0.8s ease-out 1.2s both;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
